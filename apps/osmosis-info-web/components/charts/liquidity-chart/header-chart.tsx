import React from "react";
import { LiquidityChart } from "../../../stores/api/charts/charts";
import { Periode, TypeValue } from "./liquidity-chart";
import { ButtonMultiple, ItemButtonMultiple } from "@latouche/osmosis-info-ui";
import { useState } from "react";
import { useEffect } from "react";
import { formateNumberDecimals, formateNumberPriceDecimals } from "../../../helpers/format";
interface HeaderChartProps {
	data: LiquidityChart | null;
	onChangePeriode: (periode: Periode) => void;
	onChangeTypeValue: (typeValue: TypeValue) => void;
	periode: Periode;
	typeValue: TypeValue;
}

const itemsPeriode = [
	{ value: "day", label: "D" },
	{ value: "week", label: "W" },
	{ value: "month", label: "M" },
];

const itemsType = [
	{ value: "usd", label: "USD" },
	{ value: "atom", label: "ATOM" },
	{ value: "osmo", label: "OSMO" },
];

export const HeaderChart: React.FC<HeaderChartProps> = ({
	data,
	onChangePeriode,
	onChangeTypeValue,
	periode,
	typeValue,
}) => {
	const [currentPeriode, setCurrentPeriode] = useState<ItemButtonMultiple<string>>(itemsPeriode[0]);
	const [currentType, setCurrentType] = useState<ItemButtonMultiple<string>>(itemsType[0]);

	useEffect(() => {
		const itemPeriode = itemsPeriode.find((item) => item.value === periode);
		if (itemPeriode) {
			setCurrentPeriode(itemPeriode);
		}

		const itemType = itemsType.find((item) => item.value === typeValue);
		if (itemType) {
			setCurrentType(itemType);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onClickPeriode = (value: ItemButtonMultiple<string>) => {
		setCurrentPeriode(value);
		onChangePeriode(value.value as Periode);
	};

	const onClickType = (value: ItemButtonMultiple<string>) => {
		setCurrentType(value);
		onChangeTypeValue(value.value as TypeValue);
	};

	const toDay = new Date();
	const isToDay =
		data?.time.getDate() === toDay.getDate() &&
		data?.time.getMonth() === toDay.getMonth() &&
		data?.time.getFullYear() === toDay.getFullYear();

	return (
		<div className="flex justify-between items-center">
			<div>
				<p>Liquidity</p>
				<p className="text-2xl font-bold my-1">
					{typeValue === "usd"
						? `$${formateNumberDecimals(data?.value ?? 0, 0)}`
						: `${formateNumberDecimals(data?.value ?? 0, 0)} ${currentType.label}`}
				</p>
				<p>{isToDay ? "Now" : data?.time.toDateString()}</p>
			</div>
			<div className="flex flex-col items-end">
				<div className="w-fit">
					<ButtonMultiple onClick={onClickType} selected={currentType} items={itemsType} />
				</div>
				<div className="w-fit mt-2">
					<ButtonMultiple onClick={onClickPeriode} selected={currentPeriode} items={itemsPeriode} />
				</div>
			</div>
		</div>
	);
};
