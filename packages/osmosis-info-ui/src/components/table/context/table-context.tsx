import React, { Dispatch, createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";
import { ColumnState, RowState, TableConfiguration, TableState } from "../types";
import { ColumnSize, calculeSizes } from "../utils/size";
import { findInArray } from "../utils/utils";

export type TableContexte = {
	tableState: TableState;
	rowState: RowState;
	columnsState: ColumnState[];
	configuration: TableConfiguration;
	updateColumnsState: Dispatch<React.SetStateAction<ColumnState[]>>;
	updateTableState: (state: TableState) => void;
	updateRowState: (state: RowState) => void;
	width: number;
	updateWidth: (width: number) => void;
	data: any[];
	displayData: any[];
};

const defaultTableContext: TableContexte = {
	tableState: {} as TableState,
	rowState: {} as RowState,
	columnsState: [] as ColumnState[],
	configuration: {} as TableConfiguration,
	updateColumnsState: (() => null) as Dispatch<React.SetStateAction<ColumnState[]>>, // Utilisez Dispatch pour le type
	updateTableState: () => null,
	updateRowState: () => null,
	width: 0,
	updateWidth: () => null,
	data: [],
	displayData: [],
};

const TableContext = createContext<TableContexte>(defaultTableContext);

export const useTable = () => useContext(TableContext);

export type TableProviderProps = {
	initialTableState: TableState;
	initialRowState: RowState;
	initialColumnsState: ColumnState[];
	configuration: TableConfiguration;
	children: React.ReactNode;
	data: any[];
};

export const TableProvider = ({
	children,
	initialTableState,
	initialRowState,
	initialColumnsState,
	configuration,
	data,
}: TableProviderProps) => {
	const [columnsState, updateColumnsState] = useState<ColumnState[]>(initialColumnsState);
	const [tableState, updateTableState] = useState<TableState>(initialTableState);
	const [rowState, updateRowState] = useState<RowState>(initialRowState);
	const [width, updateWidth] = useState(0);
	const { orderBy, orderDirection, filter, filterColumn, filterValue } = tableState;

	// const updateColumnsState = useCallback((newColumnsState: ColumnState[]) => {
	// 	console.log("table-context.tsx -> 62: update");
	// 	setColumnsState([...newColumnsState]);
	// }, []);

	useEffect(() => {
		if (configuration.callBackUpdateStates) {
			configuration.callBackUpdateStates({ tableState, columnsState });
		}
	}, [columnsState, configuration, tableState]);

	useEffect(() => {
		const sizeColumns = calculeSizes({
			totalWidth: width,
			columnsSize: columnsState
				.filter((c) => !c.hide)
				.map((c) => ({
					minWidth: c.minWidth,
					flex: c.flex,
					maxWidth: c.maxWidth,
					key: c.key,
				})) as ColumnSize[],
		});

		columnsState.forEach((c, index) => {
			const width = sizeColumns[c.key];
			columnsState[index].width = width;
		});

		updateColumnsState([...columnsState]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [width]);

	const displayData = useMemo(() => {
		let res = [...data];
		if (filter !== undefined && filterColumn !== undefined && filterValue !== undefined && filterValue.length > 0) {
			const currentColumn = findInArray(columnsState, filterColumn);
			if (currentColumn && currentColumn.filterable && currentColumn.onFilter) {
				if (currentColumn.onFilter) {
					res = res.filter((data: any) => {
						if (currentColumn.onFilter) {
							return currentColumn.onFilter({ data, filter, value: filterValue, key: currentColumn.key });
						}
						return false;
					});
				}
			}
		}
		const currentColumn = findInArray<ColumnState>(columnsState, orderBy || "");

		if (currentColumn) {
			res.sort((a, b) => {
				let res = 0;
				if (currentColumn.onSort && orderBy) {
					if (orderDirection === "ASC") {
						res = currentColumn.onSort(a[orderBy], b[orderBy]);
					} else {
						res = -currentColumn.onSort(a[orderBy], b[orderBy]);
					}
				}
				return res;
			});
		}
		return res;
	}, [columnsState, data, orderBy, orderDirection, filter, filterColumn, filterValue]);
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
				data,
				displayData,
			}}
		>
			{children}
		</TableContext.Provider>
	);
};
