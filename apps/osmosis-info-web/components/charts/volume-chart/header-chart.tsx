import React, { useMemo } from "react";
import { VolumeChart } from "../../../stores/api/charts/charts";
import { Periode } from "./volume-chart";
import { ButtonMultiple, ItemButtonMultiple } from "@latouche/osmosis-info-ui";
import { useState } from "react";
import { useEffect } from "react";
import { formateNumberDecimals } from "../../../helpers/format";
import { useTranslation } from "react-multi-lang";
import dayjs from "dayjs";
import { useLanguage } from "../../../hooks/use-language";
interface HeaderChartProps {
	data: VolumeChart | null;
	onChangePeriode: (periode: Periode) => void;
	periode: Periode;
}

export const HeaderChart: React.FC<HeaderChartProps> = ({ data, onChangePeriode, periode }) => {
	const t = useTranslation();
	const locale = useLanguage();

	const [dataDate, setDataDate] = useState<string>("");

	useEffect(() => {
		setDataDate(dayjs(data?.time).locale(locale).format("LL"));
	}, [data, locale]);

	const itemsPeriode = useMemo(
		() => [
			{ value: "day", label: t("overview.charts.periodes.day") },
			{ value: "week", label: t("overview.charts.periodes.week") },
			{ value: "month", label: t("overview.charts.periodes.month") },
		],
		[t]
	);

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
				<p>{t("overview.charts.volume.name")}</p>
				<p className="text-2xl font-bold my-1">{`$${formateNumberDecimals(data?.value ?? 0, 0)}`}</p>
				<p>{isToDay ? t("overview.charts.volume.today") : dataDate}</p>
			</div>
			<div className="flex flex-col items-end">
				<div className="w-fit mt-2">
					<ButtonMultiple onClick={onClickPeriode} selected={currentPeriode} items={itemsPeriode} />
				</div>
			</div>
		</div>
	);
};
