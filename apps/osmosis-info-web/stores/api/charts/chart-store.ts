import { action, makeObservable, observable, toJS } from "mobx";
import { Request } from "../request";
import axios, { AxiosResponse } from "axios";
import { getWeekNumber, timeToDateUTC } from "../../../helpers/date";

export type ChartData = {
	time: Date;
	value: number;
};

export type ChartDataResponse = {
	time: string;
	value: number;
};

type PromiseRequest = [AxiosResponse<ChartDataResponse[]>];

export class ChartStore extends Request<PromiseRequest> {
	private _interval: NodeJS.Timeout | null = null;
	private _intervalTime: number;
	private _url: string;

	@observable
	private _dataDay: ChartData[] = [];
	@observable
	private _dataWeek: ChartData[] = [];
	@observable
	private _dataMonth: ChartData[] = [];

	constructor(url: string) {
		super({ delayCache: 6 * 1000 });
		this._intervalTime = 6 * 1000;
		this._url = url;
		makeObservable(this);
	}

	@action
	play = () => {
		this._interval = setInterval(this.getData, this._intervalTime);
	};

	@action
	pause = () => {
		clearInterval(this._interval!);
		this._interval = null;
	};

	@action
	formatData(data: ChartDataResponse[]) {
		if (data.length === 0) return;

		const dataDay: ChartData[] = [];
		const dataWeek: ChartData[] = [];
		const dataMonth: ChartData[] = [];

		const currentWeek: ChartData = { time: timeToDateUTC(data[0].time), value: 0 };
		const currentMonth: ChartData = { time: timeToDateUTC(data[0].time), value: 0 };
		let weekNumberCurrentWeek = getWeekNumber(currentWeek.time);
		let timeCurrentMonth = currentMonth.time.getMonth() + "-" + currentMonth.time.getFullYear();

		data.forEach((item) => {
			const itemTime = timeToDateUTC(item.time);
			const itemMonth = itemTime.getMonth() + "-" + itemTime.getFullYear();
			const itemWeekNumber = getWeekNumber(itemTime);

			const res = {
				time: itemTime,
				value: item.value,
			};
			dataDay.push(res);
			if (itemWeekNumber === weekNumberCurrentWeek) {
				currentWeek.value += item.value;
			} else {
				dataWeek.push({ ...currentWeek });
				currentWeek.time = itemTime;
				currentWeek.value = item.value;
				weekNumberCurrentWeek = itemWeekNumber;
			}

			if (itemMonth === timeCurrentMonth) {
				currentMonth.value += item.value;
			} else {
				dataMonth.push({ ...currentMonth });
				currentMonth.time = itemTime;
				currentMonth.value = item.value;
				timeCurrentMonth = itemMonth;
			}
		});

		dataWeek.push(currentWeek);
		dataMonth.push(currentMonth);

		this._dataDay = dataDay;
		this._dataWeek = dataWeek;
		this._dataMonth = dataMonth;
	}

	@action
	format(responseData: PromiseRequest): void {
		this.formatData(responseData[0].data);
	}

	public getData = () => {
		this.sendRequest(() => Promise.all([axios({ url: this._url })]));
	};

	public get errorTokens(): string | undefined {
		return this._error;
	}

	public get isLoadingTokens(): boolean {
		return this._isLoading;
	}

	public get dataDay(): ChartData[] {
		return toJS(this._dataDay);
	}

	public get dataWeek(): ChartData[] {
		return toJS(this._dataWeek);
	}

	public get dataMonth(): ChartData[] {
		return toJS(this._dataMonth);
	}
}
