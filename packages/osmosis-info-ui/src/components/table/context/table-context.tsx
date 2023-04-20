import React, { createContext, useContext, useState } from "react";
import { ColumnState, RowState, TableConfiguration, TableState } from "../types";

export type TableContexte = {
	tableState: TableState;
	rowState: RowState;
	columnsState: ColumnState[];
	configuration: TableConfiguration;
	updateColumnsState: (newColumnsState: ColumnState[]) => void;
	updateTableState: (state: TableState) => void;
	updateRowState: (state: RowState) => void;
};

const defaultTableContext: TableContexte = {
	tableState: {} as TableState,
	rowState: {} as RowState,
	columnsState: [] as ColumnState[],
	configuration: {} as TableConfiguration,
	updateColumnsState: () => null,
	updateTableState: () => null,
	updateRowState: () => null,
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

	const updateColumnsState = (newColumnsState: ColumnState[]) => {
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
				configuration,
			}}
		>
			{children}
		</TableContext.Provider>
	);
};
