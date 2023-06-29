import { action, makeObservable, observable } from "mobx";
import { Request } from "../request";
import { autorun } from "mobx";
import { Token, TokensResponseList, MCapResponse, AssetListResponse, AssetList, Asset, AssetMap } from "./tokens";
import axios, { AxiosResponse } from "axios";
import { TokenStore } from "./token-store";
import { InitialState } from "../../root-store";

const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;

type PromiseRequest = [
	AxiosResponse<TokensResponseList, TokensResponseList>,
	AxiosResponse<MCapResponse, MCapResponse>,
	AxiosResponse<AssetListResponse, AssetListResponse>
];

export class TokensStore extends Request<PromiseRequest> {
	@observable private _tokens: TokenStore[];
	@observable private _assetList: AssetList;
	@observable private _assetMap: AssetMap;
	private _interval: NodeJS.Timeout | null = null;
	private _intervalTime: number;

	constructor() {
		super({ delayCache: 15 * 1000 });
		this._tokens = [];
		this._assetMap = {};
		this._assetList = { chainName: "", assets: [] };
		this._intervalTime = 5 * 1000;
		makeObservable(this);
		autorun(() => {
			this.play();
		});
	}

	@action
	hydrate({ tokensState }: InitialState): void {
		if (tokensState) {
			this.formatTokens(tokensState.tokens, tokensState.marketCap, tokensState.assetList);
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

	formatTokens(
		tokensResponses: TokensResponseList,
		mCapResponse: MCapResponse,
		assetListResponse: AssetListResponse
	): Token[] {
		const tokensFormatted: Token[] = [];
		const assetMap: { [key: string]: Asset } = {};
		const assetList: AssetList = {
			chainName: assetListResponse.chain_name,
			assets: assetListResponse.assets.map((asset) => {
				const currentAsset = {
					...asset,
					coingeckoId: asset.coingecko_id,
					denomUnits: asset.denom_units,
					logoURIs: asset.logo_URIs,
					main: false,
					traces: asset.traces.map((trace) => ({
						...trace,
						counterparty: {
							chainName: trace.counterparty.chain_name,
							baseDenom: trace.counterparty.base_denom,
						},
					})),
				};
				if (currentAsset.keywords && currentAsset.keywords.length > 0) {
					currentAsset.main = currentAsset.keywords.includes("osmosis-main");
					assetMap[currentAsset.symbol.toUpperCase()] = currentAsset;
					assetMap[currentAsset.display.toUpperCase()] = currentAsset;
					if (currentAsset.symbol.includes(".axl")) {
						const name = currentAsset.symbol.split(".")[0];
						assetMap[name] = currentAsset;
					}
					currentAsset.denomUnits.forEach((denomUnit) => {
						assetMap[denomUnit.denom] = currentAsset;
					});
				}
				return currentAsset;
			}),
		};

		tokensResponses.sort((a, b) => {
			if (a.liquidity > b.liquidity) return -1;
			if (a.liquidity < b.liquidity) return 1;
			return 0;
		});

		const getAsset = (token: Token): Asset | undefined => {
			let res: Asset | undefined;
			if (token.denom) {
				res = assetMap[token.denom];
			}
			if (token.symbol && !res) {
				res = assetMap[token.symbol.toUpperCase()];
			}
			return res;
		};

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
				image: "",
			};

			const mcapToken = mCapResponse.find((mc) => {
				return mc.symbol == token.symbol;
			});
			if (mcapToken) {
				token.marketCap = mcapToken.market_cap;
			}
			const currentAsset = getAsset(token);
			token.main = currentAsset?.main || false;

			if (currentAsset) {
				token.image = currentAsset.logoURIs.png || currentAsset.logoURIs.svg || "";
			}
			tokensFormatted.push(token);
		});
		this._assetList = assetList;
		this._assetMap = assetMap;
		this.saveTokens(tokensFormatted);
		return tokensFormatted;
	}

	@action
	saveTokens(tokens: Token[]) {
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
				if (!this._tokens[index].image && token.image) this._tokens[index].image = token.image;
				if (!this._tokens[index].exponent && token.exponent) this._tokens[index].exponent = token.exponent;
				if (!this._tokens[index].marketCap && token.marketCap) this._tokens[index].marketCap = token.marketCap;
			}
		});
	}

	format(reponseData: PromiseRequest): void {
		const responseToken = reponseData[0].data;
		const responseMcap = reponseData[1].data;
		const responseAssets = reponseData[2].data;
		this.formatTokens(responseToken, responseMcap, responseAssets);
	}

	public getTokens = () => {
		this.sendRequest(() =>
			Promise.all([
				axios({ url: `${API_URL}/tokens/v2/all` }),
				axios({ url: `${API_URL}/tokens/v2/mcap` }),
				axios({
					url: `https://raw.githubusercontent.com/osmosis-labs/assetlists/main/osmosis-1/osmosis-1.assetlist.json`,
				}),
			])
		);
	};

	public getToken(symbol: string): TokenStore | undefined {
		return this._tokens.find((tokenStore) => tokenStore.symbol === symbol);
	}

	public get tokens(): TokenStore[] {
		return this._tokens;
	}

	public get assetList(): AssetList {
		return this._assetList;
	}

	public get assetMap(): AssetMap {
		return this._assetMap;
	}

	public get errorTokens(): string | undefined {
		return this._error;
	}

	public get isLoadingTokens(): boolean {
		return this._isLoading;
	}
}
