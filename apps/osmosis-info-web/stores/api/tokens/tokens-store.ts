import { action, makeObservable, observable } from "mobx";
import { Request } from "../request";
import { autorun } from "mobx";
import { Token, TokensResponseList, MCapResponse } from "./tokens";
import axios, { AxiosResponse } from "axios";
import { TokenStore } from "./token-store";
import { InitialState } from "../../root-store";

const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;

type PromiseRequest = [
	AxiosResponse<TokensResponseList, TokensResponseList>,
	AxiosResponse<MCapResponse, MCapResponse>
];

export class TokensStore extends Request<Token[], PromiseRequest> {
	@observable private _tokens: TokenStore[];
	private _interval: NodeJS.Timeout | null = null;
	private _intervalTime: number;

	constructor() {
		super({ delayCache: 15 * 1000, defaultData: [] });
		this._tokens = [];
		this._intervalTime = 5 * 1000;
		makeObservable(this);
		autorun(() => {
			this.play();
		});
	}

	@action
	hydrate({ tokensState }: InitialState): void {
		if (tokensState) {
			this.formatTokens(tokensState.tokens, tokensState.marketCap);
		}
	}

	@action
	play = () => {
		this._interval = setInterval(this.getTokens, this._intervalTime);
	};

	@action
	pause = () => {
		clearInterval(this._interval!);
		this._interval = null;
	};

	formatTokens(tokensResponses: TokensResponseList, mCapResponse: MCapResponse): Token[] {
		const tokensFormatted: Token[] = [];

		tokensResponses.sort((a, b) => {
			if (a.liquidity > b.liquidity) return -1;
			if (a.liquidity < b.liquidity) return 1;
			return 0;
		});

		tokensResponses.forEach((dataToken, index) => {
			const token = {
				id: index + 1,
				price: dataToken.price,
				denom: dataToken.denom,
				symbol: dataToken.symbol,
				main: dataToken.main,
				liquidity: dataToken.liquidity,
				liquidity24hChange: 0,
				volume24h: dataToken.volume_24h,
				volume24hChange: dataToken.volume_24h_change,
				name: dataToken.name,
				price24hChange: dataToken.price_24h_change,
				price7dChange: 0,
				exponent: 0,
				marketCap: 0,
			};
			const mcapToken = mCapResponse.find((mc) => {
				return mc.symbol == token.symbol;
			});
			if (mcapToken) {
				token.marketCap = mcapToken.market_cap;
			}
			tokensFormatted.push(token);
		});
		this.saveTokens(tokensFormatted);
		return tokensFormatted;
	}

	@action
	saveTokens(tokens: Token[]) {
		// TO DO CHECK IF TOKEN IS ALREADY IN TOKENS
		this._lastCall = Date.now();
		tokens.forEach((token) => {
			const index = this._tokens.findIndex((t) => {
				return t.symbol === token.symbol;
			});
			if (index === -1) {
				this._tokens.push(new TokenStore({ token }));
			} else {
				//update token data, with tokens request we don't have
				// With tokens Request we have Price 7D change and market cap in more
				// The others informations are more truthful in token EndPoint
				// If they are already set, don't update

				// if (!this._tokens[index].price && token.price) this._tokens[index].price = token.price;
				if (!this._tokens[index].symbol && token.symbol) this._tokens[index].symbol = token.symbol;
				// if (!this._tokens[index].id && token.id) this._tokens[index].id = token.id;
				if (!this._tokens[index].denom && token.denom) this._tokens[index].denom = token.denom;
				if (!this._tokens[index].name && token.name) this._tokens[index].name = token.name;
				if (!this._tokens[index].main && token.main) this._tokens[index].main = token.main;
				// if (!this._tokens[index].liquidity && token.liquidity) this._tokens[index].liquidity = token.liquidity;
				// if (!this._tokens[index].liquidity24hChange && token.liquidity24hChange)
				// 	this._tokens[index].liquidity24hChange = token.liquidity24hChange;
				// if (!this._tokens[index].volume24h && token.volume24h) this._tokens[index].volume24h = token.volume24h;
				// if (!this._tokens[index].volume24hChange && token.volume24hChange)
				// 	this._tokens[index].volume24hChange = token.volume24hChange;
				// if (!this._tokens[index].price24hChange && token.price24hChange)
				// 	this._tokens[index].price24hChange = token.price24hChange;
				if (!this._tokens[index].price7dChange && token.price7dChange)
					this._tokens[index].price7dChange = token.price7dChange;
				if (!this._tokens[index].exponent && token.exponent) this._tokens[index].exponent = token.exponent;
				if (!this._tokens[index].marketCap && token.marketCap) this._tokens[index].marketCap = token.marketCap;
			}
		});
	}

	format(reponseData: PromiseRequest): void {
		const responseToken = reponseData[0].data;
		const responseMcap = reponseData[1].data;
		this.formatTokens(responseToken, responseMcap);
	}

	public getTokens = () => {
		this.sendRequest(() =>
			Promise.all([axios({ url: `${API_URL}/tokens/v2/all` }), axios({ url: `${API_URL}/tokens/v2/mcap` })])
		);
	};

	public getToken(symbol: string): TokenStore | undefined {
		return this._tokens.find((tokenStore) => tokenStore.symbol === symbol);
	}

	public get tokens(): TokenStore[] {
		return this._tokens;
	}

	public get errorTokens(): string | undefined {
		return this._error;
	}

	public get isLoadingTokens(): boolean {
		return this._isLoading;
	}
}
