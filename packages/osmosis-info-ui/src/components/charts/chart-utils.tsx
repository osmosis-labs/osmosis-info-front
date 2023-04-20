import { Limits } from "./bar/bar-time-config";

export const zoomInIndex = (limits: Limits, data: any[], index: number, zoomIn: boolean): Limits => {
	const { start, end } = limits;
	const nbItems = end - start;

	//No need to zoom in if there is only one item
	if (nbItems < 1 && zoomIn) return { start, end };
	const zoomPercentage = 0.1;

	// set step to 10%
	const step = Math.max(1, nbItems * zoomPercentage);

	let stepStart, stepEnd;
	if (nbItems === 0) {
		// it's zoom out
		stepStart = 1;
		stepEnd = 1;
	} else {
		stepStart = Math.round(step * ((index - start) / nbItems));
		stepEnd = Math.round(step * ((end - index) / nbItems));
	}

	// zoom in index
	const stepStartAjusted = Math.max(0, stepStart);
	const stepEndAjusted = Math.max(0, stepEnd);

	let newStart, newEnd;
	if (zoomIn) {
		newStart = start + stepStartAjusted;
		newEnd = end - stepEndAjusted;
		if (newStart < 0) {
			const offsetToAdd = Math.abs(newStart);
			newStart = 0;
			if (newEnd - offsetToAdd > 0) {
				newEnd = newEnd - offsetToAdd;
			}
		}
		if (newEnd >= data.length) {
			const offsetToAdd = Math.abs(newEnd - data.length - 1);
			newEnd = data.length - 1;
			if (newStart + offsetToAdd < newEnd) {
				newStart = newStart + offsetToAdd;
			}
		}
	} else {
		newStart = start - stepStartAjusted;
		newEnd = end + stepEndAjusted;
		if (newStart < 0) {
			const offsetToAdd = Math.abs(newStart);
			newStart = 0;
			if (newEnd + offsetToAdd > 0) {
				newEnd = newEnd + offsetToAdd;
			}
		}
		if (newEnd >= data.length) {
			const offsetToAdd = Math.abs(newEnd - data.length - 1);
			newEnd = data.length - 1;
			if (newStart - offsetToAdd < newEnd) {
				newStart = newStart - offsetToAdd;
			}
		}
	}

	// check borns
	if (newStart < 0) newStart = 0;
	if (newEnd >= data.length) newEnd = data.length - 1;
	return { start: newStart, end: newEnd };
};

export const drag = (limits: Limits, data: any[], deltaX: number): Limits => {
	const { start, end } = limits;
	const toRight = deltaX > 0;
	let stepDrag = Math.round(Math.abs(deltaX / 3));
	let newStart = start,
		newEnd = end;

	if (toRight) {
		if (start > 0) {
			if (start - stepDrag < 0) {
				stepDrag = start;
			}
			newStart = start - stepDrag;
			newEnd = end - stepDrag;
		}
	} else {
		if (end < data.length) {
			if (end + stepDrag >= data.length) {
				stepDrag = data.length - 1 - end;
			}
			newStart = start + stepDrag;
			newEnd = end + stepDrag;
		}
	}
	return { start: newStart, end: newEnd };
};