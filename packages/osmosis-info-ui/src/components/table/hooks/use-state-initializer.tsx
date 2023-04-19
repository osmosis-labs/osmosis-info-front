import { ColumnState, TableConfiguration, TableState } from "../types";
import { calculeSizes } from "../utils/size";

export const useStateInitialize = (
	config: TableConfiguration
): { tableState: TableState; columnsState: ColumnState[] } => {
	const sizeColumns = calculeSizes(null, config.columns);
	const columnsState: ColumnState[] = [];
	const tableState: TableState = {
		density: config.density || "medium",
	};

	config.columns.forEach((column) => {
		columnsState.push({
			order: null,
			key: column.key,
			sorted: false,
			width: sizeColumns[column.key],
		});
	});
	return { tableState, columnsState };
};
