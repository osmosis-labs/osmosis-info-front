import { action, makeObservable } from "mobx";
import { Request } from "../request";
import { autorun } from "mobx";
import axios, { AxiosResponse } from "axios";
import { InitialState } from "../../root-store";
import { ChartLiquidityResponse, LiquidityChart } from "./charts";
import { getWeekNumber, timeToDateUTC } from "../../../helpers/date";

const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;

type PromiseRequest = [AxiosResponse<ChartLiquidityResponse, ChartLiquidityResponse>];

export class LiquidityStore extends Request<PromiseRequest> {
	private _interval: NodeJS.Timeout | null = null;
	private _intervalTime: number;
	private _liquidityDay: LiquidityChart[] = [];
	private _liquidityWeek: LiquidityChart[] = [];
	private _liquidityMonth: LiquidityChart[] = [];

	constructor() {
		super({ delayCache: 6 * 1000 });
		this._intervalTime = 6 * 1000;
		makeObservable(this);
		autorun(() => {
			this.play();
		});
	}

	@action
	hydrate({ liquidityChartState }: InitialState): void {
		if (liquidityChartState) {
			this.formatData(liquidityChartState);
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

	formatData(data: ChartLiquidityResponse) {
		if (data.length === 0) return;

		const liquidityDay: LiquidityChart[] = [];
		const liquidityWeek: LiquidityChart[] = [];
		const liquidityMonth: LiquidityChart[] = [];

		const currentWeek: LiquidityChart = { time: timeToDateUTC(data[0].time), value: 0, valueAtom: 0, valueOsmo: 0 };
		const currentMonth: LiquidityChart = { time: timeToDateUTC(data[0].time), value: 0, valueAtom: 0, valueOsmo: 0 };
		let weekNumberCurrentWeek = getWeekNumber(currentWeek.time);
		let timeCurrentMonth = currentMonth.time.getMonth() + "-" + currentMonth.time.getFullYear();

		data.forEach((item) => {
			const itemTime = timeToDateUTC(item.time);
			const itemMonth = itemTime.getMonth() + "-" + itemTime.getFullYear();
			const itemWeekNumber = getWeekNumber(itemTime);

			const res = {
				time: itemTime,
				value: item.value,
				valueAtom: item.value_atom,
				valueOsmo: item.value_osmo,
			};
			liquidityDay.push(res);
			if (itemWeekNumber === weekNumberCurrentWeek) {
				currentWeek.value += item.value;
				currentWeek.valueAtom += item.value_atom;
				currentWeek.valueOsmo += item.value_osmo;
			} else {
				liquidityWeek.push({ ...currentWeek });
				currentWeek.time = itemTime;
				currentWeek.value = item.value;
				currentWeek.valueAtom = item.value_atom;
				currentWeek.valueOsmo = item.value_osmo;
				weekNumberCurrentWeek = itemWeekNumber;
			}

			if (itemMonth === timeCurrentMonth) {
				currentMonth.value += item.value;
				currentMonth.valueAtom += item.value_atom;
				currentMonth.valueOsmo += item.value_osmo;
			} else {
				liquidityMonth.push({ ...currentMonth });
				currentMonth.time = itemTime;
				currentMonth.value = item.value;
				currentMonth.valueAtom = item.value_atom;
				currentMonth.valueOsmo = item.value_osmo;
				timeCurrentMonth = itemMonth;
			}
		});

		liquidityWeek.push(currentWeek);
		liquidityMonth.push(currentMonth);

		this._liquidityDay = liquidityDay;
		this._liquidityWeek = liquidityWeek;
		this._liquidityMonth = liquidityMonth;
	}

	format(reponseData: PromiseRequest): void {
		const reponseLiquidity = reponseData[0].data;
		this.formatData(reponseLiquidity);
	}

	public getData = () => {
		this.sendRequest(() => Promise.all([axios({ url: `${API_URL}/liquidity/v2/historical/chart` })]));
	};

	public get errorTokens(): string | undefined {
		return this._error;
	}

	public get isLoadingTokens(): boolean {
		return this._isLoading;
	}

	public get liquidityDay(): LiquidityChart[] {
		return this._liquidityDay;
	}

	public get liquidityWeek(): LiquidityChart[] {
		return this._liquidityWeek;
	}

	public get liquidityMonth(): LiquidityChart[] {
		return this._liquidityMonth;
	}
}
