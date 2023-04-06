import React, { useMemo, useCallback, useState, useEffect, useRef } from "react";
import { AreaClosed, LinePath, Line as LineVisx, Bar } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { localPoint } from "@visx/event";
import { LinearGradient } from "@visx/gradient";
import { AxisRight, AxisBottom, TickFormatter, AxisScale } from "@visx/axis";
import { Tooltip, useTooltip } from "@visx/tooltip";
import { ParentSize } from "@visx/responsive";
import { useGesture } from "@use-gesture/react";
import { Point } from "@visx/zoom/lib/types";
import {
	AnimationOptions,
	defaulLineTimeBottomAxisOptions,
	defaulLineTimeRightAxisOptions,
	defaultLineTimeCircleCursorOptions,
	defaultLineTimeLineCursorOptions,
	defaultLineTimeMargin,
	defaultOptionsAnimation,
	defaultLineTimeGradientOptions,
	defaultOptionsLine,
	getXScale,
	getYScale,
	LineTimeGradientOptions,
	LineTimeAxisOptions,
	LineTimeCircleCursorOptions,
	LineTimeLineCursorOptions,
	LineTimeOptions,
	Margin,
	LineTimeTooltipFixed,
	LineTimeTooltip,
	defaultLineTimeTooltipFixed,
	defaultLineTimeTooltipCursor,
	defaultLineTimeTooltipBottom,
} from "./line-time-config";
import { bisector } from "d3-array";
import { drag } from "../chart-utils";

/*
TO DO use composition pattern to improve performance (ex for axies)
*/

/**
 * The LineTime component is a React component that renders a time-based line chart using the ChartLine component.
 * It is designed to be used with data that has a time-based X-axis and numeric Y-axis.
 * The component dynamically adjusts its height based on the height of its parent element and a maximum height prop that can be passed in.
 */
export type LineTimeProps<D> = {
	/** width: (optional) The width of the chart. Defaults to the width of the parent container. */
	width?: number;
	/** height: (optional) The height of the chart. Defaults to the height of the parent container. */
	height?: number;
	/** margin: (optional) The margins around the chart. Defaults to { top: 20, right: 30, bottom: 30, left: 40 }.*/
	margin?: Margin;
	/** data: (required) The array of data objects to be displayed in the chart.*/
	data: D[];
	/** onClick: (optional) A callback function that will be called when a data point is clicked. It will be passed the clicked data object as its only argument.*/
	onClick?: (d: D) => void;
	/** onHover: (optional) A callback function that will be called when the mouse hovers over a data point. It will be passed the hovered data object as its only argument.*/
	onHover?: (d: D) => void;
	/** getXAxisData: (required) A function that takes a data object as its argument and returns the corresponding x-axis value as a Date object.*/
	getXAxisData: (d: D) => Date;
	/** getYAxisData: (required) A function that takes a data object as its argument and returns the corresponding y-axis value as a number.*/
	getYAxisData: (d: D) => number;
	/** formatX: (required) A function that takes a data object as its argument and returns a formatted string for x axie*/
	formatX: (d: D) => string;
	/** formatY: (required) A function that takes a data object as its argument and returns a formatted string for y axie*/
	formatY: (d: D) => string;
	/** bisectDate: (required) A function that takes an array of data objects and a Date object as its arguments, and returns the index of the data object in the array that is closest to the given Date object. This function is used to determine which data point to display in the chart cursor and tooltip.*/
	bisectDate: (array: ArrayLike<D>, x: Date, lo?: number | undefined, hi?: number | undefined) => number;
	/** lineTimeGradientOptions: (optional) An object that specifies the options for the gradient that is used to fill the area under the chart line.*/
	lineTimeGradientOptions?: LineTimeGradientOptions;
	/** animationOptions: (optional) An object that specifies the options for the animation that is used to transition the chart between states.*/
	animationOptions?: AnimationOptions;
	/** lineTimeOptions: (optional) An object that specifies the options for the chart line.*/
	lineTimeOptions?: LineTimeOptions;
	/** lineTimeRightAxisOptions: (optional) An object that specifies the options for the right y-axis of the chart.*/
	lineTimeRightAxisOptions?: LineTimeAxisOptions;
	/** lineTimeBottomAxisOptions: (optional) An object that specifies the options for the bottom x-axis of the chart.*/
	lineTimeBottomAxisOptions?: LineTimeAxisOptions;
	/** lineTimeLineCursorOptions: (optional) An object that specifies the options for the line cursor that is displayed when the mouse hovers over the chart.*/
	lineTimeLineCursorOptions?: LineTimeLineCursorOptions;
	/** lineTimeCircleCursorOptions: (optional) An object that specifies the options for the circle cursor that is displayed when the mouse hovers over the chart.*/
	lineTimeCircleCursorOptions?: LineTimeCircleCursorOptions;
	/** lineTimeTooltipFixed: (optional) An object that specifies the fixed content for the tooltip that is displayed when the mouse hovers over the chart.*/
	lineTimeTooltipFixed?: LineTimeTooltipFixed;
	/** lineTimeTooltipCursor: (optional) An object that specifies the content for the tooltip that is displayed when the mouse hovers over a data point with the cursor tooltip enabled.*/
	lineTimeTooltipCursor?: LineTimeTooltip;
	/** lineTimeTooltipBottom: (optional) An object that specifies the content for the tooltip that is displayed when the mouse hovers over a data point with the bottom tooltip enabled.*/
	lineTimeTooltipBottom?: LineTimeTooltip;
	/**tickFormatX: (optional) A function that takes an argument of any type and returns a formatted string for the tick labels on the x-axis. This function is used to format the x-axis tick labels.*/
	tickFormatX?: TickFormatter<any>;
	/** tickFormatY: (optional) A function that takes an argument of any type and returns a formatted string for the tick labels on the y-axis. This function is used to format the y-axis tick labels. */
	tickFormatY?: TickFormatter<any>;
};

