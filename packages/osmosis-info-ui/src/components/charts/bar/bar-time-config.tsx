import { scaleBand, scaleLinear, ScaleInput } from "@visx/scale";
import { max } from "d3-array";
import { Margin } from "../line/line-time-config";
import { AxisScale, TickLabelProps } from "@visx/axis";

export const defaultBarTimeMargin = {
	top: 30,
	right: 70,
	bottom: 60,
	left: 30,
};

export const defaultBarTimeTooltipStyle: React.CSSProperties = {
	background: "#140F34",
	border: "1px solid #f6e1b8",
	color: "#f6e1b8",
	borderRadius: "3px",
	padding: "5px 10px",
	fontSize: "12px",
	boxShadow: "0 0 10px rgba(33,33,33,0.2)",
	pointerEvents: "none",
	position: "absolute",
};

export const defaultBarTimeTooltipFixStyle: React.CSSProperties = {
	textAlign: "center",
	fontSize: 12,
	background: "#f6e1b8",
	padding: "2px 4px 0px 4px",
	color: "#140F34",
	position: "absolute",
	translate: "-5px -100%",
};

export const defaultBarTimeTooltipStyleFixDash: React.CSSProperties = {
	content: "' '",
	position: "absolute",
	display: "block",
	top: "50%",
	left: "-3px",
	background: "#f6e1b8",
	width: "6px",
	height: "2px",
	transform: "translate(-100%, -50%)",
};

/**
 * An object that specifies the content and style of the fixed tooltip to the x-axis.
 */
export type BarTimeTooltipFixed = {
	/** display: (required) A boolean value that determines whether the fixed tooltip should be displayed or not. */
	display?: boolean;
	/** style: (optional) An object that specifies the CSS styles to be applied to the fixed tooltip. */
	style?: React.CSSProperties;
	/** styleDash: (optional) An object that specifies the CSS styles to be applied to the dashed line that connects the fixed tooltip to the x-axis of the chart. */
	styleDash?: React.CSSProperties;
};

export const defaultBarTimeTooltipFixed: BarTimeTooltipFixed = {
	display: true,
	style: defaultBarTimeTooltipFixStyle,
	styleDash: defaultBarTimeTooltipStyleFixDash,
};

/**
 * An object that specifies the content and style of the tooltip that is displayed when the mouse hovers over a data point with the cursor tooltip or bottom tooltip enabled.
 */
export type BarTimeTooltip = {
	/** Whether to display the tooltip. */
	display?: boolean;
	/** The style of the tooltip. */
	style?: React.CSSProperties;
};

export const defaultBarTimeTooltipBottom: BarTimeTooltip = {
	display: true,
	style: { ...defaultBarTimeTooltipStyle, transform: "translate(calc(-50% - 10px))" },
};
export const defaultBarTimeTooltipCursor: BarTimeTooltip = {
	display: true,
	style: { ...defaultBarTimeTooltipStyle, transform: "translate(calc(-50% - 10px), -175%)" },
};

/**
 * type for limits who determine the data to display
 */
export type Limits = { start: number; end: number };

/**
 * Interface for arguments to the getYScale function.
 */
export interface GetYScaleArgs<D> {
	/**
	 * The inner height of the chart.
	 *  */
	innerHeight: number;
	/**
	 * The margins around the chart.
	 * */
	margin: Margin;
	/**
	 * The array of data objects to be displayed in the chart.
	 * */
	data: D[];
	/**
	 * A function that takes a data object as its argument and returns the corresponding y-axis value as a number.
	 * */
	getYAxisData: (d: D) => number;
}

export function getYScale<D>({ innerHeight, margin, data, getYAxisData }: GetYScaleArgs<D>) {
	return scaleLinear({
		range: [innerHeight + margin.top, margin.top],
		domain: [0, max(data, getYAxisData) || 0 + innerHeight / 3],
		nice: true,
	});
}

/**
 * Interface for arguments to the GetXScaleArgs function.
 */
export interface GetXScaleArgs<D> {
	/**
	 * innerWidth: The inner width of the chart (the width minus the left and right margins).
	 */
	innerWidth: number;
	/**
	 * margin: The margins around the chart.
	 */
	margin: Margin;
	/**
	 * data: The array of data objects to be displayed in the chart.
	 */
	data: D[];
	/**
	 * getXAxisData: A function that takes a data object as its argument and returns the corresponding x-axis value as a Date object.
	 */
	getXAxisData: (d: D) => string;
}

