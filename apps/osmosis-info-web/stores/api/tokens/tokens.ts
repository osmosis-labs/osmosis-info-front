export type TokensResponseList = TokensResponse[];

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
}
