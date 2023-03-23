import React, { useMemo, useCallback, useState, useEffect, useRef } from "react";
import { AreaClosed, LinePath, Line as LineVisx, Bar } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { localPoint } from "@visx/event";
import { LinearGradient } from "@visx/gradient";
import { AxisRight, AxisBottom } from "@visx/axis";
import { Tooltip, useTooltip } from "@visx/tooltip";
import { timeFormat } from "d3-time-format";
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

const format = timeFormat("%b %d");

/*
TO DO somes tests
TO DO Check on mobile
TO DO add personnalization of Formatters
TO DO add documentation
TO DO use composition pattern to improve performance (ex for axies)
*/
export type LineTimeProps<D> = {
	width?: number;
	height?: number;
	maxHeight?: number;
	margin?: Margin;
	data: D[];
	onClick?: (d: D) => void;
	onHover?: (d: D) => void;
	getXAxisData: (d: D) => Date;
	getYAxisData: (d: D) => number;
	bisectDate: (array: ArrayLike<D>, x: Date, lo?: number | undefined, hi?: number | undefined) => number;
	lineTimeGradientOptions?: LineTimeGradientOptions;
	animationOptions?: AnimationOptions;
	lineTimeOptions?: LineTimeOptions;
	lineTimeRightAxisOptions?: LineTimeAxisOptions;
	lineTimeBottomAxisOptions?: LineTimeAxisOptions;
	lineTimeLineCursorOptions?: LineTimeLineCursorOptions;
	lineTimeCircleCursorOptions?: LineTimeCircleCursorOptions;
	lineTimeTooltipFixed?: LineTimeTooltipFixed;
	lineTimeTooltipCursor?: LineTimeTooltip;
	lineTimeTooltipBottom?: LineTimeTooltip;
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
	const defaultScaleX = useMemo(() => {
		let zoomedStock = data;
		zoomedStock = data.slice(limits.start, limits.end);
		return getXScale<D>({ innerWidth, margin, data: zoomedStock, getXAxisData });
	}, [data, limits.start, limits.end, margin, innerWidth, getXAxisData]);

	const xScale = /*scaleX??*/ defaultScaleX;
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
			const toRight = dx > 0;
			let paddingDrag = Math.round(Math.abs(dx / 3));
			if (toRight) {
				if (limits.start > 0) {
					if (limits.start - paddingDrag < 0) {
						paddingDrag = paddingDrag - limits.start;
					}
					setNextLimits(limits.start - paddingDrag, limits.end - paddingDrag);
				}
			} else {
				if (limits.end <= data.length) {
					if (limits.end + paddingDrag > data.length) {
						paddingDrag = data.length - limits.end;
					}
					setNextLimits(limits.start + paddingDrag, limits.end + paddingDrag);
				}
			}
		},
		[data.length, limits.end, limits.start, setNextLimits]
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
					dragEnd();
				} else if (!(event instanceof KeyboardEvent)) {
					dragMove(event);
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
		<div className="relative">
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
					/>
				)}
				{lineTimeBottomAxisOptions.display && (
					<AxisBottom
						scale={xScale}
						strokeWidth={lineTimeBottomAxisOptions.strokeWitdh}
						top={height - margin.bottom - 1}
						stroke={lineTimeBottomAxisOptions.stroke}
						tickStroke={lineTimeBottomAxisOptions.tickStroke}
						tickLabelProps={lineTimeBottomAxisOptions.label}
						axisClassName={animate ? animationOptions.animationBottomAxisClass : ""}
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
					{`$${getYAxisData(tooltipData)}`}
				</Tooltip>
			)}

			{tooltipData && lineTimeTooltipBottom.display && (
				<Tooltip
					top={height - margin.bottom}
					left={tooltipLeft ? tooltipLeft - 8 : 0}
					style={lineTimeTooltipBottom.style}
				>
					{format(new Date(getXAxisData(tooltipData) ?? ""))}
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
