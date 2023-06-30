import React from "react";
import { LiquidityChart } from "../../../stores/api/charts/charts";
import { Periode } from "./volume-chart";
import { ButtonMultiple, ItemButtonMultiple } from "@latouche/osmosis-info-ui";
import { useState } from "react";
import { useEffect } from "react";
import { formateNumberDecimals } from "../../../helpers/format";
interface HeaderChartProps {
	data: LiquidityChart | null;
	onChangePeriode: (periode: Periode) => void;
	periode: Periode;
}

const itemsPeriode = [
	{ value: "day", label: "D" },
	{ value: "week", label: "W" },
	{ value: "month", label: "M" },
];

export const HeaderChart: React.FC<HeaderChartProps> = ({ data, onChangePeriode, periode }) => {
	const [currentPeriode, setCurrentPeriode] = useState<ItemButtonMultiple<string>>(itemsPeriode[0]);

	useEffect(() => {
		const itemPeriode = itemsPeriode.find((item) => item.value === periode);
		if (itemPeriode) {
			setCurrentPeriode(itemPeriode);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onClickPeriode = (value: ItemButtonMultiple<string>) => {
		setCurrentPeriode(value);
		onChangePeriode(value.value as Periode);
	};

	const toDay = new Date();
	const isToDay =
		data?.time.getDate() === toDay.getDate() &&
		data?.time.getMonth() === toDay.getMonth() &&
		data?.time.getFullYear() === toDay.getFullYear();

	return (
		<div className="flex justify-between items-center">
			<div>
				<p>Volume</p>
				<p className="text-2xl font-bold my-1">{`$${formateNumberDecimals(data?.value ?? 0, 0)}`}</p>
				<p>{isToDay ? "Last 24h" : data?.time.toDateString()}</p>
			</div>
			<div className="flex flex-col items-end">
				<div className="w-fit mt-2">
					<ButtonMultiple onClick={onClickPeriode} selected={currentPeriode} items={itemsPeriode} />
				</div>
			</div>
		</div>
	);
};
