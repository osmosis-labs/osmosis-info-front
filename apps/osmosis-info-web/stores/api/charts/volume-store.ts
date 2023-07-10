import { action, makeObservable } from "mobx";
import { Request } from "../request";
import { autorun } from "mobx";
import axios, { AxiosResponse } from "axios";
import { InitialState } from "../../root-store";
import { ChartVolumeResponse, VolumeChart } from "./charts";
import { MetricsStore } from "../metrics/metrics-store";
import { getWeekNumber, timeToDateUTC } from "../../../helpers/date";

const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;

type PromiseRequest = [AxiosResponse<ChartVolumeResponse, ChartVolumeResponse>];

export class VolumeStore extends Request<PromiseRequest> {
	private _interval: NodeJS.Timeout | null = null;
	private _intervalTime: number;
	private _metricsStore: MetricsStore;
	private _volumeDay: VolumeChart[] = [];
	private _volumeWeek: VolumeChart[] = [];
	private _volumeMonth: VolumeChart[] = [];

	constructor(metricsStore: MetricsStore) {
		super({ delayCache: 3 * 1000 });
		this._intervalTime = 5 * 1000;
		this._metricsStore = metricsStore;
		makeObservable(this);
		autorun(() => {
			this.play();
		});
	}

	@action
	hydrate({ volumeChartState }: InitialState): void {
		if (volumeChartState) {
			this.formatData(volumeChartState);
		}
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

	formatData(data: ChartVolumeResponse) {
		if (data.length === 0) return;
		if (this._metricsStore.metrics.volume24h !== 0) data[data.length - 1].value = this._metricsStore.metrics.volume24h;
		const volumeDay: VolumeChart[] = [];
		const volumeWeek: VolumeChart[] = [];
		const volumeMonth: VolumeChart[] = [];

		const currentWeek: VolumeChart = { time: timeToDateUTC(data[0].time), value: 0 };
		const currentMonth: VolumeChart = { time: timeToDateUTC(data[0].time), value: 0 };
		let weekNumberCurrentWeek = getWeekNumber(currentWeek.time);
		let timeCurrentMonth = currentMonth.time.getMonth() + "-" + currentMonth.time.getFullYear();

		data.forEach((item, index) => {
			const itemTime = timeToDateUTC(item.time);
			const itemMonth = itemTime.getMonth() + "-" + itemTime.getFullYear();
			const itemWeekNumber = getWeekNumber(itemTime);

			const res = {
				time: itemTime,
				value: item.value,
			};
			// Update whith complete last volume data
			if (index === 0 && this._metricsStore.metrics.volume24h != 0) res.value = this._metricsStore.metrics.volume24h;

			volumeDay.push(res);
			if (itemWeekNumber === weekNumberCurrentWeek) {
				currentWeek.value += item.value;
			} else {
				volumeWeek.push({ ...currentMonth });
				currentMonth.time = itemTime;
				currentWeek.value = item.value;
				weekNumberCurrentWeek = itemWeekNumber;
			}

			if (itemMonth === timeCurrentMonth) {
				currentMonth.value += item.value;
			} else {
				volumeMonth.push({ ...currentMonth });
				currentMonth.time = itemTime;
				currentMonth.value = item.value;
				timeCurrentMonth = itemMonth;
			}
		});

		volumeWeek.push(currentWeek);
		volumeMonth.push(currentMonth);

		this._volumeDay = volumeDay;
		this._volumeWeek = volumeWeek;
		this._volumeMonth = volumeMonth;
	}

	format(reponseData: PromiseRequest): void {
		const reponseVolume = reponseData[0].data;
		this.formatData(reponseVolume);
	}

	public getData = () => {
		this.sendRequest(() => Promise.all([axios({ url: `${API_URL}/volume/v2/historical/chart` })]));
	};

	public get errorTokens(): string | undefined {
		return this._error;
	}

	public get isLoadingTokens(): boolean {
		return this._isLoading;
	}

	public get volumeDay(): VolumeChart[] {
		return this._volumeDay;
	}

	public get volumeWeek(): VolumeChart[] {
		return this._volumeWeek;
	}

	public get volumeMonth(): VolumeChart[] {
		return this._volumeMonth;
	}
}
