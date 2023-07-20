import React from "react";
import { PeriodeChart } from "./charts";

type ChartPriceProps = {
	periode: PeriodeChart;
};

export const ChartPrice = ({ periode }: ChartPriceProps) => {
	console.log("chart-price.tsx (9) ->periode", periode);
	return <div>Price</div>;
};
