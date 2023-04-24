import { DENSITY, DENSITY_FACTORS, ROW_HEIGHT } from "../config";
import { ColumnState, RowState, TableConfiguration, TableState } from "../types";
import { calculeSizes } from "../utils/size";

export const useStateInitialize = (
	config: TableConfiguration
): { tableState: TableState; columnsState: ColumnState[]; rowState: RowState } => {
	const sizeColumns = calculeSizes(null, config.columns);
	const columnsState: ColumnState[] = [];

	const density = config.density || DENSITY;
	const tableState: TableState = {
		density: density,
		rowPerPage: config.rowPerPage || 10,
		densityFactor: DENSITY_FACTORS[density],
	};
	const rowState: RowState = {
		height: config.rowHeight || ROW_HEIGHT,
	};
	config.columns.forEach((column) => {
		columnsState.push({
			order: null,
			key: column.key,
			sorted: false,
			width: sizeColumns[column.key],
		});
	});
	return { tableState, columnsState, rowState };
};
