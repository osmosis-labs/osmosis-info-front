import {
	DEFAULT_COLUMN_CONFIGURATION,
	DEFAULT_TABLE_CONFIGURATION,
	Filter,
	ROW_HEIGHT,
	SORT,
	onFilter,
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

	const density = config.density || DEFAULT_TABLE_CONFIGURATION.density;

	const tableState: TableState = {
		density: density,
		currentPage: 0,
		displaySettings: config.displaySettings ?? DEFAULT_TABLE_CONFIGURATION.displaySettings,
		rowPerPage: config.rowPerPage ?? DEFAULT_TABLE_CONFIGURATION.rowPerPage,
		rowsPerPage: config.rowsPerPage ?? DEFAULT_TABLE_CONFIGURATION.rowsPerPage,
		orderBy: config.defaultOrderBy,
		orderDirection: config.defaultOrderDirection,
		width: 0,
	};
	const rowState: RowState = {
		height: config.rowHeight ?? ROW_HEIGHT,
	};

	config.columns.forEach((column) => {
		const filterable = column.filterable || DEFAULT_COLUMN_CONFIGURATION.filterable;
		columnsState.push({
			key: column.key,
			display: column.display,
			hide: column.hide ?? DEFAULT_COLUMN_CONFIGURATION.hide,
			accessor: column.accessor ?? column.key,
			sorted: config.defaultOrderBy === column.key,
			orderDirection: config.defaultOrderBy === column.key ? config.defaultOrderDirection ?? null : null,
			width: sizeColumns[column.key],
			align: column.align || DEFAULT_COLUMN_CONFIGURATION.alignment,
			onSort: column.onSort ?? SORT,
			sortable: column.sortable || DEFAULT_COLUMN_CONFIGURATION.sortable,
			filterable,
			filters: filterable ? column.filters ?? [] : [],
			onFilter: filterable ? column.onFilter ?? onFilter : undefined,
		});
	});
	return { tableState, columnsState, rowState };
};
