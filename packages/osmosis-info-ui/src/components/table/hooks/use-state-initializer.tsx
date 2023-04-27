import { DENSITY, DENSITY_FACTORS, ROWS_PER_PAGE, ROW_HEIGHT, ROW_PER_PAGE } from "../config";
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
		currentPage: 0,
		rowPerPage: config.rowPerPage || ROW_PER_PAGE,
		rowsPerPage: config.rowsPerPage || ROWS_PER_PAGE,
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
