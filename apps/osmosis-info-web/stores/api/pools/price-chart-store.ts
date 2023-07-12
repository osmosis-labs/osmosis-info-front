import { action, makeObservable, observable, toJS, autorun } from "mobx";
import axios, { AxiosResponse } from "axios";
import { timeToDateUTC } from "../../../helpers/date";
const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;

export type PriceChartData = {
	time: Date;
	close: number;
	high: number;
	low: number;
	open: number;
};

export type PriceChartDataResponse = {
	time: number;
	close: number;
	high: number;
	low: number;
	open: number;
};
type cachedData = {
	lastCall: number;
	isPending: boolean;
	data: PriceChartData[];
};
type PromiseRequest = AxiosResponse<PriceChartDataResponse[]>;

export type PriceChartPeriode = "7d" | "1mo" | "1y" | "all";

export class PriceChartStore {
	private _interval: NodeJS.Timeout | null = null;
	private _delayCache: number;

	private _id: number;

	@observable private _currentDenomIn: string;
	@observable private _currentDenomOut: string;
	@observable private _currentRange: PriceChartPeriode;

	// the error if the request failed
	@observable private _error: string | undefined;

	@observable
	private _data: PriceChartData[] = [];

	@observable
	private _dataCache: Record<string, cachedData> = {};

	constructor(id: number, defaultDenomIn: string, defaultDenomOut: string, defaultRange: PriceChartPeriode) {
		this._delayCache = 6 * 1000;
		this._id = id;
		this._currentDenomIn = defaultDenomIn;
		this._currentDenomOut = defaultDenomOut;
		this._currentRange = defaultRange;
		makeObservable(this);
	}

	@action
	play = () => {
		this.runInit();
		this._interval = setInterval(this.runInit, this._delayCache);
	};

	runInit = () => {
		this.getData(this._currentDenomIn, this._currentDenomOut, this._currentRange);
	};

	@action
	pause = () => {
		clearInterval(this._interval!);
		this._interval = null;
	};

	@action
	formatData(data: PriceChartDataResponse[]): PriceChartData[] {
		if (data.length === 0) return [];

		const currentsData: PriceChartData[] = [];

		data.forEach((item) => {
			const itemTime = timeToDateUTC(item.time);

			const res = {
				time: itemTime,
				close: item.close,
				high: item.high,
				low: item.low,
				open: item.open,
			};
			currentsData.push(res);
		});
		return currentsData;
	}

	@action getData = async (denomIn: string, denomOut: string, range: PriceChartPeriode) => {
		this._currentDenomIn = denomIn;
		this._currentDenomOut = denomOut;
		this._currentRange = range;

		if (!denomIn || !denomOut || !range) {
			this._dataCache[this.getName(denomIn, denomOut, range)] = {
				lastCall: 0,
				isPending: false,
				data: [],
			};
			this._data = [];
			return;
		}

		let currentCache = this._dataCache[this.getName(denomIn, denomOut, range)];
		// check if need to get data from server
		if (currentCache && Date.now() - currentCache.lastCall <= this._delayCache) {
			this._data = currentCache.data;
			return;
		}
		// else get data from server
		if (!currentCache) {
			currentCache = { isPending: false, lastCall: 0, data: [] };
		}
		if (currentCache.isPending) return;
		currentCache.lastCall = Date.now();
		currentCache.isPending = true;
		this._dataCache[this.getName(denomIn, denomOut, range)] = currentCache;

		try {
			const result: PromiseRequest = await axios({
				url: `${API_URL}/pairs/v1/historical/${this._id}/chart?asset_in=${this._currentDenomIn}&asset_out=${this._currentDenomOut}&range=${this._currentRange}&asset_type=denom`,
			});

			const currentData = this.formatData(result.data);
			this._data = currentData;
			currentCache.data = currentData;
			currentCache.isPending = false;
			this._dataCache[this.getName(denomIn, denomOut, range)] = currentCache;
		} catch (error) {
			let message = "Unknown Error";
			if (error instanceof Error) message = error.message;
			this._error = message;
		}
	};

	getName = (denomIn: string, denomOut: string, range: PriceChartPeriode) => {
		return `${denomIn}-${denomOut}-${range}`;
	};

	public get errorTokens(): string | undefined {
		return this._error;
	}

	public get data(): PriceChartData[] {
		return toJS(this._data);
	}
}
