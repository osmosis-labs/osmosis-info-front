import { action, makeObservable, observable, autorun } from "mobx";
import { Request } from "../request";
const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;
import axios, { AxiosResponse } from "axios";
import { InitialState } from "../../root-store";
import { Token } from "../tokens/tokens";

export class AssetsStore extends Request<AxiosResponse<AssetListResponse>> {
	@observable private _assetList: AssetList;
	@observable private _assetMap: AssetMap;

	constructor() {
		super({ delayCache: 5 * 60 * 100 });
		this._assetMap = {};
		this._assetList = { chainName: "", assets: [] };
		makeObservable(this);
		autorun(() => {
			this.getAssets();
		});
	}

	format(response: AxiosResponse<AssetListResponse>): void {
		this.formatData(response.data);
	}

	@action
	formatData(data: AssetListResponse): void {
		const assetMap: { [key: string]: Asset } = {};
		const assetList: AssetList = {
			chainName: data.chain_name,
			assets: data.assets.map((asset) => {
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

		this._assetList = assetList;
		this._assetMap = assetMap;
	}

	getAssetFromDenom = (denom: string): Asset | undefined => this._assetMap[denom];

	getAssetFromSymbol = (symbol: string): Asset | undefined => this._assetMap[symbol.toUpperCase()];

	getImageFromSymbol = (symbol: string): string => {
		const currentAsset = this.getAssetFromSymbol(symbol);
		if (currentAsset) {
			return currentAsset.logoURIs.png || currentAsset.logoURIs.svg || "";
		}
		return "";
	};

	getImageFromDenom = (denom: string): string => {
		const currentAsset = this.getAssetFromDenom(denom);
		if (currentAsset) {
			return currentAsset.logoURIs.png || currentAsset.logoURIs.svg || "";
		}
		return "";
	};

	getAssetFromToken = (token: Token): Asset | undefined => {
		let res: Asset | undefined;
		if (token.denom) {
			res = this.getAssetFromDenom(token.denom);
		}
		if (token.symbol && !res) {
			res = this.getAssetFromSymbol(token.symbol.toUpperCase());
		}
		return res;
	};

	@action
	hydrate({ assetsState }: InitialState): void {
		if (assetsState) {
			this.formatData(assetsState);
		}
	}

	public get assetList(): AssetList {
		return this._assetList;
	}

	public get assetMap(): AssetMap {
		return this._assetMap;
	}

	public get error(): string | undefined {
		return this._error;
	}

	public get isLoading(): boolean {
		return this._isLoading;
	}

	public getAssets = async () => {
		this.sendRequest(() =>
			axios({
				url: `https://raw.githubusercontent.com/osmosis-labs/assetlists/main/osmosis-1/osmosis-1.assetlist.json`,
			})
		);
	};
}

export type AssetListResponse = {
	chain_name: string;
	assets: AssetResponse[];
};

export type AssetResponse = {
	base: string;
	coingecko_id: string;
	denom_units: DenomUnit[];
	description: string;
	display: string;
	keywords: string[];
	logo_URIs: {
		png?: string;
		svg?: string;
	};
	name: string;
	symbol: string;
	traces: {
		type: string;
		provider: string;
		counterparty: {
			chain_name: string;
			base_denom: string;
		};
	}[];
	type_asset?: string;
};

export type AssetList = {
	chainName: string;
	assets: Asset[];
};

export type Asset = {
	base: string;
	coingeckoId: string;
	denomUnits: DenomUnit[];
	description: string;
	display: string;
	keywords: string[];
	logoURIs: {
		png?: string;
		svg?: string;
	};
	main: boolean;
	name: string;
	symbol: string;
	traces: {
		type: string;
		provider: string;
		counterparty: {
			chainName: string;
			baseDenom: string;
		};
	}[];
	typeAsset?: string;
};

export type AssetMap = { [key: string]: Asset };

export type DenomUnit = {
	denom: string;
	exponent: number;
};
