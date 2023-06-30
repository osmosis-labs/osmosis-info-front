import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { ParentSize } from "@visx/responsive";
import { Margin } from "../line/line-time-config";
import {
	AnimationOptions,
	BarOptions,
	BarTimeAxisOptions,
	BarTimeCircleCursorOptions,
	BarTimeLineCursorOptions,
	BarTimeTooltip,
	BarTimeTooltipFixed,
	defaulBarTimeBottomAxisOptions,
	defaulBarTimeRightAxisOptions,
	defaultBarOptions,
	defaultBarTimeCircleCursorOptions,
	defaultBarTimeLineCursorOptions,
	defaultBarTimeMargin,
	defaultBarTimeTooltipBottom,
	defaultBarTimeTooltipCursor,
	defaultBarTimeTooltipFixed,
	defaultOptionsAnimation,
	getXScale,
	getYScale,
} from "./bar-time-config";
import { Bar, Line } from "@visx/shape";
import { AxisBottom, AxisRight, TickFormatter } from "@visx/axis";
import { Point } from "@visx/zoom/lib/types";
import { localPoint } from "@visx/event";
import { useGesture } from "@use-gesture/react";
import { drag, zoomInIndex } from "../chart-utils";
import { Tooltip, useTooltip } from "@visx/tooltip";

export type BarTimeProps<D> = {
	data: Array<D>;
	/** width: (optional) The width of the chart. Defaults to the width of the parent container. */
	width?: number;
	/** height: (optional) The height of the chart. Defaults to the height of the parent container. */
	height?: number;
	/** margin: (optional) The margins around the chart. Defaults to { top: 20, right: 30, bottom: 30, left: 40 }.*/
	margin?: Margin;
	/** getXAxisData: (required) A function that takes a data object as its argument and returns the corresponding x-axis value as a Date object.*/
	getXAxisData: (d: D) => string;
	/** getYAxisData: (required) A function that takes a data object as its argument and returns the corresponding y-axis value as a number.*/
	getYAxisData: (d: D) => number;
	/** onClick: (optional) A callback function that will be called when a data point is clicked. It will be passed the clicked data object as its only argument.*/
	onClick?: (d: D) => void;
	/** onHover: (optional) A callback function that will be called when the mouse hovers over a data point. It will be passed the hovered data object as its only argument.*/
	onHover?: (d: D) => void;
	/** formatX: (required) A function that takes a data object as its argument and returns a formatted string for x axie*/
	formatX: (d: D) => string;
	/** formatY: (required) A function that takes a data object as its argument and returns a formatted string for y axie*/
	formatY: (d: D) => string;

	/** animationOptions: (optional) An object that specifies the options for the animation that is used to transition the chart between states.*/
	animationOptions?: AnimationOptions;

	/** barTimeTooltipFixed: (optional) An object that specifies the fixed content for the tooltip that is displayed when the mouse hovers over the chart.*/
	barTimeTooltipFixed?: BarTimeTooltipFixed;
	/** barTimeTooltipCursor: (optional) An object that specifies the content for the tooltip that is displayed when the mouse hovers over a data point with the cursor tooltip enabled.*/
	barTimeTooltipCursor?: BarTimeTooltip;
	/** barTimeTooltipBottom: (optional) An object that specifies the content for the tooltip that is displayed when the mouse hovers over a data point with the bottom tooltip enabled.*/
	barTimeTooltipBottom?: BarTimeTooltip;

	/** barTimeRightAxisOptions: (optional) An object that specifies the options for the right y-axis of the chart.*/
	barTimeRightAxisOptions?: BarTimeAxisOptions;
	/** barTimeBottomAxisOptions: (optional) An object that specifies the options for the bottom x-axis of the chart.*/
	barTimeBottomAxisOptions?: BarTimeAxisOptions;

	/** barTimeLineCursorOptions: (optional) An object that specifies the options for the bar cursor that is displayed when the mouse hovers over the chart.*/
	barTimeLineCursorOptions?: BarTimeLineCursorOptions;
	/** barTimeCircleCursorOptions: (optional) An object that specifies the options for the circle cursor that is displayed when the mouse hovers over the chart.*/
	barTimeCircleCursorOptions?: BarTimeCircleCursorOptions;

	/**tickFormatX: (optional) A function that takes an argument of any type and returns a formatted string for the tick labels on the x-axis. This function is used to format the x-axis tick labels.*/
	tickFormatX?: TickFormatter<any>;
	/** tickFormatY: (optional) A function that takes an argument of any type and returns a formatted string for the tick labels on the y-axis. This function is used to format the y-axis tick labels. */
	tickFormatY?: TickFormatter<any>;

	/** classHoverBar: (optional) class passed to bar when it hover*/
	classHoverBar?: string;
	/** defaultView: (optional) An array of two numbers that specify the default view of the chart.
	 *
	 */
	defaultView?: [number, number];

	/** barOptions: (optional) An object that specifies the options for the bars of the chart.*/
	barOptions?: BarOptions;
};

