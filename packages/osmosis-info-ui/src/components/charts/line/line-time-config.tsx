import { AxisScale, TickLabelProps } from "@visx/axis";
import { ScaleInput, scaleLinear, scaleTime } from "@visx/scale";
import { max, extent } from "d3-array";

export const defaultLineTimeTooltipStyle: React.CSSProperties = {
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

export const defaultLineTimeTooltipFixStyle: React.CSSProperties = {
	textAlign: "center",
	fontSize: 12,
	background: "#f6e1b8",
	padding: "2px 4px 0px 4px",
	color: "#140F34",
	position: "absolute",
	translate: "-5px -100%",
};

export const defaultLineTimeTooltipStyleFixDash: React.CSSProperties = {
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
export type LineTimeTooltipFixed = {
	/** display: (required) A boolean value that determines whether the fixed tooltip should be displayed or not. */
	display?: boolean;
	/** style: (optional) An object that specifies the CSS styles to be applied to the fixed tooltip. */
	style?: React.CSSProperties;
	/** styleDash: (optional) An object that specifies the CSS styles to be applied to the dashed line that connects the fixed tooltip to the x-axis of the chart. */
	styleDash?: React.CSSProperties;
};

export const defaultLineTimeTooltipFixed: LineTimeTooltipFixed = {
	display: true,
	style: defaultLineTimeTooltipFixStyle,
	styleDash: defaultLineTimeTooltipStyleFixDash,
};

/**
 * An object that specifies the content and style of the tooltip that is displayed when the mouse hovers over a data point with the cursor tooltip or bottom tooltip enabled.
 */
export type LineTimeTooltip = {
	/** Whether to display the tooltip. */
	display?: boolean;
	/** The style of the tooltip. */
	style?: React.CSSProperties;
};

export const defaultLineTimeTooltipBottom: LineTimeTooltip = {
	display: true,
	style: { ...defaultLineTimeTooltipStyle, translate: "-50%" },
};
export const defaultLineTimeTooltipCursor: LineTimeTooltip = {
	display: true,
	style: defaultLineTimeTooltipStyle,
};

/**
 * The options for the gradient that is used to fill the area under the chart line.
 */
export type LineTimeGradientOptions = {
	/**
	 * The color to start the gradient from.
	 */
	from: string;
	/**
	 * The color to end the gradient at.
	 */
	to: string;
	/**
	 * The opacity of the gradient.
	 */
	opacity: number;
	/**
	 * Whether to display the gradient or not.
	 */
	display: boolean;
};

export const defaultLineTimeGradientOptions: LineTimeGradientOptions = {
	from: "#f6e1b8",
	to: "#140F34",
	opacity: 1,
	display: true,
};

/**
 * The AnimationOptions type specifies the options for the animation that is used to transition the chart between states.
 */
export type AnimationOptions = {
	/** The duration (in milliseconds) of the animation that removes the dashed line from the chart. Defaults to 300ms. */
	timeRemoveDashed: number;
	/** The CSS class applied to the waiting line element during the animation. */
	waitingLineClass: string;
	/** The CSS class applied to the animated line element during the animation. */
	animationLineClass: string;
	/** The CSS class applied to the animated area element during the animation. */
	animationAreaClass: string;
	/** The CSS class applied to the animated bottom axis element during the animation. */
	animationBottomAxisClass: string;
	/** The CSS class applied to the animated right axis element during the animation. */
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

/**
 * Options for the chart line.
 */
export type LineTimeOptions = {
	/**
	 * The fill color of the chart line.
	 */
	fill: string;
	/**
	 * The stroke color of the chart line.
	 */
	stroke: string;
	/**
	 * The width of the chart line.
	 */
	strokeWidth: number;
};

export const defaultOptionsLine: LineTimeOptions = {
	fill: "none",
	strokeWidth: 2,
	stroke: "#f6e1b8",
};

/**
 * The margins around the chart.
 */
export type Margin = {
	/** The top margin in pixels. */
	top: number;
	/** The right margin in pixels. */
	right: number;
	/** The bottom margin in pixels. */
	bottom: number;
	/** The left margin in pixels. */
	left: number;
};

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
	getXAxisData: (d: D) => Date;
}

export function getXScale<D>({ innerWidth, margin, data, getXAxisData }: GetXScaleArgs<D>) {
	return scaleTime({
		range: [margin.left, innerWidth + margin.left],
		domain: extent(data, getXAxisData) as [unknown, unknown] as [Date, Date],
	});
}

export const defaultLineTimeMargin = { top: 30, right: 70, bottom: 60, left: 4 };

/**
 * Specifies the options for the x or y axis of the LineTime chart.
 */
export type LineTimeAxisOptions = {
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

export const defaulLineTimeRightAxisOptions: LineTimeAxisOptions = {
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

export const defaulLineTimeBottomAxisOptions: LineTimeAxisOptions = {
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
 * The options for the line cursor that is displayed when the mouse hovers over the chart.
 */
export type LineTimeLineCursorOptions = {
	/** Whether or not to display the line cursor. Defaults to true. */
	display?: boolean;
	/** The stroke color of the line cursor. Defaults to '#666'. */
	stroke?: string;
	/** The stroke width of the line cursor. Defaults to 1. */
	strokeWidth?: number;
	/** The stroke dash pattern of the line cursor. Defaults to '3 3'. */
	strokeDasharray?: string;
};

export const defaultLineTimeLineCursorOptions: LineTimeLineCursorOptions = {
	display: true,
	stroke: "#f6e1b8",
	strokeWidth: 2,
	strokeDasharray: "5,2",
};

/**
 * The options for the circle cursor that is displayed when the mouse hovers over the chart.
 */
export type LineTimeCircleCursorOptions = {
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

export const defaultLineTimeCircleCursorOptions: LineTimeCircleCursorOptions = {
	fill: "#f6e1b8",
	stroke: "#f6e1b8",
	strokeWidth: 2,
	strokeDasharray: "5,2",
	r: 4,
};
