import { TokenStore } from "../tokens/token-store";

export interface TopResponse {
	name: string;
	symbol: string;
	denom: string;
	price: number;
	price_24h_change: number;
}

export interface Top {
	name: string;
	symbol: string;
	denom: string;
	price: number;
	price24hChange: number;
	token?: TokenStore;
}

export interface TopsResponse {
	gainers: TopResponse[];
	losers: TopResponse[];
}
