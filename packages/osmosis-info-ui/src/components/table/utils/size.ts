import { ColumnConfiguration, ColumnConfigurationWidthFlex, ColumnConfigurationWidthMinWitdh } from "../types";

export const calculeSizes = (totalWidth: number | null, columnsConfigs: ColumnConfiguration[]) => {
	// To calcule size we use this alogrithm: https://www.w3.org/TR/css-flexbox-1/#resolve-flexible-lengths
	// We juste have minWith, maxWith, flex
	const res: Record<ColumnConfigurationWidthMinWitdh["key"], number> = {};
	const defaultMinWidth = 100;
	const columnsWithDefaultValues: ColumnConfigurationWidthMinWitdh[] = columnsConfigs.map((c) => {
		res[c.key] = c.minWidth || defaultMinWidth;
		if (c.minWidth) return c as ColumnConfigurationWidthMinWitdh;
		else return { ...c, minWidth: defaultMinWidth };
	});
	if (!totalWidth) {
		return res;
	}

	const columns: {
		all: Record<
			ColumnConfigurationWidthMinWitdh["key"],
			{ configuration: ColumnConfigurationWidthMinWitdh; freezed: boolean; size: number }
		>;
		flex: Record<
			ColumnConfigurationWidthFlex["key"],
			{ configuration: ColumnConfigurationWidthFlex; freezed: boolean; size: number }
		>;
		frozenKey: ColumnConfigurationWidthMinWitdh["key"][];
		toFreeze: (key: ColumnConfigurationWidthMinWitdh["key"]) => void;
		setSize: (key: ColumnConfigurationWidthMinWitdh["key"], size: number) => void;
	} = {
		all: {},
		flex: {},
		frozenKey: [],
		toFreeze: (key: ColumnConfigurationWidthMinWitdh["key"]) => {
			const column = columns.all[key];
			if (column && column.freezed !== true) {
				columns.all[key].freezed = true;
				columns.flex[key].freezed = true;
				columns.frozenKey.push(key);
			}
		},
		setSize: (key: ColumnConfigurationWidthMinWitdh["key"], size: number) => {
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
	columnsWithDefaultValues.forEach((config: ColumnConfigurationWidthMinWitdh) => {
		const column = {
			configuration: config,
			freezed: false,
			size: 0,
		};
		column.size = config.minWidth || defaultMinWidth;
		if (!config.flex) {
			// need to be freezed
			column.freezed = true;
			usedSpace += column.size;
			columns.frozenKey.push(config.key);
		} else {
			totalFlexUnits += config.flex;
			columns.flex[config.key] = { ...column, configuration: config as ColumnConfigurationWidthFlex };
		}

		columns.all[config.key] = column;
	});

	const remainingFlexFreeSpace = totalWidth - usedSpace;

	// Loop to define size of flex columns
	const loopCalculSizeFlexColumns = () => {
		// if all columns are freezed return, it's finished
		if (columns.frozenKey.length === columnsConfigs.length) return;

		let remainingFreeSpace = remainingFlexFreeSpace;

		let flexUnits = totalFlexUnits;

		// Calcul the remaining free space and flex units
		columns.frozenKey.forEach((key) => {
			if (columns.all[key].configuration.flex) {
				remainingFreeSpace -= columns.all[key].size;
				flexUnits -= columns.all[key].configuration.flex!;
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

			let width = Math.floor(widthPerFlexUnit * column.configuration.flex!);

			// check size violations
			if (width < column.configuration.minWidth) {
				totalViolation += column.configuration.minWidth - width;
				width = column.configuration.minWidth;
				violationsLookup.min[key] = true;
			} else if (column.configuration.maxWidth && width > column.configuration.maxWidth) {
				totalViolation += column.configuration.maxWidth - width;
				width = column.configuration.maxWidth;
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
