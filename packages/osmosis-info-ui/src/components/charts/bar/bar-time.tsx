import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { ParentSize } from "@visx/responsive";
import { Margin } from "../line/line-time-config";
import { defaultBarTimeMargin, getXScale, getYScale } from "./bar-time-config";
import { Bar } from "@visx/shape";
import { AxisBottom, AxisRight } from "@visx/axis";
import { Point } from "@visx/zoom/lib/types";
import { localPoint } from "@visx/event";
import { useTooltip } from "@visx/tooltip";
import { useGesture } from "@use-gesture/react";
import { bisect } from "d3-array";

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
}: BarTimeProps<D>) {
	const refSVG = useRef<SVGSVGElement | null>(null);
	const [limits, setLimits] = useState({ start: 0, end: 0 });
	const [startPoint, setStartPoint] = useState<Point | undefined>(undefined);
	const [isDragging, setIsDragging] = useState(false);

	const displaySVG = width > 0;

	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	useEffect(() => {
		setLimits({ start: 0, end: data.length });
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
		return getYScale<D>({ innerHeight, margin, data, getYAxisData });
	}, [innerHeight, margin, data, getYAxisData]);

	const nbTicksX = useMemo(() => {
		const paddingLabel = 10;
		const width = getTextWidth(getXAxisData(data[0]), "12px") + paddingLabel;
		return Math.floor(innerWidth / width);
	}, [data, getXAxisData, innerWidth]);

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
			const index = xScale.domain().findIndex((d) => x >= xScale(d)! && x <= xScale(d)! + xScale.bandwidth());
			if (index < 0 || index >= data.length) {
				return Math.floor(x / xScale.step());
			}
			return index;
		},
		[data.length, xScale]
	);

	const handleTooltip = useCallback(
		(event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
			const { x } = localPoint(event) || { x: 0 };
			const index = Math.floor(x / xScale.step());
			const d = data[index];

			if (x < 0 || x > innerWidth) return;
			showTooltip({
				tooltipData: d,
				tooltipLeft: x,
				tooltipTop: yScale(getYAxisData(d)),
			});
			// if (onHover && d) onHover(d as D);
		},
		[xScale, data, innerWidth, showTooltip, yScale, getYAxisData]
	);

	const onClickSvg = (event: MouseEvent) => {
		// if (onClick) {
		const { x } = localPoint(event) || { x: 0 };
		const index = Math.round(x / xScale.step());
		const d = data[index];
		console.log("bar-time.tsx -> 112: d", d);
		// onClick(d);
		// }
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

	const calculNextLimits = useCallback(
		(limits: { start: number; end: number }, data: any[], index: number, zoomIn: boolean) => {
			console.log(`╔════════════════════════════════════`);

			// Increment the zoom according to the number of elements
			const items = limits.end - limits.start;
			const zoomIncrement = Math.max(2, Math.floor(items * 0.1)); // percentage of items to zoom and increment minumum by 2
			console.log(`╠══> index: ${index}, start: ${limits.start}, end: ${limits.end}, items: ${items} `);

			// Get ratio in function of position of index
			const ratioLeft = (index - limits.start) / items;
			const ratioRight = (limits.end - index) / items;
			console.log(`╠══> ratioLeft: ${ratioLeft}, ratioRight: ${ratioRight}`);

			const stepStart = Math.round(ratioLeft * zoomIncrement);
			const stepEnd = Math.round(ratioRight * zoomIncrement);

			let newStart = Math.round(limits.start + stepStart);
			let newEnd = Math.round(limits.end - stepEnd);
			if (!zoomIn) {
				newStart = Math.round(limits.start - stepStart);
				newEnd = Math.round(limits.end + stepEnd);
			}
			console.log(`╠══> 1 - stepStart: ${stepStart}, stepEnd: ${stepEnd}`);

			if (newStart < 0) newStart = 0;
			if (newEnd > data.length) newEnd = data.length;
			if (newStart > newEnd) newStart = limits.start;
			if (newEnd < newStart) newEnd = limits.end;

			console.log(`╠══> newStart: ${newStart}, newEnd: ${newEnd}`);
			console.log(`╚════════════════════════════════════`);
			return { start: newStart, end: newEnd };
		},
		[]
	);

	const onZoom = useCallback(
		(event: React.WheelEvent | WheelEvent | MouseEvent | TouchEvent | PointerEvent, zoomIn: boolean) => {
			event.preventDefault();
			if (data.length < 2) return;
			const index = findIndex(event);

			/* 
			
			// 
			*/

			/**
			 * TO DO:
			 * - Create a function that zoom or dezoom on the index. This fonction takes limits as object, data as array, index as number and zoomIn as boolean.
			 * - Increment the zoom according to the number of elements
			 * - Change direction of zoom:
			 * 		if zoomIn is true:
			 * 			zoom in : add to limits.start, reduce limits.end.
			 * 		else:
			 * 			zoom out: reduce limits.start, add to limits.end.
			 * - If a limit approaches its boundary, then put it at its boundary and the rest add it to the other limit
			 * - Check if the following limits are within the limits:
			 * 		- start <= 0
			 * 		- end >= data.length
			 *  	- start > end
			 */

			const nextLimits = calculNextLimits(limits, data, index, zoomIn);

			setLimits(nextLimits);
		},
		[calculNextLimits, data, findIndex, limits]
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
						<rect x={margin.left} y={margin.top} width={innerWidth} height={innerHeight} />
					</clipPath>
				</defs>
				{displaySVG && (
					<g
						x={margin.left}
						y={margin.top}
						width={innerWidth}
						height={innerHeight}
						// style={{ clipPath: "url(#clipPathBar)" }}
					>
						{data.map((d) => {
							const x = getXAxisData(d);
							const y = getYAxisData(d);

							const barWidth = xScale.bandwidth();
							const barHeight = innerHeight - (yScale(y) ?? 0);
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
									fill={"#aaFaFa"}
								/>
							);
						})}
					</g>
				)}
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
				<AxisRight
					scale={yScale}
					left={innerWidth + margin.left}
					strokeWidth={1}
					top={-1}
					tickStroke="#ffffff"
					stroke="#ffffff"
					tickLabelProps={() => ({
						fill: "#ffffff",
						fontSize: 12,
						verticalAnchor: "middle",
					})}
				/>
				<AxisBottom
					numTicks={nbTicksX}
					top={height - margin.bottom}
					scale={xScale}
					tickStroke="#ffffff"
					stroke="#ffffff"
					tickLabelProps={() => ({
						fill: "#ffffff",
						fontSize: 11,
						verticalAnchor: "middle",
						textAnchor: "middle",
					})}
				/>
			</svg>
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
