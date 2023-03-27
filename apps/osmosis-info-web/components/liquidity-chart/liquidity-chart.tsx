import React, { useCallback, useEffect, useMemo, useState } from "react";
import { LineTime } from "@latouche/osmosis-info-ui";
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

export const formatX = (d: AppleStock) => timeFormat("%b %d")(getXAxisData(d));

export const formatY = (d: AppleStock) => `$${getYAxisData(d)}`;

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
			<div className="max-h-[500px] max-w-[800px] h-[500px] overflow-x-hidden">
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
		</div>
	);
};
