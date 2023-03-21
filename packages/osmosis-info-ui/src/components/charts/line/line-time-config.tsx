import { AxisScale, TickLabelProps } from "@visx/axis";
import { ScaleInput, scaleLinear, scaleTime } from "@visx/scale";
import { max, extent } from "d3-array";

export const defaultTooltipsStyle: React.CSSProperties = {
	background: "#140F34",
	border: "1px solid #f6e1b8",
	color: "#f6e1b8",
	borderRadius: "3px",
	boxShadow: "0 0 10px rgba(33,33,33,0.2)",
	padding: "4px 6px",
	fontSize: "14px",
	lineHeight: "1em",
	pointerEvents: "none",
	position: "absolute",
};

export const defaultTimeTooltipStyle: React.CSSProperties = {
	textAlign: "center",
	fontSize: 12,
	background: "#f6e1b8",
	padding: "2px 4px 0px 4px",
	color: "#140F34",
	position: "absolute",
	translate: "0 -100%",
};

export const defaultClassTooltipFixDash =
	"content-[''] block h-[2px] w-[6px] bg-[#f6e1b8] absolute top-[50%] left-[-3px] translate-x-[-100%] translate-y-[-50%]";

export type GradientOptions = {
	from: string;
	to: string;
	opacity: number;
};

export const defaultOptionsGradient: GradientOptions = {
	from: "#f6e1b8",
	to: "#140F34",
	opacity: 1,
};

export type AnimationOptions = {
	timeRemoveDashed: number;
	waitingLineClass: string;
	animationLineClass: string;
	animationAreaClass: string;
	animationBottomAxisClass: string;
	animationRightAxisClass: string;
};

export const defaultOptionsAnimation: AnimationOptions = {
	timeRemoveDashed: 1000,
	waitingLineClass: "wait-animation-line",
	animationLineClass: "animation-line",
	animationAreaClass: "animation-area",
	animationBottomAxisClass: "animation-area",
	animationRightAxisClass: "animation-area",
};

export type LineOptions = {
	fill: string;
	stroke: string;
	strokeWidth: number;
};

export const defaultOptionsLine: LineOptions = {
	fill: "none",
	strokeWidth: 2,
	stroke: "#f6e1b8",
};

export type Margin = { top: number; right: number; bottom: number; left: number };

export interface GetYScaleArgs<D> {
	innerHeight: number;
	margin: Margin;
	data: D[];
	getYAxisData: (d: D) => number;
}

export function getYScale<D>({ innerHeight, margin, data, getYAxisData }: GetYScaleArgs<D>) {
	return scaleLinear({
		range: [innerHeight + margin.top, margin.top],
		domain: [0, max(data, getYAxisData) || 0 + innerHeight / 3],
		nice: true,
	});
}

export interface GetXScaleArgs<D> {
	innerWidth: number;
	margin: Margin;
	data: D[];
	getXAxisData: (d: D) => Date;
}

export function getXScale<D>({ innerWidth, margin, data, getXAxisData }: GetXScaleArgs<D>) {
	return scaleTime({
		range: [margin.left, innerWidth + margin.left],
		domain: extent(data, getXAxisData) as [unknown, unknown] as [Date, Date],
	});
}

export const defaultLineTimeMargin = { top: 30, right: 40, bottom: 40, left: 4 };

export type LineTimeAxisOptions = {
	stroke?: string;
	tickStroke?: string;
	className?: string;
	label: TickLabelProps<ScaleInput<AxisScale>>;
};

export const defaulLineTimeRightAxisOptions: LineTimeAxisOptions = {
	stroke: "#f6e1b8",
	tickStroke: "#f6e1b8",
	className: "",
	label: () => {
		return {
			fill: "#f6e1b8",
			fontSize: 12,
			verticalAnchor: "middle",
		};
	},
};

export const defaulLineTimeBottomAxisOptions: LineTimeAxisOptions = {
	stroke: "#f6e1b8",
	tickStroke: "#f6e1b8",
	className: "",
	label: () => {
		return {
			fill: "#f6e1b8",
			fontSize: 12,
			verticalAnchor: "middle",
		};
	},
};

export type LineTimeLineCursorOptions = {
	display?: boolean;
	stroke?: string;
	strokeWidth?: number;
	strokeDasharray?: string;
};

export const defaultLineTimeLineCursorOptions: LineTimeLineCursorOptions = {
	display: true,
	stroke: "#f6e1b8",
	strokeWidth: 2,
	strokeDasharray: "5,2",
};

export type LineTimeCircleCursorOptions = {
	stroke?: string;
	strokeWidth?: number;
	strokeDasharray?: string;
	r?: number;
};

export const defaultLineTimeCircleCursorOptions: LineTimeCircleCursorOptions = {
	stroke: "#f6e1b8",
	strokeWidth: 2,
	strokeDasharray: "5,2",
	r: 4,
};
