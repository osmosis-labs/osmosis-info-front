import React, { useCallback, useEffect, useMemo, useState } from "react";
import { PeriodeChart } from "./charts";
import { bisector } from "d3-array";
import { formateNumberDecimals, formaterNumber } from "../../../helpers/format";
import { useLanguage } from "../../../hooks/use-language";
import { PoolStore } from "../../../stores/api/pools/pool-store";
import dayjs from "dayjs";
import { LineTime } from "@latouche/osmosis-info-ui";
import { theme } from "../../../tailwind.config.cjs";
import {
	LineTimeAxisOptions,
	LineTimeTooltip,
	LineTimeTooltipFixed,
} from "@latouche/osmosis-info-ui/lib/esm/components/charts/line/line-time-config";

type ChartLiquidityProps = {
	periode: PeriodeChart;
	pool: PoolStore;
	onChangeItem: (date: string, value: string) => void;
};

type DataLiquidity = {
	time: Date;
	value: number;
};

const getXAxisData = (d: DataLiquidity) => d.time;

const bisectIndexDate = bisector<DataLiquidity, Date>((d: DataLiquidity) => new Date(d.time)).left;

const tickFormatY = (d: number) => `${formaterNumber(Math.round(d))}`;

export const ChartLiquidity = ({ periode, pool, onChangeItem }: ChartLiquidityProps) => {
	const locale = useLanguage();

	const toDay = useMemo(() => new Date(), []);

	const liquidityDay: DataLiquidity[] = useMemo(() => {
		if (pool.liquidityStore.dataDay.length === 0) return [{ time: new Date(), value: 0 }];
		return pool.liquidityStore.dataDay;
		// To do inmprove dependecy because we can change one item value and have same length
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pool.liquidityStore.dataDay.length]);

	const liquidityWeek: DataLiquidity[] = useMemo(() => {
		if (pool.liquidityStore.dataWeek.length === 0) return [{ time: new Date(), value: 0 }];
		return pool.liquidityStore.dataWeek;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pool.liquidityStore.dataDay.length]);

	const liquidityMonth: DataLiquidity[] = useMemo(() => {
		if (pool.liquidityStore.dataMonth.length === 0) return [{ time: new Date(), value: 0 }];
		return pool.liquidityStore.dataMonth;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pool.liquidityStore.dataDay.length]);
	const [dataDisplay, setDataDisplay] = useState<DataLiquidity[]>(liquidityDay);

	const formatX = useCallback(
		(d: DataLiquidity) => {
			return dayjs(d.time).locale(locale).format("MMM DD YY");
		},
		[locale]
	);
	const tickFormatX = useCallback((d: Date) => dayjs(d).locale(locale).format("MMM DD YY"), [locale]);

	const updateItem = useCallback(
		(d: DataLiquidity) => {
			// check if today
			const isToDay =
				d?.time.getDate() === toDay.getDate() &&
				d?.time.getMonth() === toDay.getMonth() &&
				d?.time.getFullYear() === toDay.getFullYear();
			onChangeItem(isToDay ? "Now" : dayjs(d.time).locale(locale).format("LL"), `$${formateNumberDecimals(d.value)}`);
		},
		[onChangeItem, locale, toDay]
	);

	useEffect(() => {
		let dataDisplay = liquidityDay;
		if (periode === "week") {
			dataDisplay = liquidityWeek;
		} else if (periode === "month") {
			dataDisplay = liquidityMonth;
		}
		setDataDisplay(dataDisplay);
		updateItem(dataDisplay[dataDisplay.length - 1]);
	}, [liquidityDay, liquidityMonth, liquidityWeek, periode, updateItem]);

	const getYAxisData = useCallback<(d: DataLiquidity) => number>((d: DataLiquidity) => {
		return d.value;
	}, []);

	const formatY = useCallback<(d: DataLiquidity) => string>((d: DataLiquidity) => {
		return `$${formaterNumber(Math.round(d.value))}`;
	}, []);

	return (
		<div className="flex w-full">
			<div className="max-h-[500px] max-w-[100%] w-full h-[500px] overflow-hidden">
				<LineTime<DataLiquidity>
					maxHeight={500}
					lineTimeTooltipCursor={lineTimeTooltipCursor}
					data={dataDisplay}
					onHover={updateItem}
					onClick={updateItem}
					getXAxisData={getXAxisData}
					getYAxisData={getYAxisData}
					bisectDate={bisectIndexDate}
					formatX={formatX}
					formatY={formatY}
					tickFormatY={tickFormatY}
					tickFormatX={tickFormatX}
					lineTimeGradientOptions={lineTimeGradientOptions}
					lineTimeOptions={lineTimeOptions}
					lineTimeTooltipBottom={lineTimeTooltipBottom}
					lineTimeTooltipFixed={lineTimeTooltipFixed}
					lineTimeLineCursorOptions={lineTimeLineCursorOptions}
					lineTimeCircleCursorOptions={lineTimeCircleCursorOptions}
					lineTimeRightAxisOptions={lineTimeRightAxisOptions}
					lineTimeBottomAxisOptions={lineTimeBottomAxisOptions}
				/>
			</div>
		</div>
	);
};
export const lineTimeRightAxisOptions: LineTimeAxisOptions = {
	stroke: theme.colors.wosmongton["200"],
	tickStroke: theme.colors.wosmongton["200"],
	strokeWitdh: 1,
	className: "",
	display: true,
	label: () => {
		return {
			fill: theme.colors.wosmongton["200"],
			fontSize: 12,
			verticalAnchor: "middle",
		};
	},
};

