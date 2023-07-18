import { action, makeObservable, observable } from "mobx";
import { Request } from "../request";
import { autorun } from "mobx";
import axios, { AxiosResponse } from "axios";
import { InitialState } from "../../root-store";
import { APRsResponse, FeesResponse, Pool, PoolAPR, PoolToken, PoolsResponse } from "./pools";
import { PoolStore } from "./pool-store";
import { TokensStore } from "../tokens/tokens-store";

const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;

type PromiseRequest = [
	AxiosResponse<PoolsResponse, PoolsResponse>,
	AxiosResponse<APRsResponse, APRsResponse>,
	AxiosResponse<FeesResponse, FeesResponse>
];

export class PoolsStore extends Request<PromiseRequest> {
	@observable private _tokens: TokensStore;
	@observable private _pools: PoolStore[];
	private _interval: NodeJS.Timeout | null = null;
	private _intervalTime: number;

	constructor(tokenStore: TokensStore) {
		super({ delayCache: 15 * 1000 });
		this._tokens = tokenStore;
		this._pools = [];
		this._intervalTime = 5 * 1000;
		makeObservable(this);
		autorun(() => {
			this.play();
		});
	}

	@action
	hydrate({ poolsState }: InitialState): void {
		if (poolsState) {
			this.formatPools(poolsState.pools, poolsState.apr, poolsState.fees);
		}
	}

	@action
	play = () => {
		this._interval = setInterval(this.getPools, this._intervalTime);
	};

	@action
	pause = () => {
		clearInterval(this._interval!);
		this._interval = null;
	};

	formatPools(pools: PoolsResponse, apr: APRsResponse, fees: FeesResponse): Pool[] {
		const poolsFormatted: Pool[] = [];

		Object.keys(pools).forEach((idPool) => {
			const poolResponse = pools[idPool];
			const aprResponse = apr.find((apr) => apr.pool_id == idPool);
			const feeResponse = fees.data.find((fee) => fee.pool_id == idPool);

			const aprPool: PoolAPR[] = [];

			aprResponse?.apr_list.forEach((currentAPR) => {
				const currentTokenAPR = this._tokens.getToken(currentAPR.symbol);
				if (!currentTokenAPR) return null;
				aprPool.push({
					token: currentTokenAPR,
					startDate: currentAPR.start_date,
					apr1d: currentAPR.apr_1d,
					apr7d: currentAPR.apr_7d,
					apr14d: currentAPR.apr_14d,
					aprSuperfluid: currentAPR.apr_superfluid,
				});
			});
			let main = true;
			const pool: Pool = {
				id: parseInt(idPool),
				main: false,
				apr: aprPool,
				liquidity: poolResponse[0].liquidity,
				liquidity24hChange: poolResponse[0].liquidity_24h_change,
				volume24h: poolResponse[0].volume_24h,
				volume24hChange: poolResponse[0].volume_24h_change,
				volume7d: poolResponse[0].volume_7d,
				fees: {
					volume24h: 0,
					volume7d: 0,
					feesSpent24h: 0,
					feesSpent7d: 0,
					feesPercentage: 0,
				},
				tokens: [],
			};

			if (feeResponse) {
				pool.fees = {
					volume24h: feeResponse.volume_24h,
					volume7d: feeResponse.volume_7d,
					feesSpent24h: feeResponse.fees_spent_24h,
					feesSpent7d: feeResponse.fees_spent_7d,
					feesPercentage: parseFloat(feeResponse.fees_percentage),
				};
			}
			poolResponse.forEach((tokenPoolResponse) => {
				const currentToken: PoolToken = {
					denom: tokenPoolResponse.denom,
					symbol: tokenPoolResponse.symbol,
					amount: tokenPoolResponse.amount,
				};
				const currentTokenStore =
					this._tokens.getToken(tokenPoolResponse.symbol) ?? this._tokens.getTokenByDenom(tokenPoolResponse.denom);
				if (currentTokenStore && !currentTokenStore.main) {
					main = false;
				}
				if (currentTokenStore) {
					currentToken.tokenStore = currentTokenStore;
				}
				pool.tokens.push(currentToken);
			});
			pool.main = main;
			poolsFormatted.push(pool);
		});

		this.savePools(poolsFormatted);
		return poolsFormatted;
	}

	@action
	savePools(pools: Pool[]) {
		this._lastCall = Date.now();
		// If pool doesn't exist, create it
		// Else update data whot need to be updated
		pools.forEach((pool) => {
			const index = this._pools.findIndex((p) => {
				return p.id === pool.id;
			});
			if (index === -1) {
				this._pools.push(new PoolStore({ pool }));
			} else {
				//update current pool
				this._pools[index].update({ pool });
			}
		});
	}

	format(reponseData: PromiseRequest): void {
		const responseToken = reponseData[0].data;
		const responseMcap = reponseData[1].data;
		const responseFees = reponseData[2].data;
		this.formatPools(responseToken, responseMcap, responseFees);
	}

	public getPools = () => {
		this.sendRequest(() =>
			Promise.all([
				axios({ url: `${API_URL}/pools/v2/all?low_liquidity=false` }),
				axios({ url: `${API_URL}/apr/v2/all` }),
				axios({ url: `${API_URL}/fees/v1/pools` }),
			])
		);
	};

	public getPool = (id: number): PoolStore | undefined => {
		return this._pools.find((pool) => pool.id === id);
	};

	public get pools(): PoolStore[] {
		return this._pools;
	}

	public get errorPools(): string | undefined {
		return this._error;
	}

	public get isLoadingPools(): boolean {
		return this._isLoading;
	}
}
