import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LineTime } from "./line-time";

import { appleStock } from "@visx/mock-data/";
import { AppleStock } from "@visx/mock-data/lib/mocks/appleStock";
import { bisector } from "d3-array";

export default {
	title: "Components/Chart/LineTime",
	component: LineTime,
} as ComponentMeta<typeof LineTime>;

const getXAxisData = (d: AppleStock) => new Date(d.date);
const getYAxisData = (d: AppleStock) => d.close;
const bisectIndexDate = bisector<AppleStock, Date>((d: AppleStock) => new Date(d.date)).left;

const Template: ComponentStory<any> = (args: any) => {
	const data = appleStock.slice(800);

	return (
		<div className="max-h-[500px] max-w-[800px] h-[500px]">
			<LineTime<AppleStock>
				maxHeight={args.maxHeight}
				width={args.width}
				data={data}
				getXAxisData={getXAxisData}
				getYAxisData={getYAxisData}
				bisectDate={bisectIndexDate}
				onClick={args.onClick}
				onHover={args.onHover}
				lineTimeTooltipBottom={{ display: args.lineTimeTooltipBottomDisplay, style: args.lineTimeTooltipBottomStyle }}
				lineTimeTooltipCursor={{ display: args.lineTimeTooltipCursorDisplay, style: args.lineTimeTooltipCursorStyle }}
				lineTimeTooltipFixed={{
					display: args.lineTimeTooltipFixedDisplay,
					style: args.lineTimeTooltipFixedStyle,
					styleDash: args.lineTimeTooltipFixedStyleDash,
				}}
				lineTimeOptions={{
					fill: args.lineTimeOptionsFill,
					strokeWidth: args.lineTimeOptionsStrokeWidth,
					stroke: args.lineTimeOptionsStroke,
				}}
				lineTimeRightAxisOptions={{
					stroke: args.lineTimeRightAxisOptionsStroke,
					tickStroke: args.lineTimeRightAxisOptionsTickStroke,
					className: args.lineTimeRightAxisOptionsClassName,
					strokeWitdh: args.lineTimeRightAxisOptionsStrokeWidth,
					display: args.lineTimeRightAxisOptionsDisplay,
					label: () => {
						return {
							fill: args.lineTimeRightAxisOptionsLabelFill,
							fontSize: args.lineTimeRightAxisOptionsLabelFontSize,
							verticalAnchor: args.lineTimeRightAxisOptionsLabelVerticalAnchor,
						};
					},
				}}
				lineTimeBottomAxisOptions={{
					stroke: args.lineTimeBottomAxisOptionsStroke,
					tickStroke: args.lineTimeBottomAxisOptionsTickStroke,
					className: args.lineTimeBottomAxisOptionsClassName,
					strokeWitdh: args.lineTimeBottomAxisOptionsStrokeWidth,
					display: args.lineTimeBottomAxisOptionsDisplay,
					label: () => {
						return {
							fill: args.lineTimeBottomAxisOptionsLabelFill,
							fontSize: args.lineTimeBottomAxisOptionsLabelFontSize,
							verticalAnchor: args.lineTimeBottomAxisOptionsLabelVerticalAnchor,
						};
					},
				}}
				margin={{
					top: args.lineTimeMarginTop,
					right: args.lineTimeMarginRight,
					bottom: args.lineTimeMarginBottom,
					left: args.lineTimeMarginLeft,
				}}
				lineTimeLineCursorOptions={{
					display: args.lineTimeLineCursorOptionsDisplay,
					stroke: args.lineTimeLineCursorOptionsStroke,
					strokeWidth: args.lineTimeLineCursorOptionsStrokeWidth,
					strokeDasharray: args.lineTimeLineCursorOptionsStrokeDasharray,
				}}
				lineTimeCircleCursorOptions={{
					r: args.lineTimeCircleCursorOptionsR,
					stroke: args.lineTimeCircleCursorOptionsStroke,
					strokeWidth: args.lineTimeCircleCursorOptionsStrokeWidth,
					strokeDasharray: args.lineTimeCircleCursorOptionsStrokeDasharray,
					fill: args.lineTimeCircleCursorOptionsFill,
				}}
				lineTimeGradientOptions={{
					from: args.lineTimeGradientOptionsFrom,
					to: args.lineTimeGradientOptionsTo,
					opacity: args.lineTimeGradientOptionsOpacity,
					display: args.lineTimeGradientOptionsDisplay,
				}}
			/>
		</div>
	);
};
Template.args = {};