function ChartLine<D>({
	width = 800,
	height = 500,
	margin = defaultLineTimeMargin,
	data,
	onClick,
	onHover,
	getXAxisData,
	getYAxisData,
	formatX,
	formatY,
	tickFormatX,
	tickFormatY,

	lineTimeGradientOptions = defaultLineTimeGradientOptions,

	animationOptions = defaultOptionsAnimation,

	lineTimeOptions = defaultOptionsLine,

	lineTimeRightAxisOptions = defaulLineTimeRightAxisOptions,
	lineTimeBottomAxisOptions = defaulLineTimeBottomAxisOptions,

	lineTimeLineCursorOptions = defaultLineTimeLineCursorOptions,
	lineTimeCircleCursorOptions = defaultLineTimeCircleCursorOptions,

	lineTimeTooltipFixed = defaultLineTimeTooltipFixed,
	lineTimeTooltipCursor = defaultLineTimeTooltipCursor,
	lineTimeTooltipBottom = defaultLineTimeTooltipBottom,
}: LineTimeProps<D>) {
	const [limits, setLimits] = useState({ start: 0, end: 0 });
	const displaySVG = width > 0;
	const refPathLine = useRef<SVGPathElement | null>(null);
	const [startPoint, setStartPoint] = useState<Point | undefined>(undefined);
	const refSVG = useRef<SVGSVGElement | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setLimits({ start: 0, end: data.length });
	}, [data]);

	useEffect(() => {
		if (width > 0) {
			setIsLoaded(true);
		}
	}, [width]);

	useEffect(() => {
		if (isLoaded && refPathLine.current) {
			const path = refPathLine.current;
			const pathLength = path.getTotalLength();
			path.style.strokeDasharray = `${pathLength}`;
			path.style.strokeDashoffset = `${pathLength} `;
			path.classList.remove(animationOptions.waitingLineClass);
			path.classList.add(animationOptions.animationLineClass);
			const timer = window.setTimeout(() => {
				path.style.strokeDasharray = ``;
				path.style.strokeDashoffset = ` `;
			}, animationOptions.timeRemoveDashed);
			return () => {
				window.clearTimeout(timer);
			};
		}
		return;
	}, [
		refPathLine,
		isLoaded,
		animationOptions.waitingLineClass,
		animationOptions.animationLineClass,
		animationOptions.timeRemoveDashed,
	]);

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

	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;
	const [animate, setAnimate] = useState(false);
	const refDrag = useRef<{ dragging: boolean; x: number; y: number }>({ dragging: false, x: 0, y: 0 });

	const [dataLast, setDataLast] = useState<{ x: number; y: number; data: number } | null>(null);

	const { tooltipData, tooltipLeft, tooltipTop, showTooltip, hideTooltip } = useTooltip<D>();

	const bisectDate = useCallback(bisector((d: D) => getXAxisData(d)).left, [getXAxisData]);

	useEffect(() => {
		if (displaySVG) setAnimate(true);
	}, [displaySVG]);

	// scales
	const xScale = useMemo(() => {
		let zoomedStock = data;
		zoomedStock = data.slice(limits.start, limits.end);
		return getXScale<D>({ innerWidth, margin, data: zoomedStock, getXAxisData });
	}, [data, limits.start, limits.end, margin, innerWidth, getXAxisData]);

	const yScale = useMemo(() => {
		return getYScale<D>({ innerHeight, margin, data, getYAxisData });
	}, [innerHeight, margin, data, getYAxisData]);

	useEffect(() => {
		if (data && data.length > 0) {
			const last = data[limits.end - 1];
			if (last) {
				setDataLast({
					x: xScale(getXAxisData(last)),
					y: yScale(getYAxisData(last)),
					data: getYAxisData(last),
				});
			}
		}
	}, [data, yScale, xScale, limits.end, getXAxisData, getYAxisData]);

	const handleTooltip = useCallback(
		(event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
			const { x } = localPoint(event) || { x: 0 };
			const x0 = xScale.invert(x);
			const index = bisectDate(data, x0, 1);
			const d0 = data[index - 1];
			const d1 = data[index];
			let d = d0;
			if (d1 && getXAxisData(d1)) {
				d = x0.valueOf() - getXAxisData(d0).valueOf() > getXAxisData(d1).valueOf() - x0.valueOf() ? d1 : d0;
			}
			if (x < 0 || x > innerWidth) return;
			showTooltip({
				tooltipData: d,
				tooltipLeft: x,
				tooltipTop: yScale(getYAxisData(d)),
			});
			if (onHover && d) onHover(d as D);
		},
		[xScale, data, innerWidth, showTooltip, yScale, onHover, getYAxisData, getXAxisData, bisectDate]
	);

	const onClickSvg = (event: MouseEvent) => {
		if (onClick) {
			const { x } = localPoint(event) || { x: 0 };
			const x0 = xScale.invert(x);
			const index = bisectDate(data, x0, 1);
			const d0 = data[index - 1];
			const d1 = data[index];
			let d = d0;
			if (d1 && getXAxisData(d1)) {
				d = x0.valueOf() - getXAxisData(d0).valueOf() > getXAxisData(d1).valueOf() - x0.valueOf() ? d1 : d0;
			}
			onClick(d);
		}
	};

	const setNextLimits = useCallback(
		(start: number, end: number) => {
			// Check start and end limits (to don't go out) and set them
			const newLimit = { start: limits.start, end: limits.end };

			//check limits
			if (start < 0) start = 0;
			if (end > data.length) end = data.length;

			if (start < limits.end) newLimit.start = start;
			if (end > limits.start) newLimit.end = end;

			setLimits(newLimit);
		},
		[data.length, limits.end, limits.start]
	);

	const onDrag = useCallback(
		(dx: number) => {
			const nextLimits = drag({ start: limits.start, end: limits.end }, data, dx);
			setLimits(nextLimits);
		},
		[data, limits.end, limits.start]
	);

	const handleWheel = useCallback(
		(event: React.WheelEvent | WheelEvent) => {
			event.preventDefault();
			const { x } = localPoint(event) || { x: 0 };
			const x0 = xScale.invert(x);
			const index = bisectDate(data, x0, 1);

			// get step (10% of rest)
			const stepPercentage = 10;
			const stepStart = (index - limits.start) / stepPercentage;
			const stepEnd = (limits.end - index) / stepPercentage;

			// get direction of scroll
			const { deltaY } = event;
			const zoomIn = deltaY < 0;

			let newStart = Math.round(limits.start + stepStart);
			let newEnd = Math.round(limits.end - stepEnd);
			if (!zoomIn) {
				newStart = Math.round(limits.start - stepStart);
				newEnd = Math.round(limits.end + stepEnd);
			}

			// set new limits
			setNextLimits(newStart, newEnd);
		},
		[bisectDate, data, xScale, limits.end, limits.start, setNextLimits]
	);

	const handlePinch = useCallback(
		(event: MouseEvent | TouchEvent | PointerEvent, zoomIn: boolean) => {
			event.preventDefault();

			const { x } = localPoint(event) || { x: 0 };
			const x0 = xScale.invert(x);
			const index = bisectDate(data, x0, 1);

			// get step (10% of rest)
			const stepPercentage = 10;
			const stepStart = (index - limits.start) / stepPercentage;
			const stepEnd = (limits.end - index) / stepPercentage;

			let newStart = Math.round(limits.start + stepStart);
			let newEnd = Math.round(limits.end - stepEnd);
			if (!zoomIn) {
				newStart = Math.round(limits.start - stepStart);
				newEnd = Math.round(limits.end + stepEnd);
			}

			// set new limits
			setNextLimits(newStart, newEnd);
		},
		[bisectDate, data, xScale, limits.end, limits.start, setNextLimits]
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
		setLimits({ start: 0, end: data.length });
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
					handlePinch(event, zoomIn);
				}
			},
			onDragEnd: dragEnd,
			onWheel: ({ event, active }) => {
				if (!active) return;
				handleWheel(event);
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
					<clipPath id="clipPath">
						{displaySVG && <rect x={margin.left} y={margin.top} width={innerWidth} height={innerHeight} />}
					</clipPath>
				</defs>
				<g
					x={margin.left}
					y={margin.top}
					width={innerWidth}
					height={innerHeight}
					style={{ clipPath: "url(#clipPath)" }}
				>
					{lineTimeGradientOptions.display && (
						<LinearGradient
							id="area-gradient"
							from={lineTimeGradientOptions.from}
							to={lineTimeGradientOptions.to}
							toOpacity={lineTimeGradientOptions.opacity}
						/>
					)}

					{isLoaded && (
						<AreaClosed<D>
							data={data}
							x={(d) => xScale(getXAxisData(d)) ?? 0}
							y={(d) => yScale(getYAxisData(d)) ?? 0}
							yScale={yScale}
							fill="url(#area-gradient)"
							curve={curveMonotoneX}
							className={animate ? animationOptions.animationAreaClass : ""}
						/>
					)}

					{isLoaded && (
						<LinePath<D>
							data={data}
							x={(d: D) => xScale(getXAxisData(d)) ?? 0}
							y={(d: D) => yScale(getYAxisData(d)) ?? 0}
						>
							{({ path }) => {
								const d = path(data) || "";
								return (
									animate && (
										<path
											ref={refPathLine}
											d={d}
											fill={lineTimeOptions.fill}
											strokeWidth={lineTimeOptions.strokeWidth}
											stroke={lineTimeOptions.stroke}
											className={animationOptions.waitingLineClass}
										/>
									)
								);
							}}
						</LinePath>
					)}
				</g>

				{lineTimeRightAxisOptions.display && (
					<AxisRight
						scale={yScale}
						left={innerWidth + margin.left}
						strokeWidth={lineTimeRightAxisOptions.strokeWitdh}
						top={-1}
						stroke={lineTimeRightAxisOptions.stroke}
						tickStroke={lineTimeRightAxisOptions.tickStroke}
						tickLabelProps={lineTimeRightAxisOptions.label}
						axisClassName={animate ? animationOptions.animationRightAxisClass : ""}
						tickFormat={tickFormatY}
					/>
				)}
				{lineTimeBottomAxisOptions.display && (
					<AxisBottom<AxisScale>
						scale={xScale}
						top={height - margin.bottom - 1}
						strokeWidth={lineTimeBottomAxisOptions.strokeWitdh}
						stroke={lineTimeBottomAxisOptions.stroke}
						tickStroke={lineTimeBottomAxisOptions.tickStroke}
						tickLabelProps={lineTimeBottomAxisOptions.label}
						axisClassName={animate ? animationOptions.animationBottomAxisClass : ""}
						tickFormat={tickFormatX}
					/>
				)}
				{displaySVG && (
					<Bar
						x={margin.left}
						y={margin.top}
						width={innerWidth}
						height={innerHeight}
						fill="transparent"
						onTouchStart={handleTooltip}
						onTouchMove={handleTooltip}
						onMouseMove={handleTooltip}
						onMouseLeave={() => {
							hideTooltip();
						}}
					/>
				)}
				{tooltipData && lineTimeLineCursorOptions.display && (
					<g>
						<LineVisx
							from={{ x: tooltipLeft, y: margin.top }}
							to={{ x: tooltipLeft, y: innerHeight + margin.top }}
							pointerEvents="none"
							stroke={lineTimeLineCursorOptions.stroke}
							strokeWidth={lineTimeLineCursorOptions.strokeWidth}
							strokeDasharray={lineTimeLineCursorOptions.strokeDasharray}
						/>

						<circle
							cx={tooltipLeft}
							cy={tooltipTop ? tooltipTop + 1 : 0}
							pointerEvents="none"
							r={lineTimeCircleCursorOptions.r}
							stroke={lineTimeCircleCursorOptions.stroke}
							strokeWidth={lineTimeCircleCursorOptions.strokeWidth}
							strokeDasharray={lineTimeCircleCursorOptions.strokeDasharray}
							fill={lineTimeCircleCursorOptions.fill}
						/>
					</g>
				)}
			</svg>
			{tooltipData && lineTimeTooltipCursor.display && (
				<Tooltip
					top={tooltipTop ? tooltipTop - 12 : 0}
					left={tooltipLeft ? tooltipLeft + 12 : 0}
					style={lineTimeTooltipCursor.style}
				>
					{formatY(tooltipData)}
				</Tooltip>
			)}

			{tooltipData && lineTimeTooltipBottom.display && (
				<Tooltip
					top={height - margin.bottom}
					left={tooltipLeft ? tooltipLeft - 8 : 0}
					style={lineTimeTooltipBottom.style}
				>
					{formatX(tooltipData)}
				</Tooltip>
			)}

			{dataLast && lineTimeTooltipFixed.display && (
				<Tooltip top={dataLast.y} left={innerWidth + 1} style={lineTimeTooltipFixed.style}>
					<div className="relative">
						<span style={lineTimeTooltipFixed.styleDash}></span>
						{Math.round(dataLast.data)}
					</div>
				</Tooltip>
			)}
		</div>
	);
}

export const LineTime = function <T>({ maxHeight = 500, ...rest }: LineTimeProps<T> & { maxHeight?: number }) {
	return (
		<ParentSize>
			{(parent) => {
				const height = Math.min(parent.height, maxHeight!);
				return <ChartLine<T> width={parent.width} height={height} {...rest} />;
			}}
		</ParentSize>
	);
};
