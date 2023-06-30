import { action, makeObservable } from "mobx";
import { Request } from "../request";
import { defautMetrics, Metrics, MetricsResponse } from "./metrics";
const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;
import axios, { AxiosResponse } from "axios";
import { InitialState } from "../../root-store";

export class MetricsStore extends Request<AxiosResponse<MetricsResponse, MetricsResponse>> {
	private _data: Metrics = defautMetrics;
	constructor() {
		super({ delayCache: 5 * 60 * 100 });
		makeObservable(this);
	}

	format(response: AxiosResponse<MetricsResponse, MetricsResponse>): void {
		this.formatData(response.data);
	}

	@action
	formatData(data: MetricsResponse): void {
		this._data = {
			volume24h: data.volume_24h,
			volume24hChange: data.volume_24h_change,
			liquidityUsd: data.liquidity_usd,
			liquidityUsd24h: data.liquidity_usd_24h,
		};
	}

	@action
	hydrate({ metricsState }: InitialState): void {
		if (metricsState) {
			this.formatData(metricsState);
		}
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
