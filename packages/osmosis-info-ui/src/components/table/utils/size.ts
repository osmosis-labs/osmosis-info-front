import { ColumnConfiguration } from "../types";

export type ColumnSize = {
	minWidth: number;
	flex?: number;
	maxWidth?: number;
	key: string;
};

export type CalculeSizesProps = {
	totalWidth: number | null;
	columnsSize: ColumnSize[];
};

export const calculeSizes = ({ totalWidth, columnsSize }: CalculeSizesProps) => {
	// To calcule size we use this alogrithm: https://www.w3.org/TR/css-flexbox-1/#resolve-flexible-lengths
	// We juste have minWith, maxWith, flex
	const res: Record<ColumnSize["key"], number> = {};

	if (!totalWidth) {
		columnsSize.forEach((columnsSize) => {
			res[columnsSize.key] = columnsSize.minWidth;
		});
		return res;
	}

	const columns: {
		all: Record<ColumnSize["key"], { columnSize: ColumnSize; freezed: boolean; size: number }>;
		flex: Record<ColumnSize["key"], { columnSize: ColumnSize; freezed: boolean; size: number }>;
		frozenKey: ColumnSize["key"][];
		toFreeze: (key: ColumnSize["key"]) => void;
		setSize: (key: ColumnSize["key"], size: number) => void;
	} = {
		all: {},
		flex: {},
		frozenKey: [],
		toFreeze: (key: ColumnSize["key"]) => {
			const column = columns.all[key];
			if (column && column.freezed !== true) {
				columns.all[key].freezed = true;
				columns.flex[key].freezed = true;
				columns.frozenKey.push(key);
			}
		},
		setSize: (key: ColumnSize["key"], size: number) => {
			const column = columns.all[key];
			if (column) {
				columns.all[key].size = size;
				columns.flex[key].size = size;
			}
		},
	};

	let usedSpace = 0;
	let totalFlexUnits = 0;

	// initialize state with default values and freezed values
	columnsSize.forEach((columnSize: ColumnSize) => {
		const column = {
			columnSize: columnSize,
			freezed: false,
			size: 0,
		};
		column.size = columnSize.minWidth;
		if (!columnSize.flex) {
			// need to be freezed
			column.freezed = true;
			usedSpace += column.size;
			columns.frozenKey.push(columnSize.key);
		} else {
			totalFlexUnits += columnSize.flex;
			columns.flex[columnSize.key] = { ...column, columnSize };
		}

		columns.all[columnSize.key] = column;
	});

	const remainingFlexFreeSpace = totalWidth - usedSpace;

	// Loop to define size of flex columns
	const loopCalculSizeFlexColumns = () => {
		// if all columns are freezed return, it's finished
		if (columns.frozenKey.length === columnsSize.length) return;

		let remainingFreeSpace = remainingFlexFreeSpace;

		let flexUnits = totalFlexUnits;

		// Calcul the remaining free space and flex units
		columns.frozenKey.forEach((key) => {
			if (columns.all[key].columnSize.flex) {
				remainingFreeSpace -= columns.all[key].size;
				flexUnits -= columns.all[key].columnSize.flex!;
			}
		});

		let totalViolation = 0;
		const violationsLookup: {
			min: Record<ColumnConfiguration["key"], boolean>;
			max: Record<ColumnConfiguration["key"], boolean>;
		} = { min: {}, max: {} };

		Object.keys(columns.flex).forEach((key) => {
			const column = columns.flex[key];
			if (column.freezed) return;
			const widthPerFlexUnit = remainingFreeSpace / flexUnits;

			let width = Math.floor(widthPerFlexUnit * column.columnSize.flex!);

			// check size violations
			if (width < column.columnSize.minWidth) {
				totalViolation += column.columnSize.minWidth - width;
				width = column.columnSize.minWidth;
				violationsLookup.min[key] = true;
			} else if (column.columnSize.maxWidth && width > column.columnSize.maxWidth) {
				totalViolation += column.columnSize.maxWidth - width;
				width = column.columnSize.maxWidth;
				violationsLookup.max[key] = true;
			}

			columns.setSize(key, width);
		});

		// Check size violations and freeze columns
		if (totalViolation < 0) {
			// Freeze all the items with max violations
			Object.keys(violationsLookup.max).forEach((key) => {
				columns.toFreeze(key);
			});
		} else if (totalViolation > 0) {
			// Freeze all the items with min violations
			Object.keys(violationsLookup.min).forEach((key) => {
				columns.toFreeze(key);
			});
		} else {
			// Freeze all items
			Object.keys(columns.flex).forEach((key) => {
				columns.toFreeze(key);
			});
		}
		loopCalculSizeFlexColumns();
	};

	loopCalculSizeFlexColumns();

	Object.keys(columns.all).forEach((key) => {
		res[key] = columns.all[key].size;
	});

	return res;
};
