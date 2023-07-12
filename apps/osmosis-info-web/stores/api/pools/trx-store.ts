import { action, makeObservable, observable, toJS } from "mobx";
import { Request } from "../request";
import axios, { AxiosResponse } from "axios";
const API_URL_CHAIN = process.env.NEXT_PUBLIC_APP_CHAIN_API_URL;

type PromiseRequest = [AxiosResponse<TrxResponse[]>];

export class TrxStore extends Request<PromiseRequest> {
	private _id: number;

	@observable
	private _data: Trx[] = [];

	constructor(id: number) {
		super({ delayCache: 5 * 1000 });
		this._id = id;
		makeObservable(this);
	}

	@action
	formatData(data: TrxResponse[]) {
		if (data.length === 0) return;
		this._data = data.map((trx) => {
			const pools: PoolsTrx[] = [];
			const routes = trx.swap_route.routes.map((route) => {
				pools.push({
					id: route.pool_id,
					name: route.poolName,
					symbols: route.poolName.split("/"),
				});
				return {
					poolId: route.pool_id,
					poolName: route.poolName,
					tokenOutDenom: route.token_out_denom,
				};
			});
			return {
				hash: trx.tx_hash,
				time: new Date(trx.time_tx),
				address: trx.address,
				in: {
					symbol: trx.symbol_in,
					denom: trx.denom_in,
					value: trx.amount_in,
				},
				out: {
					symbol: trx.symbol_out ?? "",
					denom: trx.denom_out ?? "",
					value: trx.amount_out,
				},
				valueUsd: trx.value_usd,
				routes,
				pools,
			};
		});
	}

	@action
	format(responseData: PromiseRequest): void {
		this.formatData(responseData[0].data);
	}

	@action
	getData = ({ limit, offset }: { limit: number; offset: number }) => {
		this.sendRequest(() =>
			Promise.all([
				axios({ url: `${API_URL_CHAIN}/swap/v1/pool/${this._id}?only_success=true&limit=${limit}&offset=${offset}` }),
			])
		);
	};

	public get errorTokens(): string | undefined {
		return this._error;
	}

	public get isLoadingTokens(): boolean {
		return this._isLoading;
	}

	public get data(): Trx[] {
		return toJS(this._data);
	}
}

type TrxRouteResponse = {
	pool_id: string;
	poolName: string;
	token_out_denom: string;
};

type TrxResponse = {
	tx_hash: string;
	code: number;
	first_pool: number;
	count_route: number;
	swap_route: {
		routes: TrxRouteResponse[];
	};
	symbol_in: string;
	denom_in: string;
	amount_in: number;
	amount_in_exp: string;
	symbol_out: null | string;
	denom_out: null | string;
	amount_out: number;
	amount_out_exp: string;
	value_usd: number;
	address: string;
	time_tx: string;
};

export type TrxRoute = {
	poolId: string;
	poolName: string;
	tokenOutDenom: string;
};

export type PoolsTrx = {
	symbols: string[];
	name: string;
	id: string;
};

export type EnterTrx = {
	symbol: string;
	value: number;
	denom: string;
};

export type Trx = {
	hash: string;
	time: Date;
	in: EnterTrx;
	out: EnterTrx;
	valueUsd: number;
	address: string;
	pools: PoolsTrx[];
	routes: TrxRoute[];
};
