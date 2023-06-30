import React, { useCallback, useEffect, useState } from "react";
import { BarTime } from "@latouche/osmosis-info-ui";
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

const getYAxisData = (d: DataLiquidity) => d.value;

const formatY = (d: DataLiquidity) => `$${formaterNumber(Math.round(d.value))}`;

const barOptions = {
	fillColor: "#140F34",
	strokeColor: "#f6e1b8",
};

export type Periode = "day" | "week" | "month";

export const VolumeChart = observer(() => {
	const {
		liquidityStore: { liquidityDay, liquidityWeek, liquidityMonth },
	} = useStore();
	const [currentData, setCurrentData] = useState<DataLiquidity | null>(null);
	const [periode, setPeriode] = useState<Periode>("day");
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

	return (
		<div className="w-full pt-5 px-5 rounded-md bg-card">
			<HeaderChart data={currentData} onChangePeriode={onChangePeriode} periode={periode} />
			<div className="flex w-full">
				<div className="max-h-[500px] max-w-[100%] w-full h-[500px] overflow-hidden">
					<BarTime<DataLiquidity>
						maxHeight={500}
						barTimeTooltipCursor={{ display: false }}
						data={dataDisplay}
						onHover={onHover}
						onClick={onHover}
						getXAxisData={formatX}
						getYAxisData={getYAxisData}
						formatX={formatX}
						formatY={formatY}
						tickFormatY={tickFormatY}
						defaultView={defaultView}
						barOptions={barOptions}
					/>
				</div>
			</div>
		</div>
	);
});
