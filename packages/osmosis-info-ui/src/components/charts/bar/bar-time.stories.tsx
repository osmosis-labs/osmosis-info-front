import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { BarTime } from "./bar-time";

import { appleStock } from "@visx/mock-data/";
import { AppleStock } from "@visx/mock-data/lib/mocks/appleStock";
import { timeFormat } from "d3-time-format";

export default {
	title: "Components/Chart/BarTime",
	component: BarTime,
} as ComponentMeta<typeof BarTime>;

const getXAxisData = (d: AppleStock) => new Date(d.date);
const getYAxisData = (d: AppleStock) => d.close;

const formatX = (d: AppleStock) => timeFormat("%b %d %y")(getXAxisData(d));

const formatY = (d: AppleStock) => `$${Math.round(getYAxisData(d))}`;
const data = appleStock.slice(0, 25);

const Template: ComponentStory<any> = (args: any) => {
	return (
		<div className="max-h-[500px] max-w-[800px] h-[500px]">
			<BarTime<AppleStock>
				maxHeight={args.maxHeight}
				width={args.width}
				data={data}
				getXAxisData={formatX}
				getYAxisData={getYAxisData}
				onClick={args.onClick}
				onHover={args.onHover}
				barTimeTooltipBottom={{ display: args.barTimeTooltipBottomDisplay, style: args.barTimeTooltipBottomStyle }}
				barTimeTooltipCursor={{ display: args.barTimeTooltipCursorDisplay, style: args.barTimeTooltipCursorStyle }}
				barTimeTooltipFixed={{
					display: args.barTimeTooltipFixedDisplay,
					style: args.barTimeTooltipFixedStyle,
					styleDash: args.barTimeTooltipFixedStyleDash,
				}}
				barTimeRightAxisOptions={{
					stroke: args.barTimeRightAxisOptionsStroke,
					tickStroke: args.barTimeRightAxisOptionsTickStroke,
					className: args.barTimeRightAxisOptionsClassName,
					strokeWitdh: args.barTimeRightAxisOptionsStrokeWidth,
					display: args.barTimeRightAxisOptionsDisplay,
					label: () => {
						return {
							fill: args.barTimeRightAxisOptionsLabelFill,
							fontSize: args.barTimeRightAxisOptionsLabelFontSize,
							verticalAnchor: args.barTimeRightAxisOptionsLabelVerticalAnchor,
						};
					},
				}}
				barTimeBottomAxisOptions={{
					stroke: args.barTimeBottomAxisOptionsStroke,
					tickStroke: args.barTimeBottomAxisOptionsTickStroke,
					className: args.barTimeBottomAxisOptionsClassName,
					strokeWitdh: args.barTimeBottomAxisOptionsStrokeWidth,
					display: args.barTimeBottomAxisOptionsDisplay,
					label: () => {
						return {
							fill: args.barTimeBottomAxisOptionsLabelFill,
							fontSize: args.barTimeBottomAxisOptionsLabelFontSize,
							verticalAnchor: args.barTimeBottomAxisOptionsLabelVerticalAnchor,
						};
					},
				}}
				margin={{
					top: args.barTimeMarginTop,
					right: args.barTimeMarginRight,
					bottom: args.barTimeMarginBottom,
					left: args.barTimeMarginLeft,
				}}
				barTimeLineCursorOptions={{
					display: args.barTimeLineCursorOptionsDisplay,
					stroke: args.barTimeLineCursorOptionsStroke,
					strokeWidth: args.barTimeLineCursorOptionsStrokeWidth,
					strokeDasharray: args.barTimeLineCursorOptionsStrokeDasharray,
				}}
				barTimeCircleCursorOptions={{
					r: args.barTimeCircleCursorOptionsR,
					stroke: args.barTimeCircleCursorOptionsStroke,
					strokeWidth: args.barTimeCircleCursorOptionsStrokeWidth,
					strokeDasharray: args.barTimeCircleCursorOptionsStrokeDasharray,
					fill: args.barTimeCircleCursorOptionsFill,
				}}
				formatX={formatX}
				formatY={formatY}
			/>
		</div>
	);
};
Template.args = {};

