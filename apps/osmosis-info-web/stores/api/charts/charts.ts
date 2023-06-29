export interface LiquidityResponse {
	time: string;
	value: number;
	value_atom: number;
	value_osmo: number;
}

export interface VolumeResponse {
	time: string;
	value: number;
}

export type ChartLiquidityResponse = LiquidityResponse[];
export type ChartVolumeResponse = VolumeResponse[];

export type LiquidityChart = {
	time: Date;
	value: number;
	valueAtom: number;
	valueOsmo: number;
};

export type VolumeChart = {
	time: Date;
	value: number;
};
