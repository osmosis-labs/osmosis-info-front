import { AppleStock } from "@visx/mock-data/lib/mocks/appleStock";
import React from "react";
interface HeaderChartProps {
	data: AppleStock | null;
}

export const HeaderChart: React.FC<HeaderChartProps> = ({ data }) => {
	return (
		<div>
			{/* {data ? (
				<div>
					<h2>Apple Stock Price on {data.date}</h2>
					<p>Close: {data.close}</p>
				</div>
			) : (
				<p>No data to display.</p>
			)} */}
		</div>
	);
};
