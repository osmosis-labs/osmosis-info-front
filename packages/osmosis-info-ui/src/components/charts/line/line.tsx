import React, { useMemo, useCallback, useState, useEffect, useRef } from "react";
import { AreaClosed, LinePath, Line as LineVisx, Bar } from "@visx/shape";
import { AppleStock } from "@visx/mock-data/lib/mocks/appleStock";
import { appleStock } from "@visx/mock-data/";
import { curveMonotoneX } from "@visx/curve";
import { scaleTime, scaleLinear } from "@visx/scale";
import { localPoint } from "@visx/event";
import { LinearGradient } from "@visx/gradient";
import { max, extent, bisector } from "d3-array";
import { AxisRight, AxisBottom } from "@visx/axis";
import { withTooltip, Tooltip, defaultStyles, useTooltipInPortal, useTooltip } from "@visx/tooltip";
import { timeFormat } from "d3-time-format";
import { ParentSize } from "@visx/responsive";
// TO DO
// Responsive
// Animation
// Refactoring
const data = appleStock.slice(800);
export const background = "#fff";
export const background2 = "#ff00ff";
export const accentColor = "#edffea";
export const accentColorDark = "#75daad";
const tooltipStyles = {
	...defaultStyles,
	background: "#140F34",
	border: "1px solid #f6e1b8",
	color: "#f6e1b8",
	borderRadius: "3px",
	boxShadow: "0 0 10px rgba(33,33,33,0.2)",
	padding: "4px 6px",
};

console.log("%cline.tsx -> 31 BLUE: tooltipStyles", "background: #2196f3; color:#FFFFFF", tooltipStyles);

// accessors
const getDate = (d: AppleStock) => new Date(d.date);
const getStockValue = (d: AppleStock) => d.close;
const bisectDate = bisector<AppleStock, Date>((d) => new Date(d.date)).left;
const hover = (d: AppleStock) => {
	console.log("%cline.tsx -> 22 ORANGE:HOVER d", "background: #607d8b; color:#FFFFFF", d);
};
const click = (d: AppleStock) => {
	console.log("%cline.tsx -> 25 ORANGE: CLICK d", "background: #607d8b; color:#FFFFFF", d);
};

// const parseDate = timeParse("%Y-%m-%d");
const format = timeFormat("%b %d");
// const formatDate = (date: string) => {
// 	return format(parseDate(date) as Date);
// };

export type LineProps = {
	width?: number;
	height?: number;
	maxHeight?: number;
	margin?: { top: number; right: number; bottom: number; left: number };
};

//To do
// -Set the zoom step according to the remaining elements
// -Fix stroke of line (when it's zooomed)
// -Check up on mobile (drag, animation, zoom...)

