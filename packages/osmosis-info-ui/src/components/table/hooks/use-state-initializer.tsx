import {
	ALIGMENT,
	DEFAULT_COLUMN_CONFIGURATION,
	DEFAULT_TABLE_CONFIGURATION,
	DENSITY,
	ROWS_PER_PAGE,
	ROW_HEIGHT,
	ROW_PER_PAGE,
	SORT,
	SORTABLE,
} from "../config";
import { ColumnState, RowState, TableConfiguration, TableState } from "../types";
import { calculeSizes } from "../utils/size";

export const useStateInitialize = (
	config: TableConfiguration
): { tableState: TableState; columnsState: ColumnState[]; rowState: RowState } => {
	const sizeColumns = calculeSizes(
		null,
		config.columns.filter((c) => !(c.hide ?? DEFAULT_COLUMN_CONFIGURATION.hide))
	);
	const columnsState: ColumnState[] = [];

	const density = config.density || DENSITY;

	const tableState: TableState = {
		density: density,
		currentPage: 0,
		displaySettings: config.displaySettings ?? DEFAULT_TABLE_CONFIGURATION.displaySettings,
		rowPerPage: config.rowPerPage ?? ROW_PER_PAGE,
		rowsPerPage: config.rowsPerPage ?? ROWS_PER_PAGE,
		orderBy: config.defaultOrderBy,
		orderDirection: config.defaultOrderDirection,
		width: 0,
	};
	const rowState: RowState = {
		height: config.rowHeight ?? ROW_HEIGHT,
	};

	config.columns.forEach((column) => {
		columnsState.push({
			key: column.key,
			display: column.display,
			hide: column.hide ?? DEFAULT_COLUMN_CONFIGURATION.hide,
			accessor: column.accessor ?? column.key,
			sorted: config.defaultOrderBy === column.key,
			orderDirection: config.defaultOrderBy === column.key ? config.defaultOrderDirection ?? null : null,
			width: sizeColumns[column.key],
			align: column.align || ALIGMENT,
			onSort: column.onSort ?? SORT,
			sortable: column.sortable || SORTABLE,
		});
	});
	return { tableState, columnsState, rowState };
};
