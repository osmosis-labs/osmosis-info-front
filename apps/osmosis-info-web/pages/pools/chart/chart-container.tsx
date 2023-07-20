import React, { useCallback, useEffect, useState } from "react";
import { ChartHeader } from "./chart-header";
import { PeriodeChart, TypeChart } from "./charts";
import { PoolStore } from "../../../stores/api/pools/pool-store";
import { PoolToken } from "../../../stores/api/pools/pools";
import { ChartLiquidity } from "./chart-liquidity";
import { ChartVolume } from "./chart-volume";
import { ChartPrice } from "./chart-price";

type ChartContainerProps = {
	typeChart: TypeChart;
	periodeChart: PeriodeChart;
	onChangeItem: (date: string, value: string) => void;
	pool: PoolStore;
	firstSelected: PoolToken | undefined;
	secondSelected: PoolToken | undefined;
};

export const ChartContainer = ({
	typeChart,
	periodeChart,
	onChangeItem,
	pool,
	firstSelected,
	secondSelected,
}: ChartContainerProps) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(false);

		const timeout = setTimeout(() => {
			setIsVisible(true);
		}, 300);

		return () => clearTimeout(timeout);
	}, [typeChart]);

	return (
		<div className={`chart-container transition-opacity ${isVisible ? "opacity-100  duration-300" : "opacity-0"}`}>
			{typeChart === "liquidity" ? (
				<ChartLiquidity periode={periodeChart} pool={pool} onChangeItem={onChangeItem} />
			) : typeChart === "volume" ? (
				<ChartVolume periode={periodeChart} />
			) : (
				<ChartPrice periode={periodeChart} />
			)}
		</div>
	);
};
