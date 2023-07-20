import React, { useEffect, useMemo, useState } from "react";
import { PeriodeChart, TypeChart } from "./charts";
import { ButtonMultiple, ItemButtonMultiple } from "@latouche/osmosis-info-ui";
import { useTranslation } from "react-multi-lang";

type ChartHeaderProps = {
	currentDate: string;
	currentValue: string;
	onChangeType: (type: TypeChart) => void;
	onChangePeriode: (type: PeriodeChart) => void;
	typeChart: TypeChart;
	periodeChart: PeriodeChart;
};

export const ChartHeader = ({
	currentDate,
	currentValue,
	onChangeType,
	typeChart,
	onChangePeriode,
	periodeChart,
}: ChartHeaderProps) => {
	const t = useTranslation();

	const itemsType = useMemo<ItemButtonMultiple<TypeChart>[]>(
		() => [
			{ value: "price", label: t("Price") },
			{ value: "volume", label: t("Volume") },
			{ value: "liquidity", label: t("Liquidity") },
		],
		[t]
	);

	const [currentType, setCurrentType] = useState<ItemButtonMultiple<TypeChart>>(itemsType[0]);

	useEffect(() => {
		const itemType = itemsType.find((item) => item.value === typeChart);
		if (itemType) {
			setCurrentType(itemType);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onClickType = (value: ItemButtonMultiple<TypeChart>) => {
		setCurrentType(value);
		onChangeType(value.value);
	};

	return (
		<div className="flex justify-between items-center mt-2 mx-2">
			<div className="flex flex-col">
				<span className="text-2xl">{currentValue}</span>
				<span className="text-sm text-osmosverse-400">{currentDate}</span>
			</div>
			<div className="flex flex-col justify-end">
				<ButtonMultiple onClick={onClickType} selected={currentType} items={itemsType} className="text-xs mb-1" />
				{typeChart === "price" ? (
					<ButtonPeriodePrice onChangePeriode={onChangePeriode} periode={periodeChart} />
				) : (
					<ButtonPeriodeLiqudityVolume onChangePeriode={onChangePeriode} periode={periodeChart} />
				)}
			</div>
		</div>
	);
};

const ButtonPeriodeLiqudityVolume = ({
	periode,
	onChangePeriode,
}: {
	periode: PeriodeChart;
	onChangePeriode: (periode: PeriodeChart) => void;
}) => {
	const t = useTranslation();

	const itemsPeriode = useMemo<ItemButtonMultiple<PeriodeChart>[]>(
		() => [
			{ value: "day", label: t("Day") },
			{ value: "week", label: t("Week") },
			{ value: "month", label: t("Month") },
		],
		[t]
	);

	const [currentType, setCurrentType] = useState<ItemButtonMultiple<PeriodeChart>>(itemsPeriode[0]);

	const onClickType = (value: ItemButtonMultiple<PeriodeChart>) => {
		setCurrentType(value);
		onChangePeriode(value.value);
	};

	useEffect(() => {
		const itemType = itemsPeriode.find((item) => item.value === periode);
		if (itemType) {
			setCurrentType(itemType);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <ButtonMultiple onClick={onClickType} selected={currentType} items={itemsPeriode} className="text-xs" />;
};

const ButtonPeriodePrice = ({
	periode,
	onChangePeriode,
}: {
	periode: PeriodeChart;
	onChangePeriode: (periode: PeriodeChart) => void;
}) => {
	const t = useTranslation();

	const itemsPeriode = useMemo<ItemButtonMultiple<PeriodeChart>[]>(
		() => [
			{ value: "7d", label: t("Day") },
			{ value: "1mo", label: t("Month") },
			{ value: "1y", label: t("Year") },
			{ value: "all", label: t("All") },
		],
		[t]
	);

	const [currentType, setCurrentType] = useState<ItemButtonMultiple<PeriodeChart>>(itemsPeriode[0]);

	const onClickType = (value: ItemButtonMultiple<PeriodeChart>) => {
		setCurrentType(value);
		onChangePeriode(value.value);
	};

	useEffect(() => {
		const itemType = itemsPeriode.find((item) => item.value === periode);
		if (itemType) {
			setCurrentType(itemType);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <ButtonMultiple onClick={onClickType} selected={currentType} items={itemsPeriode} className="text-xs" />;
};
