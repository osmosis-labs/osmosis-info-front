import { action, makeObservable } from "mobx";
import { Request } from "../request";
import { defautMetrics, Metrics, MetricsResponse } from "./metrics";
const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;
import axios, { AxiosResponse } from "axios";

export class MetricsStore extends Request<Metrics, AxiosResponse<MetricsResponse, MetricsResponse>> {
	constructor() {
		super({ delayCache: 5 * 60 * 100, defaultData: defautMetrics });
		makeObservable(this);
	}

	@action
	format(response: AxiosResponse<MetricsResponse, MetricsResponse>): void {
		const data = response.data;
		this._data = {
			volume24h: data.volume_24h,
			volume24hChange: data.volume_24h_change,
			liquidityUsd: data.liquidity_usd,
			liquidityUsd24h: data.liquidity_usd_24h,
		};
	}

	public get metrics(): Metrics {
		return this._data;
	}

	public get errorMetrics(): string | undefined {
		return this._error;
	}

	public get isLoadingMetrics(): boolean {
		return this._isLoading;
	}

	public getMetrics = async () => {
		this.sendRequest(() => axios({ url: `${API_URL}/overview/v1/metrics` }));
	};
}
