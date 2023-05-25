import { DEFAULT_COLUMN_CONFIGURATION, DEFAULT_TABLE_CONFIGURATION, ROW_HEIGHT, SORT, onFilter } from "../config";
import { ColumnState, RowState, TableConfiguration, TableState } from "../types";
import { ColumnSize, calculeSizes } from "../utils/size";

export const useStateInitialize = (
	config: TableConfiguration
): { tableState: TableState; columnsState: ColumnState[]; rowState: RowState } => {
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
		resizing: config.resizing ?? DEFAULT_TABLE_CONFIGURATION.resizing,
	};
	const rowState: RowState = {
		height: config.rowHeight ?? ROW_HEIGHT,
	};

	const sizeColumns = calculeSizes({
		totalWidth: null,
		columnsSize: config.columns
			.filter((c) => !(c.hide ?? DEFAULT_COLUMN_CONFIGURATION.hide))
			.map((c) => ({
				minWidth: c.minWidth,
				flex: c.flex,
				maxWidth: c.maxWidth,
				key: c.key,
			})) as ColumnSize[],
	});

	config.columns.forEach((column) => {
		const filterable = column.filterable || DEFAULT_COLUMN_CONFIGURATION.filterable;
		columnsState.push({
			key: column.key,
			minWidth: column.minWidth ?? DEFAULT_COLUMN_CONFIGURATION.minWidth,
			width: sizeColumns[column.key],
			flex: column.flex,
			maxWidth: column.maxWidth,
			display: column.display,
			hide: column.hide ?? DEFAULT_COLUMN_CONFIGURATION.hide,
			accessor: column.accessor ?? column.key,
			sorted: config.defaultOrderBy === column.key,
			orderDirection: config.defaultOrderBy === column.key ? config.defaultOrderDirection ?? null : null,
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
