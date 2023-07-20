import React, { useCallback, useEffect, useState } from "react";
import { PoolStore } from "../../../stores/api/pools/pool-store";
import { PoolToken } from "../../../stores/api/pools/pools";
import { Paper } from "@latouche/osmosis-info-ui";
import { ChartContainer } from "./chart-container";
import { ChartHeader } from "./chart-header";
import { useLanguage } from "../../../hooks/use-language";
import dayjs from "dayjs";
import { formateNumberDecimals } from "../../../helpers/format";

type ChartsProps = {
	pool: PoolStore | undefined;
	firstSelected: PoolToken | undefined;
	secondSelected: PoolToken | undefined;
};

export type TypeChart = "price" | "volume" | "liquidity";
export type PeriodeChartPrice = "7d" | "1mo" | "1y" | "all";
export type PeriodeChartVolume = "day" | "week" | "month";
export type PeriodeChart = PeriodeChartPrice | PeriodeChartVolume;

export const Charts = ({ pool, firstSelected, secondSelected }: ChartsProps) => {
	const locale = useLanguage();
	const [currentDate, setCurrentDate] = useState<string>("");

	const [typeChart, setTypeChart] = useState<TypeChart>("liquidity");
	const [periodeChart, setPeriodeChart] = useState<PeriodeChart>("day");

	const [currentValue, setCurrentValue] = useState<string>(`$${formateNumberDecimals(15.56)}`);

	useEffect(() => {
		setCurrentDate(dayjs(new Date()).locale(locale).format("LL"));
	}, [locale]);

	const onChangeTypeChart = (type: TypeChart) => {
		setTypeChart(type);
	};

	const onChangePeriodeChart = (periode: PeriodeChart) => {
		setPeriodeChart(periode);
	};

	const onChangeItem = useCallback((date: string, value: string) => {
		setCurrentValue(value);
		setCurrentDate(date);
	}, []);

	if (!pool)
		return (
			<Paper>
				<p>No data</p>
			</Paper>
		);

	return (
		<Paper>
			<ChartHeader
				currentDate={currentDate}
				currentValue={currentValue}
				onChangeType={onChangeTypeChart}
				typeChart={typeChart}
				onChangePeriode={onChangePeriodeChart}
				periodeChart={periodeChart}
			/>

			<ChartContainer
				firstSelected={firstSelected}
				secondSelected={secondSelected}
				pool={pool}
				onChangeItem={onChangeItem}
				typeChart={typeChart}
				periodeChart={periodeChart}
			/>
		</Paper>
	);
};