export const Default = Template.bind({});
Default.args = {
	maxHeight: 500,
	width: 700,
	lineTimeOptionsStroke: "#f6e1b8",
	lineTimeOptionsFill: "none",
	lineTimeOptionsStrokeWidth: 2,
	lineTimeBottomAxisOptionsStroke: "#f6e1b8",
	lineTimeBottomAxisOptionsStrokeWidth: 1,
	lineTimeBottomAxisOptionsTickStroke: "#f6e1b8",
	lineTimeBottomAxisOptionsClassName: "",
	lineTimeBottomAxisOptionsLabelFill: "#f6e1b8",
	lineTimeBottomAxisOptionsLabelFontSize: 12,
	lineTimeBottomAxisOptionsLabelVerticalAnchor: "middle",
	lineTimeBottomAxisOptionsDisplay: true,

	lineTimeRightAxisOptionsStroke: "#f6e1b8",
	lineTimeRightAxisOptionsStrokeWidth: 1,
	lineTimeRightAxisOptionsTickStroke: "#f6e1b8",
	lineTimeRightAxisOptionsClassName: "",
	lineTimeRightAxisOptionsLabelFill: "#f6e1b8",
	lineTimeRightAxisOptionsLabelFontSize: 12,
	lineTimeRightAxisOptionsLabelVerticalAnchor: "middle",
	lineTimeRightAxisOptionsDisplay: true,

	lineTimeMarginTop: 30,
	lineTimeMarginRight: 40,
	lineTimeMarginBottom: 60,
	lineTimeMarginLeft: 4,

	lineTimeLineCursorOptionsDisplay: true,
	lineTimeLineCursorOptionsStroke: "#f6e1b8",
	lineTimeLineCursorOptionsStrokeWidth: 2,
	lineTimeLineCursorOptionsStrokeDasharray: "5,2",

	lineTimeCircleCursorOptionsStroke: "#f6e1b8",
	lineTimeCircleCursorOptionsFill: "#f6e1b8",
	lineTimeCircleCursorOptionsStrokeWidth: 2,
	lineTimeCircleCursorOptionsStrokeDasharray: "5,2",
	lineTimeCircleCursorOptionsR: 4,

	lineTimeGradientOptionsFrom: "#f6e1b8",
	lineTimeGradientOptionsTo: "#140F34",
	lineTimeGradientOptionsOpacity: 1,
	lineTimeGradientOptionsDisplay: true,

	lineTimeTooltipBottomStyle: {
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
	},
	lineTimeTooltipBottomDisplay: true,

	lineTimeTooltipCursorStyle: {
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
		translate: "-50%",
	},
	lineTimeTooltipCursorDisplay: true,

	lineTimeTooltipFixedStyle: {
		textAlign: "center",
		fontSize: 12,
		background: "#f6e1b8",
		padding: "2px 4px 0px 4px",
		color: "#140F34",
		position: "absolute",
		translate: "0 -100%",
	},
	lineTimeTooltipFixedStyleDash: {
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
	lineTimeTooltipFixedDisplay: true,
};
Default.argTypes = {
	//Disable default controle
	lineTimeBottomAxisOptions: {
		table: {
			disable: true,
		},
	},
	margin: {
		table: {
			disable: true,
		},
	},
	lineTimeGradientOptions: {
		table: {
			disable: true,
		},
	},
	useGradient: {
		table: {
			disable: true,
		},
	},
	lineTimeOptions: {
		table: {
			disable: true,
		},
	},
	lineTimeLineCursorOptions: {
		table: {
			disable: true,
		},
	},
	lineTimeCircleCursorOptions: {
		table: {
			disable: true,
		},
	},
	lineTimeTooltipFixed: {
		table: {
			disable: true,
		},
	},
	lineTimeTooltipCursor: {
		table: {
			disable: true,
		},
	},
	lineTimeTooltipBottom: {
		table: {
			disable: true,
		},
	},

	// Create actions
	onClick: { action: "click" },
	onHover: { action: "hover" },

	// Create custom controle (more easy to test for object configuration)
	lineTimeTooltipBottomStyle: {
		name: "style",
		control: "object",
		table: {
			category: "lineTimeTooltipBottom",
		},
	},
	lineTimeTooltipBottomDisplay: {
		name: "display",
		control: "boolean",
		table: {
			category: "lineTimeTooltipBottom",
		},
	},

	lineTimeTooltipCursorStyle: {
		name: "style",
		control: "object",
		table: {
			category: "lineTimeTooltipCursor",
		},
	},
	lineTimeTooltipCursorDisplay: {
		name: "display",
		control: "boolean",
		table: {
			category: "lineTimeTooltipCursor",
		},
	},

	lineTimeTooltipFixedStyle: {
		name: "style",
		control: "object",
		table: {
			category: "lineTimeTooltipFixed",
		},
	},
	lineTimeTooltipFixedStyleDash: {
		name: "styleDash",
		control: "object",
		table: {
			category: "lineTimeTooltipFixed",
		},
	},
	lineTimeTooltipFixedDisplay: {
		name: "display",
		control: "boolean",
		table: {
			category: "lineTimeTooltipFixed",
		},
	},

	lineTimeOptionsStroke: {
		name: "stroke",
		control: "color",
		table: {
			category: "lineTimeOptions",
		},
	},
	lineTimeOptionsFill: {
		name: "fill",
		table: {
			category: "lineTimeOptions",
		},
	},
	lineTimeOptionsStrokeWidth: {
		name: "strokeWidth",
		control: "number",
		table: {
			category: "lineTimeOptions",
		},
	},

	lineTimeBottomAxisOptionsStroke: {
		name: "stroke",
		control: "color",
		table: {
			category: "lineTimeBottomAxisOptions",
		},
	},
	lineTimeBottomAxisOptionsDisplay: {
		name: "display",
		control: "boolean",
		table: {
			category: "lineTimeBottomAxisOptions",
		},
	},
	lineTimeBottomAxisOptionsTickStroke: {
		name: "tickStroke",
		control: "color",
		table: {
			category: "lineTimeBottomAxisOptions",
		},
	},
	lineTimeBottomAxisOptionsStrokeWidth: {
		name: "strokeWidth",
		control: "number",
		table: {
			category: "lineTimeBottomAxisOptions",
		},
	},
	lineTimeBottomAxisOptionsClassName: {
		name: "className",
		control: "string",
		table: {
			category: "lineTimeBottomAxisOptions",
		},
	},
	lineTimeBottomAxisOptionsLabelFill: {
		name: "fill",
		control: "color",
		table: {
			category: "lineTimeBottomAxisOptions",
			subcategory: "Label style",
		},
	},
	lineTimeBottomAxisOptionsLabelFontSize: {
		name: "fontSize",
		control: "number",
		table: {
			category: "lineTimeBottomAxisOptions",
			subcategory: "Label style",
		},
	},
	lineTimeBottomAxisOptionsLabelVerticalAnchor: {
		name: "verticalAnchor",
		control: {
			type: "select",
			options: ["middle", "start", "end"],
		},
		table: {
			category: "lineTimeBottomAxisOptions",
			subcategory: "Label style",
		},
	},

	lineTimeRightAxisOptionsStroke: {
		name: "stroke",
		control: "color",
		table: {
			category: "lineTimeRightAxisOptions",
		},
	},
	lineTimeRightAxisOptionsDisplay: {
		name: "display",
		control: "boolean",
		table: {
			category: "lineTimeRightAxisOptions",
		},
	},
	lineTimeRightAxisOptionsTickStroke: {
		name: "tickStroke",
		control: "color",
		table: {
			category: "lineTimeRightAxisOptions",
		},
	},
	lineTimeRightAxisOptionsStrokeWidth: {
		name: "strokeWidth",
		control: "number",
		table: {
			category: "lineTimeRightAxisOptions",
		},
	},
	lineTimeRightAxisOptionsClassName: {
		name: "className",
		control: "string",
		table: {
			category: "lineTimeRightAxisOptions",
		},
	},
	lineTimeRightAxisOptionsLabelFill: {
		name: "fill",
		control: "color",
		table: {
			category: "lineTimeRightAxisOptions",
			subcategory: "Label style",
		},
	},
	lineTimeRightAxisOptionsLabelFontSize: {
		name: "fontSize",
		control: "number",
		table: {
			category: "lineTimeRightAxisOptions",
			subcategory: "Label style",
		},
	},
	lineTimeRightAxisOptionsLabelVerticalAnchor: {
		name: "verticalAnchor",
		control: {
			type: "select",
			options: ["middle", "start", "end"],
		},
		table: {
			category: "lineTimeRightAxisOptions",
			subcategory: "Label style",
		},
	},

	lineTimeMarginTop: {
		name: "marginTop",
		control: "number",
		table: {
			category: "lineTimeMargin",
		},
	},
	lineTimeMarginBottom: {
		name: "marginBottom",
		control: "number",
		table: {
			category: "lineTimeMargin",
		},
	},
	lineTimeMarginRight: {
		name: "marginRight",
		control: "number",
		table: {
			category: "lineTimeMargin",
		},
	},
	lineTimeMarginLeft: {
		name: "marginLeft",
		control: "number",
		table: {
			category: "lineTimeMargin",
		},
	},

	lineTimeRightAxisOptions: {
		table: {
			disable: true,
		},
	},

	lineTimeLineCursorOptionsDisplay: {
		name: "display",
		control: "boolean",
		table: {
			category: "lineTimeLineCursorOptions",
		},
	},
	lineTimeLineCursorOptionsStroke: {
		name: "stroke",
		control: "color",
		table: {
			category: "lineTimeLineCursorOptions",
		},
	},
	lineTimeLineCursorOptionsStrokeWidth: {
		name: "strokeWidth",
		control: "number",
		table: {
			category: "lineTimeLineCursorOptions",
		},
	},
	lineTimeLineCursorOptionsStrokeDasharray: {
		name: "strokeDasharray",
		table: {
			category: "lineTimeLineCursorOptions",
		},
	},

	lineTimeCircleCursorOptionsStroke: {
		name: "stroke",
		control: "color",
		table: {
			category: "lineTimeCircleCursorOptions",
		},
	},
	lineTimeCircleCursorOptionsFill: {
		name: "fill",
		control: "color",
		table: {
			category: "lineTimeCircleCursorOptions",
		},
	},
	lineTimeCircleCursorOptionsStrokeWidth: {
		name: "strokeWidth",
		control: "number",
		table: {
			category: "lineTimeCircleCursorOptions",
		},
	},
	lineTimeCircleCursorOptionsStrokeDasharray: {
		name: "strokeDasharray",
		table: {
			category: "lineTimeCircleCursorOptions",
		},
	},
	lineTimeCircleCursorOptionsR: {
		name: "r",
		control: "number",
		table: {
			category: "lineTimeCircleCursorOptions",
		},
	},

	lineTimeGradientOptionsDisplay: {
		name: "display",
		control: "boolean",
		table: {
			category: "lineTimeGradientOptions",
		},
	},
	lineTimeGradientOptionsFrom: {
		name: "from",
		control: "color",
		table: {
			category: "lineTimeGradientOptions",
		},
	},
	lineTimeGradientOptionsTo: {
		name: "to",
		control: "color",
		table: {
			category: "lineTimeGradientOptions",
		},
	},
	lineTimeGradientOptionsOpacity: {
		name: "opacity",
		control: "number",
		table: {
			category: "lineTimeGradientOptions",
		},
	},
};
Default.storyName = "LineTime";