export const lineTimeBottomAxisOptions: LineTimeAxisOptions = {
	stroke: theme.colors.wosmongton["200"],
	tickStroke: theme.colors.wosmongton["200"],
	strokeWitdh: 1,
	className: "",
	display: true,
	label: () => {
		return {
			fill: theme.colors.wosmongton["200"],
			fontSize: 12,
			verticalAnchor: "middle",
			textAnchor: "start",
		};
	},
};

const lineTimeTooltipCursor = { display: false };
const lineTimeGradientOptions = {
	display: true,
	to: theme.colors.wosmongton["200"],
	from: theme.colors.ammelia["500"],
	opacity: 0.1,
};
const lineTimeOptions = {
	fill: "none",
	strokeWidth: 3,
	stroke: theme.colors.wosmongton["200"],
};

const lineTimeLineCursorOptions = {
	display: true,
	stroke: theme.colors.wosmongton["200"],
	strokeWidth: 2,
	strokeDasharray: "5,2",
};

const lineTimeCircleCursorOptions = {
	fill: theme.colors.wosmongton["500"],
	stroke: theme.colors.wosmongton["300"],
	strokeWidth: 2,
	r: 4,
};

const lineTimeTooltipBottom: LineTimeTooltip = {
	display: true,
	style: {
		background: theme.colors.wosmongton["500"],
		border: `1px solid ${theme.colors.wosmongton["400"]}`,
		color: theme.colors.wosmongton["200"],
		borderRadius: "3px",
		boxShadow: "0 0 10px rgba(33,33,33,0.2)",
		padding: "4px 6px",
		fontSize: "14px",
		lineHeight: "1em",
		pointerEvents: "none",
		position: "absolute",
		translate: "-50%",
	},
};

const lineTimeTooltipFixed: LineTimeTooltipFixed = {
	display: true,
	style: {
		textAlign: "center",
		fontSize: 12,
		background: theme.colors.wosmongton["500"],
		padding: "2px 4px 0px 4px",
		color: theme.colors.wosmongton["200"],
		borderRadius: "3px",
		border: `1px solid ${theme.colors.wosmongton["400"]}`,
		position: "absolute",
		translate: "-5px -100%",
	},
	styleDash: {
		content: "' '",
		position: "absolute",
		display: "block",
		top: "50%",
		left: "-3px",
		background: theme.colors.wosmongton["500"],
		width: "6px",
		height: "2px",
		transform: "translate(-100%, -50%)",
	},
};
