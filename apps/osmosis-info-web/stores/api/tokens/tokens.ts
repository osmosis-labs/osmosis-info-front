export type TokensResponseList = TokensResponse[];

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

export type TokensResponse = {
	price: number;
	denom: string;
	symbol: string;
	main: boolean;
	liquidity: number;
	volume_24h: number;
	volume_24h_change: number;
	name: string;
	price_24h_change: number;
	price_7d_change: number;
	exponent: number;
};

export type MCapResponse = [
	{
		symbol: string;
		market_cap: number;
	}
];

export type TokenResponse = {
	price: number;
	denom: string;
	symbol: string;
	main: boolean;
	liquidity: number;
	liquidity_24h_change: number;
	volume_24h: number;
	volume_24h_change: number;
	name: string;
	price_24h_change: number;
	exponent: number;
};

export interface Token {
	id: number;
	price: number;
	denom: string;
	symbol: string;
	main: boolean;
	liquidity: number;
	liquidity24hChange: number;
	volume24h: number;
	volume24hChange: number;
	name: string;
	price24hChange: number;
	price7dChange: number;
	exponent: number;
	marketCap: number;
	image: string;
}
