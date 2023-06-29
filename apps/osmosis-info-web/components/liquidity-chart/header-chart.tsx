import React from "react";
import { LiquidityChart } from "../../stores/api/charts/charts";
interface HeaderChartProps {
	data: LiquidityChart | null;
}

export const HeaderChart: React.FC<HeaderChartProps> = ({ data }) => {
	return (
		<div>
			{data ? (
				<div>
					<h2>Apple Stock Price on {data.value}</h2>
				</div>
			) : (
				<p>No data to display.</p>
			)}
		</div>
	);
};
