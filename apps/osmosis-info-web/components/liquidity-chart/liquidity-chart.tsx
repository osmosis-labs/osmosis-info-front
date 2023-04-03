import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BarTime, LineTime } from "@latouche/osmosis-info-ui";
import { appleStock } from "@visx/mock-data/";
import { AppleStock } from "@visx/mock-data/lib/mocks/appleStock";
import { HeaderChart } from "./header-chart";
import { bisector } from "d3-array";
import { timeFormat } from "d3-time-format";

export interface DataLiquidity {
	price: number;
	time: string;
}

const getXAxisData = (d: AppleStock) => new Date(d.date);
const getYAxisData = (d: AppleStock) => d.close;

const bisectIndexDate = bisector<AppleStock, Date>((d: AppleStock) => new Date(d.date)).left;

const formatX = (d: AppleStock) => timeFormat("%b %d %y")(getXAxisData(d));

const formatY = (d: AppleStock) => `$${Math.round(getYAxisData(d))}`;
const getXAxisDataBar = (d: AppleStock) => formatX(d);

export const LiquidityChart = () => {
	const data = useMemo(() => appleStock.slice(800), []);
	const [currentData, setCurrentData] = useState<AppleStock | null>(null);

	const onHover = useCallback((d: AppleStock) => {
		setCurrentData(d);
	}, []);

	useEffect(() => {
		if (data.length > 0 && currentData === null) {
			setCurrentData(data[data.length - 1]);
		}
	}, [currentData, data]);

	return (
		<div>
			<HeaderChart data={currentData} />
			<p>Date scale </p>
			<div className="flex w-full">
				<div className="max-h-[500px] max-w-[100%] w-full h-[500px] overflow-hidden">
					<LineTime<AppleStock>
						maxHeight={500}
						data={data}
						onHover={onHover}
						onClick={onHover}
						getXAxisData={getXAxisData}
						getYAxisData={getYAxisData}
						bisectDate={bisectIndexDate}
						formatX={formatX}
						formatY={formatY}
					/>
				</div>
				<div className="max-h-[500px] max-w-[100%] w-full h-[500px] overflow-x-hidden">
					<BarTime<AppleStock>
						maxHeight={500}
						data={data.slice(0, 100)}
						getXAxisData={getXAxisDataBar}
						getYAxisData={getYAxisData}
					/>
				</div>
			</div>
		</div>
	);
};
