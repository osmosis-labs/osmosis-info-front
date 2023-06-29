import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BarTime, LineTime } from "@latouche/osmosis-info-ui";
import { appleStock } from "@visx/mock-data/";
import { AppleStock } from "@visx/mock-data/lib/mocks/appleStock";
import { HeaderChart } from "./header-chart";
import { bisector } from "d3-array";
import { timeFormat } from "d3-time-format";
import { useStore } from "../../stores";
import { LiquidityChart as DataLiquidity } from "../../stores/api/charts/charts";
import { observer } from "mobx-react-lite";
import { formaterNumber } from "../../helpers/format";

const getXAxisData = (d: DataLiquidity) => d.time;
const getYAxisData = (d: DataLiquidity) => d.value;

const bisectIndexDate = bisector<DataLiquidity, Date>((d: DataLiquidity) => new Date(d.time)).left;

const formatX = (d: DataLiquidity) => timeFormat("%b %d %y")(getXAxisData(d));

const formatY = (d: DataLiquidity) => `$${formaterNumber(Math.round(d.value))}`;

const tickFormatY = (d: number) => `${formaterNumber(Math.round(d))}`;

type Periode = "day" | "week" | "month";
type TypeValue = "price" | "osmo" | "atom";

export const LiquidityChart = observer(() => {
	const {
		liquidityStore: { liquidityDay, liquidityWeek, liquidityMonth },
	} = useStore();
	const [currentData, setCurrentData] = useState<DataLiquidity | null>(null);
	const [periode, setPeriode] = useState<Periode>("day");
	const [typeValue, setTypeValue] = useState<TypeValue>("price");
	const [defaultView, setDefaultView] = useState<[number, number]>([0, 0]);
	const [dataDisplay, setDataDisplay] = useState<DataLiquidity[]>(liquidityDay);

	const onHover = useCallback((d: DataLiquidity) => {
		setCurrentData(d);
	}, []);

	useEffect(() => {
		setDataDisplay(liquidityDay);
		setDefaultView([liquidityDay.length - 300, liquidityDay.length]);
		console.log("%cliquidity-chart.tsx -> 40 BLUE: liquidityDay", "background: #2196f3; color:#FFFFFF", liquidityDay);
	}, [liquidityDay]);

	return (
		<div className="w-full m-2">
			<HeaderChart data={currentData} />
			<p>Date scale </p>
			<div className="flex w-full">
				<div className="max-h-[500px] max-w-[100%] w-full h-[500px] overflow-hidden">
					<LineTime<DataLiquidity>
						maxHeight={500}
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