const getTextWidth = (text: string, font: string): number => {
	if (typeof window === "undefined") return 0;
	const span = document.createElement("span");
	span.style.fontSize = font;
	span.style.position = "absolute";
	span.style.visibility = "hidden";
	span.innerText = text;
	document.body.appendChild(span);
	const width = span.clientWidth;
	document.body.removeChild(span);
	return width;
};

function BarChart<D>({
	data,
	width = 800,
	height = 500,
	margin = defaultBarTimeMargin,

	getXAxisData,
	getYAxisData,

	onClick,
	onHover,

	formatX,
	formatY,

	tickFormatX,
	tickFormatY,

	classHoverBar,

	animationOptions = defaultOptionsAnimation,

	barOptions = defaultBarOptions,

	barTimeRightAxisOptions = defaulBarTimeRightAxisOptions,
	barTimeBottomAxisOptions = defaulBarTimeBottomAxisOptions,

	barTimeLineCursorOptions = defaultBarTimeLineCursorOptions,
	barTimeCircleCursorOptions = defaultBarTimeCircleCursorOptions,

	barTimeTooltipFixed = defaultBarTimeTooltipFixed,
	barTimeTooltipCursor = defaultBarTimeTooltipCursor,
	barTimeTooltipBottom = defaultBarTimeTooltipBottom,
	defaultView,
}: BarTimeProps<D>) {
	const refSVG = useRef<SVGSVGElement | null>(null);
	const [limits, setLimits] = useState({ start: 0, end: 0 });
	const [startPoint, setStartPoint] = useState<Point | undefined>(undefined);
	const [isDragging, setIsDragging] = useState(false);
	const [dataLast, setDataLast] = useState<{ x: number; y: number; data: D } | null>(null);
	const [animate, setAnimate] = useState(false);
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	const displaySVG = width > 0;

	useEffect(() => {
		if (displaySVG) setAnimate(true);
	}, [displaySVG]);

	useEffect(() => {
		if (defaultView) setLimits({ start: defaultView[0], end: defaultView[1] });
	}, [defaultView]);

	useEffect(() => {
		setLimits({ start: 0, end: data.length - 1 });
	}, [data]);

	useEffect(() => {
		// Because safari doesn't work like other navigator we need to remove some events
		const prevent = (e: any) => e.preventDefault();
		document.addEventListener("gesturestart", prevent);
		document.addEventListener("gesturechange", prevent);
		return () => {
			document.removeEventListener("gesturestart", prevent);
			document.removeEventListener("gesturechange", prevent);
		};
	}, []);

	const xScale = useMemo(() => {
		let zoomedStock = data;
		zoomedStock = data.slice(limits.start, limits.end);
		return getXScale<D>({ innerWidth, margin, data: zoomedStock, getXAxisData });
	}, [data, limits.start, limits.end, margin, innerWidth, getXAxisData]);

	const yScale = useMemo(() => {
		let zoomedStock = data;
		zoomedStock = data.slice(limits.start, limits.end);
		return getYScale<D>({ innerHeight, margin, data: zoomedStock, getYAxisData });
	}, [data, limits.start, limits.end, innerHeight, margin, getYAxisData]);

	const nbTicksX = useMemo(() => {
		const paddingLabel = 10;
		const width = getTextWidth(getXAxisData(data[0]), "12px") + paddingLabel;
		return Math.floor(innerWidth / width);
	}, [data, getXAxisData, innerWidth]);

	useEffect(() => {
		if (data && data.length > 0) {
			const last = data[limits.end];
			if (last) {
				setDataLast({
					x: xScale(getXAxisData(last)) || 0,
					y: yScale(getYAxisData(last)),
					data: last,
				});
			}
		}
	}, [data, yScale, xScale, limits.end, getXAxisData, getYAxisData]);

	const { tooltipData, tooltipLeft, tooltipTop, showTooltip, hideTooltip } = useTooltip<D>();
	const refDrag = useRef<{ dragging: boolean; x: number; y: number }>({ dragging: false, x: 0, y: 0 });

	const findIndex = useCallback(
		(
			event:
				| React.TouchEvent<SVGRectElement>
				| React.MouseEvent
				| React.TouchEvent
				| MouseEvent
				| TouchEvent
				| React.PointerEvent
				| React.MouseEvent<SVGRectElement>
				| MouseEvent
				| React.WheelEvent
				| WheelEvent
				| MouseEvent
				| TouchEvent
				| PointerEvent
		) => {
			const { x } = localPoint(event) || { x: 0 };

			let index = xScale.domain().findIndex((d) => {
				return x >= xScale(d)! && x <= xScale(d)! + xScale.bandwidth();
			});
			if (index < 0 || index >= data.length) {
				index = Math.floor(x / xScale.step()) - 1;
			}
			// need to recalculate with limit to get index of data and not index of data diplayed (ex: if display data between 10 and 20, index 1 => 11 for data)
			const indexLimit = limits.start + index;

			return indexLimit;
		},
		[data.length, limits.start, xScale]
	);

	const handleTooltip = useCallback(
		(event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
			const { x } = localPoint(event) || { x: 0 };
			const index = findIndex(event);
			const d = data[index];
			const barHeight = innerHeight - (yScale(getYAxisData(d)) ?? 0) + margin.top;
			const barY = innerHeight - barHeight + margin.top;
			if (x < 0 || x > innerWidth + margin.left) {
				return;
			}
			showTooltip({
				tooltipData: d,
				tooltipLeft: x,
				tooltipTop: barY,
			});
			if (onHover && d) onHover(d as D);
		},
		[findIndex, data, innerHeight, yScale, getYAxisData, margin.top, margin.left, innerWidth, showTooltip, onHover]
	);

	const onClickSvg = (event: MouseEvent) => {
		if (onClick) {
			const { x } = localPoint(event) || { x: 0 };
			const index = Math.round(x / xScale.step());
			const d = data[index];
			onClick(d);
		}
	};

	const onZoom = useCallback(
		(event: React.WheelEvent | WheelEvent | MouseEvent | TouchEvent | PointerEvent, zoomIn: boolean) => {
			event.preventDefault();
			if (data.length < 2) return;
			const index = findIndex(event);
			const nextLimits = zoomInIndex({ start: limits.start, end: limits.end }, data, index, zoomIn);
			setLimits(nextLimits);
		},
		[data, findIndex, limits.start, limits.end]
	);

	const onDrag = useCallback(
		(dx: number) => {
			const nextLimits = drag({ start: limits.start, end: limits.end }, data, dx);
			setLimits(nextLimits);
		},
		[data, limits.start, limits.end]
	);

	const dragEnd = useCallback(() => {
		setStartPoint(undefined);
		setIsDragging(false);
	}, []);

	const dragStart = useCallback(
		(event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent | React.PointerEvent) => {
			setIsDragging(true);
			setStartPoint(localPoint(event) || undefined);
		},
		[]
	);

	const dragMove = useCallback(
		(event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent | React.PointerEvent) => {
			if (!isDragging || !startPoint) return;
			const currentPoint = localPoint(event) || undefined;
			const dx = currentPoint ? -(startPoint.x - currentPoint.x) : -startPoint.x;
			const dy = currentPoint ? -(startPoint.y - currentPoint.y) : -startPoint.y;
			onDrag(dx);
			setStartPoint(currentPoint);
			refDrag.current = { dragging: true, x: dx, y: dy };
		},
		[isDragging, startPoint, onDrag]
	);

	const doubleClick = () => {
		setLimits({ start: 0, end: data.length - 1 });
	};

	useGesture(
		{
			onDragStart: ({ event }) => {
				if (!(event instanceof KeyboardEvent)) dragStart(event);
			},
			onDrag: ({ event, pinching, cancel }) => {
				if (pinching) {
					cancel();
				} else if (!(event instanceof KeyboardEvent)) {
					dragMove(event);
				}
			},
			onPinch: ({ event, direction }) => {
				const [val1, val2] = direction;
				const absVal1 = Math.abs(val1);
				const absVal2 = Math.abs(val2);
				const zoomIn = absVal1 >= absVal2 ? val1 >= 0 : val2 >= 0;
				if (!(event instanceof KeyboardEvent)) {
					onZoom(event, zoomIn);
				}
			},
			onDragEnd: dragEnd,
			onWheel: ({ event, active }) => {
				if (!active) return;
				const { deltaY } = event;
				const zoomIn = deltaY < 0;
				onZoom(event, zoomIn);
			},
			onClick: (state) => {
				if (state.event.detail == 2) {
					doubleClick();
				} else {
					onClickSvg(state.event);
				}
			},
		},
		{ target: refSVG, eventOptions: { passive: false }, drag: { filterTaps: true } }
	);

	return (
		<div className="relative touch-none">
			<svg width={width} height={height} ref={refSVG}>
				<defs>
					<clipPath id="clipPathBar">
						{displaySVG && <rect x={margin.left} y={margin.top} width={innerWidth} height={innerHeight} />}
					</clipPath>
				</defs>

				{displaySVG && (
					<g
						x={margin.left}
						y={margin.top}
						width={innerWidth}
						height={innerHeight}
						style={{ clipPath: "url(#clipPathBar)" }}
					>
						{data.map((d, index) => {
							const x = getXAxisData(d);
							const y = getYAxisData(d);

							const timeAnimationStep = (animationOptions.delayBarTimeTick / data.length) * index;
							const barWidth = xScale.bandwidth();
							const barHeight = innerHeight - (yScale(y) ?? 0) + margin.top;
							const barX = xScale(x);
							const barY = innerHeight - barHeight + margin.top;
							if (!barX) return;
							return (
								<Bar
									aria-details={`bar-${x}`}
									key={`bar-${x}`}
									x={barX}
									y={barY}
									width={barWidth}
									height={barHeight}
									fill={barOptions.fillColor}
									stroke={barOptions.strokeColor}
									className={
										animate
											? `${classHoverBar} ${animationOptions.animationBarClass}`
											: `${classHoverBar} ${animationOptions.waitingBarClass}`
									}
									onTouchStart={handleTooltip}
									onTouchMove={handleTooltip}
									onMouseMove={handleTooltip}
									onMouseLeave={() => {
										hideTooltip();
									}}
								/>
							);
						})}
					</g>
				)}

				{displaySVG && (
					<Bar
						x={margin.left}
						y={margin.top}
						width={innerWidth}
						height={innerHeight}
						fill="transparent"
						style={{ pointerEvents: "none" }}
					/>
				)}
				{barTimeRightAxisOptions.display && (
					<AxisRight
						scale={yScale}
						left={innerWidth + margin.left}
						strokeWidth={barTimeRightAxisOptions.strokeWitdh}
						top={-1}
						stroke={barTimeRightAxisOptions.stroke}
						tickStroke={barTimeRightAxisOptions.tickStroke}
						tickLabelProps={barTimeRightAxisOptions.label}
						tickFormat={tickFormatY}
						axisClassName={animate ? animationOptions.animationRightAxisClass : ""}
					/>
				)}
				{barTimeBottomAxisOptions.display && (
					<AxisBottom
						numTicks={nbTicksX}
						top={height - margin.bottom}
						scale={xScale}
						strokeWidth={barTimeBottomAxisOptions.strokeWitdh}
						stroke={barTimeBottomAxisOptions.stroke}
						tickStroke={barTimeBottomAxisOptions.tickStroke}
						tickLabelProps={barTimeBottomAxisOptions.label}
						axisClassName={animate ? animationOptions.animationBottomAxisClass : ""}
						tickFormat={tickFormatX}
					/>
				)}
				{tooltipData && barTimeLineCursorOptions.display && (
					<g>
						<Line
							from={{ x: tooltipLeft, y: margin.top }}
							to={{ x: tooltipLeft, y: innerHeight + margin.top }}
							pointerEvents="none"
							stroke={barTimeLineCursorOptions.stroke}
							strokeWidth={barTimeLineCursorOptions.strokeWidth}
							strokeDasharray={barTimeLineCursorOptions.strokeDasharray}
						/>

						<circle
							cx={tooltipLeft}
							cy={tooltipTop ? tooltipTop + 1 : 0}
							pointerEvents="none"
							r={barTimeCircleCursorOptions.r}
							stroke={barTimeCircleCursorOptions.stroke}
							strokeWidth={barTimeCircleCursorOptions.strokeWidth}
							strokeDasharray={barTimeCircleCursorOptions.strokeDasharray}
							fill={barTimeCircleCursorOptions.fill}
						/>
					</g>
				)}
			</svg>
			{tooltipData && barTimeTooltipCursor.display && (
				<Tooltip
					top={tooltipTop ? tooltipTop : 0}
					left={tooltipLeft ? tooltipLeft : 0}
					style={barTimeTooltipCursor.style}
				>
					{formatY(tooltipData)}
				</Tooltip>
			)}

			{tooltipData && barTimeTooltipBottom.display && (
				<Tooltip
					top={height - margin.bottom}
					left={tooltipLeft ? tooltipLeft - 8 : 0}
					style={barTimeTooltipBottom.style}
				>
					{formatX(tooltipData)}
				</Tooltip>
			)}

			{dataLast && barTimeTooltipFixed.display && (
				<Tooltip top={dataLast.y} left={innerWidth + margin.left} style={barTimeTooltipFixed.style}>
					<div className="relative">
						<span style={barTimeTooltipFixed.styleDash}></span>
						{formatY(dataLast.data)}
					</div>
				</Tooltip>
			)}
		</div>
	);
}

export const BarTime = function <T>({ maxHeight = 500, ...rest }: BarTimeProps<T> & { maxHeight?: number }) {
	return (
		<ParentSize>
			{(parent) => {
				const height = Math.min(parent.height, maxHeight!);
				return <BarChart<T> width={parent.width} height={height} {...rest} />;
			}}
		</ParentSize>
	);
};
