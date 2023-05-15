export function findInArray<T>(array: T[], key: string, field = "key") {
	return array.find((item: any) => item[field] === key);
}

export function clamp(value: number, lower: number, upper: number): number {
	return Math.max(Math.min(value, upper), lower);
}

export function swap<T>(array: T[], moveIndex: number, toIndex: number): T[] {
	const item = array[moveIndex];
	const length = array.length;
	const diff = moveIndex - toIndex;

	if (diff > 0) {
		// move left
		return [
			...array.slice(0, toIndex),
			item,
			...array.slice(toIndex, moveIndex),
			...array.slice(moveIndex + 1, length),
		];
	} else if (diff < 0) {
		// move right
		const targetIndex = toIndex + 1;
		return [
			...array.slice(0, moveIndex),
			...array.slice(moveIndex + 1, targetIndex),
			item,
			...array.slice(targetIndex, length),
		];
	}
	return array;
}

export function reorderArray<T>(array: T[], order: number[]): T[] {
	return order.map((index) => array[index]);
}
