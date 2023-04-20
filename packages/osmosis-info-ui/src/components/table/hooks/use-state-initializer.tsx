import { ColumnState, RowState, TableConfiguration, TableState } from "../types";
import { calculeSizes } from "../utils/size";

export const useStateInitialize = (
	config: TableConfiguration
): { tableState: TableState; columnsState: ColumnState[]; rowState: RowState } => {
	const sizeColumns = calculeSizes(null, config.columns);
	const columnsState: ColumnState[] = [];
	const tableState: TableState = {
		density: config.density || "medium",
		rowPerPage: config.rowPerPage || 10,
	};
	const rowState: RowState = {
		height: config.rowHeight || 53,
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