const ChartLine = withTooltip(
	({ width = 800, height = 500, margin = { top: 30, right: 40, bottom: 40, left: 4 } }: LineProps) => {
		const [limits, setLimits] = useState({ start: 0, end: 0 });
		const refLineChart = useRef<SVGGElement | null>(null);
		const [pathLength, setPathLength] = useState(0);
		useEffect(() => {
			setLimits({ start: 0, end: data.length });
		}, []);

		const updatePathLength = useCallback(() => {
			if (refLineChart && refLineChart.current) {
				if (refLineChart.current.children.length > 1) {
					const pathElement = refLineChart.current.children[1] as SVGPathElement;
					const pathLength = pathElement.getTotalLength();
					setPathLength(pathLength);
				}
			}
		}, []);

		useEffect(() => {
			updatePathLength();
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [updatePathLength, refLineChart.current]);

		const innerWidth = width - margin.left - margin.right;
		const innerHeight = height - margin.top - margin.bottom;
		const [animate, setAnimate] = useState(false);
		const refDrag = useRef<{ dragging: boolean; x: number; y: number }>({ dragging: false, x: 0, y: 0 });

		const [dataLast, setDataLast] = useState<{ x: number; y: number; data: number } | null>(null);

		const { tooltipData, tooltipLeft, tooltipTop, showTooltip, hideTooltip } = useTooltip<AppleStock>();
		const { containerRef } = useTooltipInPortal({
			// use TooltipWithBounds
			detectBounds: true,
			// when tooltip containers are scrolled, this will correctly update the Tooltip position
			scroll: true,
		});
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
				updatePathLength();
			},
			[limits.end, limits.start, updatePathLength]
		);

		const onDrag = useCallback(
			(event: MouseEvent) => {
				const diff = event.clientX - refDrag.current.x;
				const toRight = diff > 0;
				let paddingDrag = 5;
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
			[limits.end, limits.start, setNextLimits]
		);

		const onMouseDown = (event: React.MouseEvent<SVGElement>) => {
			event.preventDefault();
			refDrag.current = { dragging: true, x: event.clientX, y: event.clientY };
		};

		const onMouseUp = useCallback(() => {
			refDrag.current = { dragging: false, x: 0, y: 0 };
		}, []);

		const onMouseLeave = useCallback(() => {
			refDrag.current = { dragging: false, x: 0, y: 0 };
		}, []);
		const onMouseMove = useCallback(
			(event: MouseEvent) => {
				if (refDrag.current.dragging) {
					onDrag(event);
				}
			},
			[onDrag]
		);

		useEffect(() => {
			setAnimate(true);
			document.addEventListener("mousemove", onMouseMove);
			document.addEventListener("mouseleave", onMouseLeave);
			document.addEventListener("mouseup", onMouseUp);
			return () => {
				document.removeEventListener("mousemove", onMouseMove);
				document.removeEventListener("mouseleave", onMouseLeave);
				document.removeEventListener("mouseup", onMouseUp);
			};
		}, [onMouseMove, onMouseLeave, onMouseUp]);

		// scales
		const dateScale = useMemo(() => {
			let zoomedStock = data;

			zoomedStock = data.slice(limits.start, limits.end);

			return scaleTime({
				range: [margin.left, innerWidth + margin.left],
				domain: extent(zoomedStock, getDate) as [Date, Date],
			});
		}, [innerWidth, margin.left, limits]);
		const dataValueScale = useMemo(
			() =>
				scaleLinear({
					range: [innerHeight + margin.top, margin.top],
					domain: [0, (max(data, getStockValue) || 0) + innerHeight / 3],
					nice: true,
				}),
			[margin.top, innerHeight]
		);

		useEffect(() => {
			if (data && data.length > 0) {
				const last = data[data.length - 1];
				setDataLast({ x: dateScale(new Date(last.date)), y: dataValueScale(last.close), data: last.close });
			}
		}, [dataValueScale, dateScale]);

		const handleTooltip = useCallback(
			(event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
				const { x } = localPoint(event) || { x: 0 };
				const x0 = dateScale.invert(x);
				const index = bisectDate(data, x0, 1);
				const d0 = data[index - 1];
				const d1 = data[index];
				let d = d0;
				if (d1 && getDate(d1)) {
					d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
				}
				showTooltip({
					tooltipData: d,
					tooltipLeft: x,
					tooltipTop: dataValueScale(getStockValue(d)),
				});
				hover(d);
			},
			[showTooltip, dataValueScale, dateScale]
		);
		const onClickSvg = (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
			const { x } = localPoint(event) || { x: 0 };
			const x0 = dateScale.invert(x);
			const index = bisectDate(data, x0, 1);
			const d0 = data[index - 1];
			const d1 = data[index];
			let d = d0;
			if (d1 && getDate(d1)) {
				d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
			}
			click(d);
		};

		const onWheel = (event: React.WheelEvent<SVGElement>) => {
			// get current point of mouse position
			const { x } = localPoint(event) || { x: 0 };
			const x0 = dateScale.invert(x);
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
		};

		return (
			<div className="border-solid border-2 border-main-200">
				<svg
					width={width}
					height={height}
					ref={containerRef}
					className="relative"
					onWheel={onWheel}
					onMouseDown={onMouseDown}
				>
					<defs>
						<clipPath id="clipPath">
							<rect x={margin.left} y={margin.top} width={innerWidth} height={innerHeight} />
						</clipPath>
					</defs>
					<g
						x={margin.left}
						y={margin.top}
						width={innerWidth}
						height={innerHeight}
						style={{ clipPath: "url(#clipPath)" }}
						ref={refLineChart}
					>
						<LinearGradient id="area-gradient" from={"#f6e1b8"} to={"#140F34"} toOpacity={0.1} />

						<AreaClosed<AppleStock>
							data={data}
							x={(d) => dateScale(getDate(d)) ?? 0}
							y={(d) => dataValueScale(getStockValue(d)) ?? 0}
							yScale={dataValueScale}
							strokeWidth={2}
							stroke="url(#area-gradient)"
							fill="url(#area-gradient)"
							curve={curveMonotoneX}
							className={animate ? "animation-area" : ""}
						/>
						<LinePath<AppleStock>
							data={data}
							x={(d: AppleStock) => dateScale(getDate(d)) ?? 0}
							y={(d: AppleStock) => dataValueScale(getStockValue(d)) ?? 0}
							strokeWidth={2}
							stroke="#f6e1b8"
							style={{
								strokeDasharray: 4 * pathLength,
								strokeDashoffset: 4 * pathLength,
							}}
							className={animate ? "animation-line" : ""}
							curve={curveMonotoneX}
						/>
					</g>

					<AxisRight
						scale={dataValueScale}
						stroke={"#f6e1b8"}
						left={width - margin.right + 1}
						top={-1}
						tickStroke={"#f6e1b8"}
						tickLabelProps={() => {
							return {
								fill: "#f6e1b8",
								fontSize: 12,
								verticalAnchor: "middle",
							};
						}}
						axisClassName={animate ? "animation-area" : ""}
					/>
					<AxisBottom
						axisClassName={animate ? "animation-area" : ""}
						scale={dateScale}
						tickStroke={"#f6e1b8"}
						stroke={"#f6e1b8"}
						top={height - margin.bottom}
						tickLabelProps={() => {
							return {
								fill: "#f6e1b8",
								fontSize: 12,
								textAnchor: "middle",
							};
						}}
					/>
					<Bar
						onClick={onClickSvg}
						x={margin.left}
						y={margin.top}
						width={innerWidth}
						height={innerHeight}
						fill="transparent"
						rx={14}
						onTouchStart={handleTooltip}
						onTouchMove={handleTooltip}
						onMouseMove={handleTooltip}
						onMouseLeave={() => {
							hideTooltip();
						}}
					/>
					{tooltipData && (
						<g>
							<LineVisx
								from={{ x: tooltipLeft, y: margin.top }}
								to={{ x: tooltipLeft, y: innerHeight + margin.top }}
								stroke={"#f6e1b8"}
								strokeWidth={2}
								pointerEvents="none"
								strokeDasharray="5,2"
							/>

							<circle
								cx={tooltipLeft}
								cy={tooltipTop ? tooltipTop + 1 : 0}
								r={4}
								stroke={"#f6e1b8"}
								strokeWidth={2}
								pointerEvents="none"
							/>
						</g>
					)}
				</svg>
				{tooltipData && (
					<Tooltip
						top={tooltipTop ? tooltipTop - 12 : 0}
						left={tooltipLeft ? tooltipLeft + 12 : 0}
						style={tooltipStyles}
					>
						{`$${tooltipData.close}`}
					</Tooltip>
				)}

				{tooltipData && (
					<Tooltip
						top={height - margin.bottom}
						left={tooltipLeft ? tooltipLeft - 8 : 0}
						style={{
							...tooltipStyles,
							translate: "-50%",
						}}
					>
						{format(new Date(tooltipData?.date ?? ""))}
					</Tooltip>
				)}

				{dataLast && (
					<Tooltip
						top={dataLast.y}
						left={innerWidth}
						style={{
							position: "absolute",
							textAlign: "center",
							fontSize: 12,
							background: "#f6e1b8",
							padding: "2px 4px 0px 4px",
							color: "#140F34",
							translate: "0 -100%",
						}}
					>
						<div className="relative">
							<span className="content-[''] block h-[2px] w-[6px] bg-[#f6e1b8] absolute top-[50%] left-[-4px] translate-x-[-100%] translate-y-[-50%]"></span>
							{Math.round(dataLast.data)}
						</div>
					</Tooltip>
				)}
			</div>
		);
	}
);

export const Line = ({ maxHeight = 500 }: LineProps) => {
	return (
		<ParentSize>
			{(parent) => {
				const height = Math.min(parent.height, maxHeight);
				return <ChartLine width={parent.width} height={height} />;
			}}
		</ParentSize>
	);
};