export const Default = Template.bind({});
Default.args = {
	maxHeight: 500,
	width: 700,

	barTimeBottomAxisOptionsStroke: "#f6e1b8",
	barTimeBottomAxisOptionsStrokeWidth: 1,
	barTimeBottomAxisOptionsTickStroke: "#f6e1b8",
	barTimeBottomAxisOptionsClassName: "",
	barTimeBottomAxisOptionsLabelFill: "#f6e1b8",
	barTimeBottomAxisOptionsLabelFontSize: 12,
	barTimeBottomAxisOptionsLabelVerticalAnchor: "middle",
	barTimeBottomAxisOptionsDisplay: true,

	barTimeRightAxisOptionsStroke: "#f6e1b8",
	barTimeRightAxisOptionsStrokeWidth: 1,
	barTimeRightAxisOptionsTickStroke: "#f6e1b8",
	barTimeRightAxisOptionsClassName: "",
	barTimeRightAxisOptionsLabelFill: "#f6e1b8",
	barTimeRightAxisOptionsLabelFontSize: 12,
	barTimeRightAxisOptionsLabelVerticalAnchor: "middle",
	barTimeRightAxisOptionsDisplay: true,

	barTimeMarginTop: 30,
	barTimeMarginRight: 40,
	barTimeMarginBottom: 60,
	barTimeMarginLeft: 4,

	barTimeLineCursorOptionsDisplay: true,
	barTimeLineCursorOptionsStroke: "#f6e1b8",
	barTimeLineCursorOptionsStrokeWidth: 2,
	barTimeLineCursorOptionsStrokeDasharray: "5,2",

	barTimeCircleCursorOptionsStroke: "#f6e1b8",
	barTimeCircleCursorOptionsFill: "#f6e1b8",
	barTimeCircleCursorOptionsStrokeWidth: 2,
	barTimeCircleCursorOptionsStrokeDasharray: "5,2",
	barTimeCircleCursorOptionsR: 4,

	barTimeTooltipBottomStyle: {
		background: "#140F34",
		border: "1px solid #f6e1b8",
		color: "#f6e1b8",
		borderRadius: "3px",
		boxShadow: "0 0 10px rgba(33,33,33,0.2)",
		padding: "4px 6px",
		fontSize: "14px",
		barHeight: "1em",
		pointerEvents: "none",
		position: "absolute",
	},
	barTimeTooltipBottomDisplay: true,

	barTimeTooltipCursorStyle: {
		background: "#140F34",
		border: "1px solid #f6e1b8",
		color: "#f6e1b8",
		borderRadius: "3px",
		boxShadow: "0 0 10px rgba(33,33,33,0.2)",
		padding: "4px 6px",
		fontSize: "14px",
		barHeight: "1em",
		pointerEvents: "none",
		position: "absolute",
		translate: "-50%",
	},
	barTimeTooltipCursorDisplay: true,

	barTimeTooltipFixedStyle: {
		textAlign: "center",
		fontSize: 12,
		background: "#f6e1b8",
		padding: "2px 4px 0px 4px",
		color: "#140F34",
		position: "absolute",
		translate: "-4px -100%",
	},
	barTimeTooltipFixedStyleDash: {
		content: "' '",
		position: "absolute",
		display: "block",
		top: "50%",
		left: "-3px",
		background: "#f6e1b8",
		width: "6px",
		height: "2px",
		transform: "translate(-100%, -50%)",
	},
	barTimeTooltipFixedDisplay: true,
};
Default.argTypes = {
	//Disable default controle
	barTimeBottomAxisOptions: {
		control: false,
	},
	margin: {
		control: false,
	},
	barTimeLineCursorOptions: {
		control: false,
	},
	barTimeCircleCursorOptions: {
		control: false,
	},
	barTimeTooltipFixed: {
		control: false,
	},
	barTimeTooltipCursor: {
		control: false,
	},
	barTimeTooltipBottom: {
		control: false,
	},

	// Create actions
	onClick: { action: "click" },
	onHover: { action: "hover" },

	// Create custom controle (more easy to test for object configuration)
	barTimeTooltipBottomStyle: {
		name: "style",
		control: "object",
		table: {
			category: "barTimeTooltipBottom",
		},
	},
	barTimeTooltipBottomDisplay: {
		name: "display",
		control: "boolean",
		table: {
			category: "barTimeTooltipBottom",
		},
	},

	barTimeTooltipCursorStyle: {
		name: "style",
		control: "object",
		table: {
			category: "barTimeTooltipCursor",
		},
	},
	barTimeTooltipCursorDisplay: {
		name: "display",
		control: "boolean",
		table: {
			category: "barTimeTooltipCursor",
		},
	},

	barTimeTooltipFixedStyle: {
		name: "style",
		control: "object",
		table: {
			category: "barTimeTooltipFixed",
		},
	},
	barTimeTooltipFixedStyleDash: {
		name: "styleDash",
		control: "object",
		table: {
			category: "barTimeTooltipFixed",
		},
	},
	barTimeTooltipFixedDisplay: {
		name: "display",
		control: "boolean",
		table: {
			category: "barTimeTooltipFixed",
		},
	},

	barTimeBottomAxisOptionsStroke: {
		name: "stroke",
		control: "color",
		table: {
			category: "barTimeBottomAxisOptions",
		},
	},
	barTimeBottomAxisOptionsDisplay: {
		name: "display",
		control: "boolean",
		table: {
			category: "barTimeBottomAxisOptions",
		},
	},
	barTimeBottomAxisOptionsTickStroke: {
		name: "tickStroke",
		control: "color",
		table: {
			category: "barTimeBottomAxisOptions",
		},
	},
	barTimeBottomAxisOptionsStrokeWidth: {
		name: "strokeWidth",
		control: "number",
		table: {
			category: "barTimeBottomAxisOptions",
		},
	},
	barTimeBottomAxisOptionsClassName: {
		name: "className",
		control: "string",
		table: {
			category: "barTimeBottomAxisOptions",
		},
	},
	barTimeBottomAxisOptionsLabelFill: {
		name: "fill",
		control: "color",
		table: {
			category: "barTimeBottomAxisOptions",
			subcategory: "Label style",
		},
	},
	barTimeBottomAxisOptionsLabelFontSize: {
		name: "fontSize",
		control: "number",
		table: {
			category: "barTimeBottomAxisOptions",
			subcategory: "Label style",
		},
	},
	barTimeBottomAxisOptionsLabelVerticalAnchor: {
		name: "verticalAnchor",
		control: {
			type: "select",
			options: ["middle", "start", "end"],
		},
		table: {
			category: "barTimeBottomAxisOptions",
			subcategory: "Label style",
		},
	},

	barTimeRightAxisOptionsStroke: {
		name: "stroke",
		control: "color",
		table: {
			category: "barTimeRightAxisOptions",
		},
	},
	barTimeRightAxisOptionsDisplay: {
		name: "display",
		control: "boolean",
		table: {
			category: "barTimeRightAxisOptions",
		},
	},
	barTimeRightAxisOptionsTickStroke: {
		name: "tickStroke",
		control: "color",
		table: {
			category: "barTimeRightAxisOptions",
		},
	},
	barTimeRightAxisOptionsStrokeWidth: {
		name: "strokeWidth",
		control: "number",
		table: {
			category: "barTimeRightAxisOptions",
		},
	},
	barTimeRightAxisOptionsClassName: {
		name: "className",
		control: "string",
		table: {
			category: "barTimeRightAxisOptions",
		},
	},
	barTimeRightAxisOptionsLabelFill: {
		name: "fill",
		control: "color",
		table: {
			category: "barTimeRightAxisOptions",
			subcategory: "Label style",
		},
	},
	barTimeRightAxisOptionsLabelFontSize: {
		name: "fontSize",
		control: "number",
		table: {
			category: "barTimeRightAxisOptions",
			subcategory: "Label style",
		},
	},
	barTimeRightAxisOptionsLabelVerticalAnchor: {
		name: "verticalAnchor",
		control: {
			type: "select",
			options: ["middle", "start", "end"],
		},
		table: {
			category: "barTimeRightAxisOptions",
			subcategory: "Label style",
		},
	},

	barTimeMarginTop: {
		name: "marginTop",
		control: "number",
		table: {
			category: "barTimeMargin",
		},
	},
	barTimeMarginBottom: {
		name: "marginBottom",
		control: "number",
		table: {
			category: "barTimeMargin",
		},
	},
	barTimeMarginRight: {
		name: "marginRight",
		control: "number",
		table: {
			category: "barTimeMargin",
		},
	},
	barTimeMarginLeft: {
		name: "marginLeft",
		control: "number",
		table: {
			category: "barTimeMargin",
		},
	},

	barTimeRightAxisOptions: {
		control: false,
	},

	barTimeLineCursorOptionsDisplay: {
		name: "display",
		control: "boolean",
		table: {
			category: "barTimeLineCursorOptions",
		},
	},
	barTimeLineCursorOptionsStroke: {
		name: "stroke",
		control: "color",
		table: {
			category: "barTimeLineCursorOptions",
		},
	},
	barTimeLineCursorOptionsStrokeWidth: {
		name: "strokeWidth",
		control: "number",
		table: {
			category: "barTimeLineCursorOptions",
		},
	},
	barTimeLineCursorOptionsStrokeDasharray: {
		name: "strokeDasharray",
		table: {
			category: "barTimeLineCursorOptions",
		},
	},

	barTimeCircleCursorOptionsStroke: {
		name: "stroke",
		control: "color",
		table: {
			category: "barTimeCircleCursorOptions",
		},
	},
	barTimeCircleCursorOptionsFill: {
		name: "fill",
		control: "color",
		table: {
			category: "barTimeCircleCursorOptions",
		},
	},
	barTimeCircleCursorOptionsStrokeWidth: {
		name: "strokeWidth",
		control: "number",
		table: {
			category: "barTimeCircleCursorOptions",
		},
	},
	barTimeCircleCursorOptionsStrokeDasharray: {
		name: "strokeDasharray",
		table: {
			category: "barTimeCircleCursorOptions",
		},
	},
	barTimeCircleCursorOptionsR: {
		name: "r",
		control: "number",
		table: {
			category: "barTimeCircleCursorOptions",
		},
	},
};
Default.storyName = "BarTime";
