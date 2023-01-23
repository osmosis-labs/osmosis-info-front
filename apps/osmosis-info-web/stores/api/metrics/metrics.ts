export interface MetricsResponse {
	volume_24h: number;
	volume_24h_change: number;
	liquidity_usd: number;
	liquidity_usd_24h: number;
}

export interface Metrics {
	volume24h: number;
	volume24hChange: number;
	liquidityUsd: number;
	liquidityUsd24h: number;
}

export const defautMetrics: Metrics = {
	volume24h: 0,
	volume24hChange: 0,
	liquidityUsd: 0,
	liquidityUsd24h: 0,
};
