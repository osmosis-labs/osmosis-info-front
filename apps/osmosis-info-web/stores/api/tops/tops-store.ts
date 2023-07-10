import { action, makeObservable, observable } from "mobx";
import { Request } from "../request";
import { Top, TopsResponse } from "./tops";
import { AxiosResponse } from "axios";
import { InitialState } from "../../root-store";
import { TokensStore } from "../tokens/tokens-store";

export class TopsStore extends Request<AxiosResponse<TopsResponse, TopsResponse>> {
	private _gainers: Top[] = [];
	private _losers: Top[] = [];
	@observable private _tokens: TokensStore;

	constructor(tokenStore: TokensStore) {
		super({ delayCache: 5 * 60 * 100 });
		this._tokens = tokenStore;
		makeObservable(this);
	}

	format(response: AxiosResponse<TopsResponse, TopsResponse>): void {
		this.formatData(response.data);
	}

	@action
	formatData = ({ gainers, losers }: TopsResponse): void => {
		const newGainers = gainers.map((gainer) => {
			return {
				name: gainer.name,
				symbol: gainer.symbol,
				price: gainer.price,
				denom: gainer.denom,
				price24hChange: gainer.price_24h_change,
				token: this._tokens.getToken(gainer.symbol),
			};
		});
		const newLosers = losers.map((losers) => {
			return {
				name: losers.name,
				symbol: losers.symbol,
				price: losers.price,
				denom: losers.denom,
				price24hChange: losers.price_24h_change,
				token: this._tokens.getToken(losers.symbol),
			};
		});

		newLosers.sort((a, b) => {
			return b.price24hChange - a.price24hChange;
		});
		newGainers.sort((a, b) => {
			return b.price24hChange - a.price24hChange;
		});
		this._gainers = newGainers;
		this._losers = newLosers;
	};

	@action
	hydrate({ topsState }: InitialState): void {
		if (topsState) {
			this.formatData(topsState);
		}
	}

	public get gainers(): Top[] {
		return this._gainers;
	}

	public get losers(): Top[] {
		return this._losers;
	}

	public get errorMetrics(): string | undefined {
		return this._error;
	}

	public get isLoadingMetrics(): boolean {
		return this._isLoading;
	}
}
