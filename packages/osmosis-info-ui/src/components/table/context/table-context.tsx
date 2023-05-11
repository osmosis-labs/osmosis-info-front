import React, { createContext, useContext, useState } from "react";
import { ColumnState, RowState, TableConfiguration, TableState } from "../types";
import { calculeSizes } from "../utils/size";
import { findInArray } from "../utils/utils";

export type TableContexte = {
	tableState: TableState;
	rowState: RowState;
	columnsState: ColumnState[];
	configuration: TableConfiguration;
	updateColumnsState: (newColumnsState: ColumnState[]) => void;
	updateTableState: (state: TableState) => void;
	updateRowState: (state: RowState) => void;
	width: number;
	updateWidth: (width: number) => void;
};

const defaultTableContext: TableContexte = {
	tableState: {} as TableState,
	rowState: {} as RowState,
	columnsState: [] as ColumnState[],
	configuration: {} as TableConfiguration,
	updateColumnsState: () => null,
	updateTableState: () => null,
	updateRowState: () => null,
	width: 0,
	updateWidth: () => null,
};

const TableContext = createContext<TableContexte>(defaultTableContext);

export const useTable = () => useContext(TableContext);

export type TableProviderProps = {
	initialTableState: TableState;
	initialRowState: RowState;
	initialColumnsState: ColumnState[];
	configuration: TableConfiguration;
	children: React.ReactNode;
};

export const TableProvider = ({
	children,
	initialTableState,
	initialRowState,
	initialColumnsState,
	configuration,
}: TableProviderProps) => {
	const [columnsState, setColumnsState] = useState<ColumnState[]>(initialColumnsState);
	const [tableState, updateTableState] = useState<TableState>(initialTableState);
	const [rowState, updateRowState] = useState<RowState>(initialRowState);
	const [width, updateWidth] = useState(0);

	const updateColumnsState = (newColumnsState: ColumnState[]) => {
		if (width > 0) {
			const sizeColumns = calculeSizes(
				width,
				configuration.columns.filter((column) => {
					const currentState = findInArray(newColumnsState, column.key);
					return currentState && !currentState.hide;
				})
			);

			newColumnsState.forEach((column) => {
				column.width = sizeColumns[column.key];
			});
		}
		setColumnsState([...newColumnsState]);
	};
	return (
		<TableContext.Provider
			value={{
				tableState,
				columnsState,
				updateColumnsState,
				updateTableState,
				rowState,
				updateRowState,
				width,
				updateWidth,
				configuration,
			}}
		>
			{children}
		</TableContext.Provider>
	);
};
