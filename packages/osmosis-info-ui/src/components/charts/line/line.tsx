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
import { withTooltip, Tooltip, defaultStyles, useTooltip } from "@visx/tooltip";
import { timeFormat } from "d3-time-format";
import { ParentSize } from "@visx/responsive";
import { useGesture } from "@use-gesture/react";
import { Point } from "@visx/zoom/lib/types";

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

const format = timeFormat("%b %d");

export type LineProps = {
	width?: number;
	height?: number;
	maxHeight?: number;
	margin?: { top: number; right: number; bottom: number; left: number };
};

//To do
// -Check up on mobile (drag, animation, zoom...)
// Responsive
// Animation path line
// Last tooltip data position
// Refactoring

const ChartLine = withTooltip(
	({ width = 800, height = 500, margin = { top: 30, right: 40, bottom: 40, left: 4 } }: LineProps) => {
		const [limits, setLimits] = useState({ start: 0, end: 0 });
		const displaySVG = width > 0;
		const refPathLine = useRef<SVGPathElement | null>(null);
		const [startPoint, setStartPoint] = useState<Point | undefined>(undefined);
		const refSVG = useRef<SVGSVGElement | null>(null);
		const [isDragging, setIsDragging] = useState(false);
		const [isLoaded, setIsLoaded] = useState(false);

		useEffect(() => {
			setLimits({ start: 0, end: data.length });
		}, []);

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
				path.classList.remove("wait-animation-line");
				path.classList.add("animation-line");
				const timer = window.setTimeout(() => {
					path.style.strokeDasharray = ``;
					path.style.strokeDashoffset = ` `;
				}, 1000);
				return () => {
					window.clearTimeout(timer);
				};
			}
			return;
		}, [refPathLine, isLoaded]);

		// const { containerRef } = useTooltipInPortal({
		// 	// use TooltipWithBounds
		// 	detectBounds: true,
		// 	// when tooltip containers are scrolled, this will correctly update the Tooltip position
		// 	scroll: true,
		// });

		const innerWidth = width - margin.left - margin.right;
		const innerHeight = height - margin.top - margin.bottom;
		const [animate, setAnimate] = useState(false);
		const refDrag = useRef<{ dragging: boolean; x: number; y: number }>({ dragging: false, x: 0, y: 0 });

		const [dataLast, setDataLast] = useState<{ x: number; y: number; data: number } | null>(null);

		const { tooltipData, tooltipLeft, tooltipTop, showTooltip, hideTooltip } = useTooltip<AppleStock>();

		useEffect(() => {
			if (displaySVG) setAnimate(true);
		}, [displaySVG]);

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
				const last = data[limits.end - 1];
				if (last) {
					setDataLast({ x: dateScale(new Date(last.date)), y: dataValueScale(last.close), data: last.close });
				}
			}
		}, [dataValueScale, dateScale, limits.end]);

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
				if (x < 0 || x > innerWidth) return;
				showTooltip({
					tooltipData: d,
					tooltipLeft: x,
					tooltipTop: dataValueScale(getStockValue(d)),
				});
				hover(d);
			},
			[dateScale, innerWidth, showTooltip, dataValueScale]
		);
		const onClickSvg = (event: MouseEvent) => {
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
				// updatePathLength();
			},
			[limits.end, limits.start]
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
			[limits.end, limits.start, setNextLimits]
		);

		const handleWheel = useCallback(
			(event: React.WheelEvent | WheelEvent) => {
				event.preventDefault();
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
			},
			[dateScale, limits.end, limits.start, setNextLimits]
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
			<div className="border-solid border-2 border-main-200 overflow-hidden">
				<svg width={width} height={height} ref={refSVG} className="relative">
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
						<LinearGradient id="area-gradient" from={"#f6e1b8"} to={"#140F34"} toOpacity={0.1} />

						{isLoaded && (
							<AreaClosed<AppleStock>
								data={data}
								x={(d) => dateScale(getDate(d)) ?? 0}
								y={(d) => dataValueScale(getStockValue(d)) ?? 0}
								yScale={dataValueScale}
								fill="url(#area-gradient)"
								curve={curveMonotoneX}
								className={animate ? "animation-area" : ""}
							/>
						)}

						{isLoaded && (
							<LinePath<AppleStock>
								data={data}
								x={(d: AppleStock) => dateScale(getDate(d)) ?? 0}
								y={(d: AppleStock) => dataValueScale(getStockValue(d)) ?? 0}
							>
								{({ path }) => {
									const d = path(data) || "";
									return (
										animate && (
											<path
												ref={refPathLine}
												d={d}
												fill="none"
												strokeWidth={2}
												stroke="#f6e1b8"
												className="wait-animation-line"
											/>
										)
									);
								}}
							</LinePath>
						)}
					</g>

					<AxisRight
						scale={dataValueScale}
						stroke={"#f6e1b8"}
						left={innerWidth + margin.left}
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
						top={height - margin.bottom - 1}
						tickLabelProps={() => {
							return {
								fill: "#f6e1b8",
								fontSize: 12,
								textAnchor: "middle",
							};
						}}
					/>
					{displaySVG && (
						<Bar
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
					)}
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
						left={innerWidth + 1}
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
							<span className="content-[''] block h-[2px] w-[6px] bg-[#f6e1b8] absolute top-[50%] left-[-3px] translate-x-[-100%] translate-y-[-50%]"></span>
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
