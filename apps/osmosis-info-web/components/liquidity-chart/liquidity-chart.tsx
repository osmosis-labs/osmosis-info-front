import React from "react";
import { Line } from "@latouche/osmosis-info-ui";
// import { appleStock } from "@visx/mock-data/";

export interface DataLiquidity {
	price: number;
	time: string;
}
export const LiquidityChart = () => {
	// const data: DataLiquidity[] = appleStock.slice(800).map((stock) => ({ price: stock.close, time: stock.date }));

	return (
		<div>
			<div className="max-h-[500px] max-w-[800px] h-[500px]">
				<Line maxHeight={500} />
			</div>
		</div>
	);
};