export function getXScale<D>({ innerWidth, margin, data, getXAxisData }: GetXScaleArgs<D>) {
	return scaleBand({
		padding: 0.3,
		range: [margin.left, innerWidth + margin.left],
		domain: data.map(getXAxisData),
	});
}

/**
 * The options for the line cursor that is displayed when the mouse hovers over the chart.
 */
export type BarTimeLineCursorOptions = {
	/** Whether or not to display the line cursor. Defaults to true. */
	display?: boolean;
	/** The stroke color of the line cursor. Defaults to '#666'. */
	stroke?: string;
	/** The stroke width of the line cursor. Defaults to 1. */
	strokeWidth?: number;
	/** The stroke dash pattern of the line cursor. Defaults to '3 3'. */
	strokeDasharray?: string;
};

export const defaultBarTimeLineCursorOptions: BarTimeLineCursorOptions = {
	display: true,
	stroke: "#f6e1b8",
	strokeWidth: 2,
	strokeDasharray: "5,2",
};

/**
 * The options for the circle cursor that is displayed when the mouse hovers over the chart.
 */
export type BarTimeCircleCursorOptions = {
	/** The stroke color of the circle cursor. */
	stroke?: string;
	/** The stroke width of the circle cursor. */
	strokeWidth?: number;
	/** The stroke dash pattern of the circle cursor. */
	strokeDasharray?: string;
	/** The fill color of the circle cursor. */
	fill: string;
	/** The radius of the circle cursor. */
	r?: number;
};

export const defaultBarTimeCircleCursorOptions: BarTimeCircleCursorOptions = {
	fill: "#f6e1b8",
	stroke: "#f6e1b8",
	strokeWidth: 2,
	strokeDasharray: "5,2",
	r: 4,
};

/**
 * Specifies the options for the x or y axis of the BarTime chart.
 */
export type BarTimeAxisOptions = {
	/** The color of the axis line. */
	stroke?: string;
	/** The color of the tick marks on the axis. */
	tickStroke?: string;
	/** The width of the axis line. */
	strokeWitdh?: number;
	/** The class name to apply to the axis. */
	className?: string;
	/** Whether to display the axis. */
	display?: boolean;
	/** The options for the tick label. */
	label: TickLabelProps<ScaleInput<AxisScale>>;
};

export const defaulBarTimeRightAxisOptions: BarTimeAxisOptions = {
	stroke: "#f6e1b8",
	tickStroke: "#f6e1b8",
	strokeWitdh: 1,
	className: "",
	display: true,
	label: () => {
		return {
			fill: "#f6e1b8",
			fontSize: 12,
			verticalAnchor: "middle",
		};
	},
};

export const defaulBarTimeBottomAxisOptions: BarTimeAxisOptions = {
	stroke: "#f6e1b8",
	tickStroke: "#f6e1b8",
	strokeWitdh: 1,
	className: "",
	display: true,
	label: () => {
		return {
			fill: "#f6e1b8",
			fontSize: 12,
			verticalAnchor: "middle",
		};
	},
};

/**
 * The AnimationOptions type specifies the options for the animation that is used to transition the chart between states.
 */
export type AnimationOptions = {
	/** The CSS class applied to the animated bottom axis element during the animation. */
	animationBottomAxisClass: string;
	/** The CSS class applied to the animated right axis element during the animation. */
	animationRightAxisClass: string;

	/** The CSS class applied to the animated bars elements during the animation. */
	animationBarClass: string;
	/** The CSS class applied to the waiting bar element during the animation. */
	waitingBarClass: string;
	/** The delay animation for bar, for delay bar with index. */
	delayBarTimeTick: number;
};

export const defaultOptionsAnimation: AnimationOptions = {
	animationBottomAxisClass: "animation-area",
	animationRightAxisClass: "animation-area",
	animationBarClass: "animation-bar",
	waitingBarClass: "wait-animation-bar",
	delayBarTimeTick: 1000,
};

export type BarOptions = {
	fillColor: string;
	strokeColor: string;
};

export const defaultBarOptions: BarOptions = {
	fillColor: "none",
	strokeColor: "#f6e1b8",
};
