import { scaleBand, scaleLinear } from "@visx/scale";
import { extent, max } from "d3-array";
import { Margin } from "../line/line-time-config";

export const defaultBarTimeMargin = {
	top: 30,
	right: 70,
	bottom: 60,
	left: 30,
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
