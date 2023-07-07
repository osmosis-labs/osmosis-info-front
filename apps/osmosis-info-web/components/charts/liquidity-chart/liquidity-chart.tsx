import React, { useCallback, useEffect, useRef, useState } from "react";
import { LineTime, Paper } from "@latouche/osmosis-info-ui";
import { HeaderChart } from "./header-chart";
import { bisector } from "d3-array";
import { timeFormat } from "d3-time-format";
import { useStore } from "../../../stores";
import { LiquidityChart as DataLiquidity } from "../../../stores/api/charts/charts";
import { observer } from "mobx-react-lite";
import { formaterNumber } from "../../../helpers/format";
import { theme } from "../../../tailwind.config.cjs";
import {
	LineTimeAxisOptions,
	LineTimeTooltip,
	LineTimeTooltipFixed,
} from "@latouche/osmosis-info-ui/lib/esm/components/charts/line/line-time-config";
import dayjs from "dayjs";
import { useLanguage } from "../../../hooks/use-language";

const getXAxisData = (d: DataLiquidity) => d.time;

const bisectIndexDate = bisector<DataLiquidity, Date>((d: DataLiquidity) => new Date(d.time)).left;

const tickFormatY = (d: number) => `${formaterNumber(Math.round(d))}`;

export type Periode = "day" | "week" | "month";
export type TypeValue = "usd" | "osmo" | "atom";

export const LiquidityChart = observer(() => {
	const {
		liquidityStore: { liquidityDay, liquidityWeek, liquidityMonth },
	} = useStore();
	const [currentData, setCurrentData] = useState<DataLiquidity | null>(null);
	const refPeriode = useRef<null | Periode>(null);
	const [periode, setPeriode] = useState<Periode>("day");
	const [typeValue, setTypeValue] = useState<TypeValue>("usd");
	const [defaultView, setDefaultView] = useState<[number, number]>([0, 0]);
	const [dataDisplay, setDataDisplay] = useState<DataLiquidity[]>(liquidityDay);
	const locale = useLanguage();

	const formatX = useCallback((d: DataLiquidity) => dayjs(d.time).locale(locale).format("MMM DD YY"), [locale]);
	const tickFormatX = useCallback((d: Date) => dayjs(d).locale(locale).format("MMM DD YY"), [locale]);
	useEffect(() => {
		let dataDisplay = liquidityDay;
		if (periode === "week") {
			dataDisplay = liquidityWeek;
		} else if (periode === "month") {
			dataDisplay = liquidityMonth;
		}
		setDataDisplay(dataDisplay);
		setCurrentData(dataDisplay[dataDisplay.length - 1]);
	}, [liquidityDay, liquidityMonth, liquidityWeek, periode]);

	useEffect(() => {
		let periodeToRemove = 300;
		let dataDisplay = liquidityDay;
		if (periode === "week") {
			periodeToRemove = 50;
			dataDisplay = liquidityWeek;
		} else if (periode === "month") {
			dataDisplay = liquidityMonth;
			periodeToRemove = 12;
		}
		if (refPeriode.current !== periode) {
			setDefaultView([dataDisplay.length - periodeToRemove, dataDisplay.length]);
			refPeriode.current = periode;
		}
	}, [liquidityDay, liquidityMonth, liquidityWeek, periode]);

	const getYAxisData = useCallback<(d: DataLiquidity) => number>(
		(d: DataLiquidity) => {
			if (typeValue === "osmo") return d.valueOsmo;
			if (typeValue === "atom") return d.valueAtom;
			return d.value;
		},
		[typeValue]
	);

	const formatY = useCallback<(d: DataLiquidity) => string>(
		(d: DataLiquidity) => {
			if (typeValue === "osmo") return `$${formaterNumber(Math.round(d.valueOsmo))}`;
			if (typeValue === "atom") return `$${formaterNumber(Math.round(d.valueAtom))}`;
			return `$${formaterNumber(Math.round(d.value))}`;
		},
		[typeValue]
	);

	const onHover = useCallback((d: DataLiquidity) => {
		setCurrentData(d);
	}, []);

	const onChangePeriode = useCallback(
		(periode: Periode) => {
			setPeriode(periode);
			if (periode === "day") {
				setDataDisplay(liquidityDay);
				setCurrentData(liquidityDay[liquidityDay.length - 1]);
			} else if (periode === "week") {
				setDataDisplay(liquidityWeek);
				setCurrentData(liquidityWeek[liquidityWeek.length - 1]);
			} else if (periode === "month") {
				setDataDisplay(liquidityMonth);
				setCurrentData(liquidityMonth[liquidityMonth.length - 1]);
			}
		},
		[liquidityDay, liquidityMonth, liquidityWeek]
	);

	const onChangeTypeValue = useCallback((typeValue: TypeValue) => {
		setTypeValue(typeValue);
	}, []);

	return (
		<Paper className="w-full !pt-4 px-5">
			<HeaderChart
				data={currentData}
				onChangePeriode={onChangePeriode}
				onChangeTypeValue={onChangeTypeValue}
				periode={periode}
				typeValue={typeValue}
			/>
			<div className="flex w-full">
				<div className="max-h-[500px] max-w-[100%] w-full h-[500px] overflow-hidden">
					<LineTime<DataLiquidity>
						maxHeight={500}
						lineTimeTooltipCursor={lineTimeTooltipCursor}
						data={dataDisplay}
						onHover={onHover}
						onClick={onHover}
						getXAxisData={getXAxisData}
						getYAxisData={getYAxisData}
						bisectDate={bisectIndexDate}
						formatX={formatX}
						formatY={formatY}
						tickFormatY={tickFormatY}
						tickFormatX={tickFormatX}
						defaultView={defaultView}
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
		</Paper>
	);
});

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
