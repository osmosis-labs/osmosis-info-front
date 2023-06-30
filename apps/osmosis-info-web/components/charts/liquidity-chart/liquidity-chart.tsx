import React, { useCallback, useEffect, useState } from "react";
import { LineTime } from "@latouche/osmosis-info-ui";
import { HeaderChart } from "./header-chart";
import { bisector } from "d3-array";
import { timeFormat } from "d3-time-format";
import { useStore } from "../../../stores";
import { LiquidityChart as DataLiquidity } from "../../../stores/api/charts/charts";
import { observer } from "mobx-react-lite";
import { formaterNumber } from "../../../helpers/format";

const getXAxisData = (d: DataLiquidity) => d.time;

const bisectIndexDate = bisector<DataLiquidity, Date>((d: DataLiquidity) => new Date(d.time)).left;

const formatX = (d: DataLiquidity) => timeFormat("%b %d %y")(getXAxisData(d));

const tickFormatY = (d: number) => `${formaterNumber(Math.round(d))}`;

export type Periode = "day" | "week" | "month";
export type TypeValue = "usd" | "osmo" | "atom";

export const LiquidityChart = observer(() => {
	const {
		liquidityStore: { liquidityDay, liquidityWeek, liquidityMonth },
	} = useStore();
	const [currentData, setCurrentData] = useState<DataLiquidity | null>(null);
	const [periode, setPeriode] = useState<Periode>("day");
	const [typeValue, setTypeValue] = useState<TypeValue>("usd");
	const [defaultView, setDefaultView] = useState<[number, number]>([0, 0]);
	const [dataDisplay, setDataDisplay] = useState<DataLiquidity[]>(liquidityDay);

	useEffect(() => {
		let periodeToRemove = 300;
		let dataDisplay = liquidityDay;
		if (periode === "week") {
			periodeToRemove = 50;
			dataDisplay = liquidityWeek;
		} else if (periode === "month") {
			dataDisplay = liquidityMonth;
			periodeToRemove = 12;
		}
		setDataDisplay(dataDisplay);
		setDefaultView([dataDisplay.length - periodeToRemove, dataDisplay.length]);
		setCurrentData(dataDisplay[dataDisplay.length - 1]);
	}, [liquidityDay, liquidityMonth, liquidityWeek, periode]);

	const getYAxisData = useCallback<(d: DataLiquidity) => number>(
		(d: DataLiquidity) => {
			if (typeValue === "osmo") return d.valueOsmo;
			if (typeValue === "atom") return d.valueAtom;
			return d.value;
		},
		[typeValue]
	);

	const formatY = useCallback<(d: DataLiquidity) => string>(
		(d: DataLiquidity) => {
			if (typeValue === "osmo") return `$${formaterNumber(Math.round(d.valueOsmo))}`;
			if (typeValue === "atom") return `$${formaterNumber(Math.round(d.valueAtom))}`;
			return `$${formaterNumber(Math.round(d.value))}`;
		},
		[typeValue]
	);

	const onHover = useCallback((d: DataLiquidity) => {
		setCurrentData(d);
	}, []);

	const onChangePeriode = useCallback(
		(periode: Periode) => {
			setPeriode(periode);
			if (periode === "day") {
				setDataDisplay(liquidityDay);
				setCurrentData(liquidityDay[liquidityDay.length - 1]);
			} else if (periode === "week") {
				setDataDisplay(liquidityWeek);
				setCurrentData(liquidityWeek[liquidityWeek.length - 1]);
			} else if (periode === "month") {
				setDataDisplay(liquidityMonth);
				setCurrentData(liquidityMonth[liquidityMonth.length - 1]);
			}
		},
		[liquidityDay, liquidityMonth, liquidityWeek]
	);

	const onChangeTypeValue = useCallback((typeValue: TypeValue) => {
		setTypeValue(typeValue);
	}, []);

	return (
		<div className="w-full pt-5 px-5 rounded-md bg-card">
			<HeaderChart
				data={currentData}
				onChangePeriode={onChangePeriode}
				onChangeTypeValue={onChangeTypeValue}
				periode={periode}
				typeValue={typeValue}
			/>
			<div className="flex w-full">
				<div className="max-h-[500px] max-w-[100%] w-full h-[500px] overflow-hidden">
					<LineTime<DataLiquidity>
						maxHeight={500}
						lineTimeTooltipCursor={{ display: false }}
						data={dataDisplay}
						onHover={onHover}
						onClick={onHover}
						getXAxisData={getXAxisData}
						getYAxisData={getYAxisData}
						bisectDate={bisectIndexDate}
						formatX={formatX}
						formatY={formatY}
						tickFormatY={tickFormatY}
						defaultView={defaultView}
					/>
				</div>
			</div>
		</div>
	);
});
