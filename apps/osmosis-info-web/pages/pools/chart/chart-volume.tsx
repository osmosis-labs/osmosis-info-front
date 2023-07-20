import React from "react";
import { PeriodeChart } from "./charts";

type ChartVolumeProps = {
	periode: PeriodeChart;
};

export const ChartVolume = ({ periode }: ChartVolumeProps) => {
	console.log("chart-volume.tsx (9) ->periode", periode);
	return <div>Volume</div>;
};
