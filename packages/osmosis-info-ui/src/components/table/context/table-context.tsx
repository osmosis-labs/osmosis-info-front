import React, { createContext, useContext, useState } from "react";
import { ColumnState, TableConfiguration, TableState } from "../types";

export type TableContexte = {
	tableState: TableState;
	columnsState: ColumnState[];
	configuration: TableConfiguration;
	updateColumnsState: (newColumnsState: ColumnState[]) => void;
	updateTableState: (state: TableState) => void;
};

const defaultTableContext: TableContexte = {
	tableState: {} as TableState,
	columnsState: [] as ColumnState[],
	configuration: {} as TableConfiguration,
	updateColumnsState: () => null,
	updateTableState: () => null,
};

const TableContext = createContext<TableContexte>(defaultTableContext);

export const useTable = () => useContext(TableContext);

export type TableProviderProps = {
	initialTableState: TableState;
	initialColumnsState: ColumnState[];
	configuration: TableConfiguration;
	children: React.ReactNode;
};

export const TableProvider = ({
	children,
	initialTableState,
	initialColumnsState,
	configuration,
}: TableProviderProps) => {
	const [columnsState, setColumnsState] = useState<ColumnState[]>(initialColumnsState);
	const [tableState, updateTableState] = useState<TableState>(initialTableState);

	const updateColumnsState = (newColumnsState: ColumnState[]) => {
		setColumnsState([...newColumnsState]);
	};
	return (
		<TableContext.Provider value={{ tableState, columnsState, updateColumnsState, updateTableState, configuration }}>
			{children}
		</TableContext.Provider>
	);
};
