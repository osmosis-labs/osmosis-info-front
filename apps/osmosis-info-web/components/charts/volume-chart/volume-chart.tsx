import React, { useCallback, useEffect, useRef, useState } from "react";
import { BarTime, Paper } from "@latouche/osmosis-info-ui";
import { HeaderChart } from "./header-chart";
import { bisector } from "d3-array";
import { timeFormat } from "d3-time-format";
import { useStore } from "../../../stores";
import { VolumeChart as DataVolume } from "../../../stores/api/charts/charts";
import { observer } from "mobx-react-lite";
import { formaterNumber } from "../../../helpers/format";
import { theme } from "../../../tailwind.config.cjs";
import {
	BarOptions,
	BarTimeAxisOptions,
	BarTimeCircleCursorOptions,
	BarTimeLineCursorOptions,
	BarTimeTooltip,
	BarTimeTooltipFixed,
} from "@latouche/osmosis-info-ui/lib/esm/components/charts/bar/bar-time-config";
import dayjs from "dayjs";
import { useLanguage } from "../../../hooks/use-language";

const getXAxisData = (d: DataVolume) => d.time;

const tickFormatY = (d: number) => `${formaterNumber(Math.round(d))}`;

const getYAxisData = (d: DataVolume) => d?.value;

const formatY = (d: DataVolume) => `$${formaterNumber(Math.round(d.value))}`;

export type Periode = "day" | "week" | "month";

export const VolumeChart = observer(() => {
	const {
		volumeStore: { volumeDay, volumeWeek, volumeMonth },
	} = useStore();
	const [currentData, setCurrentData] = useState<DataVolume | null>(null);
	const [periode, setPeriode] = useState<Periode>("day");
	const refPeriode = useRef<null | Periode>(null);
	const [defaultView, setDefaultView] = useState<[number, number]>([0, 0]);
	const [dataDisplay, setDataDisplay] = useState<DataVolume[]>(volumeDay);

	const locale = useLanguage();

	const formatX = useCallback((d: DataVolume) => dayjs(d.time).locale(locale).format("MMM DD YY"), [locale]);

	useEffect(() => {
		let dataDisplay = volumeDay;
		if (periode === "week") {
			dataDisplay = volumeWeek;
		} else if (periode === "month") {
			dataDisplay = volumeMonth;
		}
		setDataDisplay(dataDisplay);
		setCurrentData(dataDisplay[dataDisplay.length - 1]);
	}, [volumeDay, volumeMonth, volumeWeek, periode]);

	useEffect(() => {
		let periodeToRemove = 300;
		let dataDisplay = volumeDay;
		if (periode === "week") {
			periodeToRemove = 50;
			dataDisplay = volumeWeek;
		} else if (periode === "month") {
			dataDisplay = volumeMonth;
			periodeToRemove = 12;
		}
		if (refPeriode.current !== periode) {
			setDefaultView([dataDisplay.length - periodeToRemove, dataDisplay.length]);
			refPeriode.current = periode;
		}
	}, [volumeDay, volumeMonth, volumeWeek, periode]);

	const onHover = useCallback((d: DataVolume) => {
		setCurrentData(d);
	}, []);

	const onChangePeriode = useCallback(
		(periode: Periode) => {
			setPeriode(periode);
			if (periode === "day") {
				setDataDisplay(volumeDay);
				setCurrentData(volumeDay[volumeDay.length - 1]);
			} else if (periode === "week") {
				setDataDisplay(volumeWeek);
				setCurrentData(volumeWeek[volumeWeek.length - 1]);
			} else if (periode === "month") {
				setDataDisplay(volumeMonth);
				setCurrentData(volumeMonth[volumeMonth.length - 1]);
			}
		},
		[volumeDay, volumeMonth, volumeWeek]
	);

	return (
		<Paper className="w-full !pt-4 px-5 ">
			<HeaderChart data={currentData} onChangePeriode={onChangePeriode} periode={periode} />
			<div className="flex w-full">
				<div className="max-h-[500px] max-w-[100%] w-full h-[500px] overflow-hidden">
					<BarTime<DataVolume>
						maxHeight={500}
						data={dataDisplay}
						onHover={onHover}
						onClick={onHover}
						getXAxisData={formatX}
						getYAxisData={getYAxisData}
						formatX={formatX}
						formatY={formatY}
						tickFormatY={tickFormatY}
						defaultView={defaultView}
						barOptions={barOptions}
						barTimeTooltipFixed={barTimeTooltipFixed}
						barTimeTooltipCursor={barTimeTooltipCursor}
						barTimeTooltipBottom={barTimeTooltipBottom}
						barTimeRightAxisOptions={barTimeRightAxisOptions}
						barTimeBottomAxisOptions={barTimeBottomAxisOptions}
						barTimeLineCursorOptions={barTimeLineCursorOptions}
						barTimeCircleCursorOptions={barTimeCircleCursorOptions}
					/>
				</div>
			</div>
		</Paper>
	);
});

const barOptions: BarOptions = {
	fillColor: theme.colors.wosmongton["400"],
	strokeColor: theme.colors.wosmongton["200"],
};

const barTimeTooltipFixed: BarTimeTooltipFixed = {
	display: true,
	style: {
		textAlign: "center",
		fontSize: 12,
		background: theme.colors.wosmongton["500"],
		border: `1px solid ${theme.colors.wosmongton["400"]}`,
		borderRadius: "3px",
		padding: "2px 4px 0px 4px",
		color: theme.colors.wosmongton["200"],
		position: "absolute",
		translate: "-5px -100%",
	},
	styleDash: {
		content: "' '",
		position: "absolute",
		display: "block",
		top: "50%",
		left: "-3px",
		background: theme.colors.wosmongton["200"],
		width: "6px",
		height: "2px",
		transform: "translate(-100%, -50%)",
	},
};
const barTimeTooltipCursor: BarTimeTooltip = {
	display: true,
	style: {
		background: theme.colors.wosmongton["500"],
		border: `1px solid ${theme.colors.wosmongton["400"]}`,
		color: theme.colors.wosmongton["200"],
		borderRadius: "3px",
		padding: "5px 10px",
		fontSize: "12px",
		boxShadow: "0 0 10px rgba(33,33,33,0.2)",
		pointerEvents: "none",
		position: "absolute",
		transform: "translate(calc(-50% - 10px), -175%)",
	},
};
const barTimeTooltipBottom: BarTimeTooltip = {
	display: true,
	style: {
		background: theme.colors.wosmongton["500"],
		border: `1px solid ${theme.colors.wosmongton["400"]}`,
		color: theme.colors.wosmongton["200"],
		borderRadius: "3px",
		padding: "5px 10px",
		fontSize: "12px",
		boxShadow: "0 0 10px rgba(33,33,33,0.2)",
		pointerEvents: "none",
		position: "absolute",
		transform: "translate(calc(-50% - 10px))",
	},
};
const barTimeRightAxisOptions: BarTimeAxisOptions = {
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
const barTimeBottomAxisOptions: BarTimeAxisOptions = {
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
			textAnchor: "middle",
		};
	},
};
const barTimeLineCursorOptions: BarTimeLineCursorOptions = {
	display: true,
	stroke: theme.colors.wosmongton["200"],
	strokeWidth: 2,
	strokeDasharray: "5,2",
};
const barTimeCircleCursorOptions: BarTimeCircleCursorOptions = {
	fill: theme.colors.wosmongton["200"],
	stroke: theme.colors.wosmongton["200"],
	strokeWidth: 2,
	strokeDasharray: "5,2",
	r: 4,
};
