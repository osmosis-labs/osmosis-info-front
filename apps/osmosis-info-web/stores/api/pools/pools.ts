import { TokenStore } from "../tokens/token-store";

export type Pool = {
	id: number;
	main: boolean;
	tokens: PoolToken[];
	apr: PoolAPR[];
	liquidity: number;
	liquidity24hChange: number;
	volume24h: number;
	volume24hChange: number;
	volume7d: number;
	fees: Fees;
};

export type PoolToken = {
	tokenStore?: TokenStore;
	symbol: string;
	denom: string;
};

export type PoolAPR = {
	startDate: string;
	apr1d: number;
	apr7d: number;
	apr14d: number;
	aprSuperfluid: number;
	token?: TokenStore;
};

export type ReturnAPR = {
	apr1d: number;
	apr7d: number;
	apr14d: number;
	aprSuperfluid: number;
	tokens: TokenStore[];
};

export type Fees = {
	volume24h: number;
	volume7d: number;
	feesSpent24h: number;
	feesSpent7d: number;
	feesPercentage: number;
};
export type FeesResponse = {
	last_update_at: string;
	data: FeeResponse[];
};
export type FeeResponse = {
	pool_id: string;
	volume_24h: number;
	volume_7d: number;
	fees_spent_24h: number;
	fees_spent_7d: number;
	fees_percentage: string;
};

export type PoolResponse = PoolTokenResponse[];

export type PoolTokenResponse = {
	symbol: string;
};

export type PoolsResponse = {
	[key: string]: {
		symbol: string;
		amount: number;
		denom: string;
		coingecko_id: string;
		liquidity: number;
		liquidity_24h_change: number;
		volume_24h: number;
		volume_24h_change: number;
		volume_7d: number;
		price: number;
		fees: string;
	}[];
};

export type APRsResponse = APRResponse[];

export type APRResponse = {
	pool_id: string;
	apr_list: {
		start_date: string;
		denom: string;
		symbol: string;
		apr_1d: number;
		apr_7d: number;
		apr_14d: number;
		apr_superfluid: number;
	}[];
};
