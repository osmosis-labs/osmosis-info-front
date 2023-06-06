import React, { ChangeEvent, useEffect, useMemo, useState, useCallback } from "react";
import { ColumnState, Density, TableTranslations } from "../../types";
import { Dropdown, ItemDropdown } from "../../../dropdown/dropdown";
import { useTable } from "../../context/table-context";
import { Input } from "../../../input/input";
import { IconButton } from "../../../buttons/icon-button/icon-button";
import { CloseSvg } from "../../../svg";

type FiltersSettingsProps = {
	translations?: TableTranslations;
};
export const FiltersSettings = ({ translations }: FiltersSettingsProps) => {
	const { tableState, updateTableState, columnsState } = useTable();

	const [columnSelected, setColumnSelected] = useState<string>("");
	const [filterSelected, setFilterSelected] = useState<string>("");
	const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined);

	const [inputValue, setInputValue] = useState<string>("");

	useEffect(() => {
		let columnFilter: ColumnState | undefined = undefined;
		if (!tableState.filterColumn) {
			columnFilter = columnsState.find((column) => column.filterable);
		} else {
			columnFilter = columnsState.find((column) => column.key === tableState.filterColumn);
		}

		if (columnFilter) {
			setColumnSelected(columnFilter.key);
			if (!tableState.filter) {
				if (columnFilter.filters.length > 0) setFilterSelected(columnFilter.filters[0].value);
			} else {
				const columnFilters = columnFilter.filters.find((filter) => {
					if (tableState.filter) return filter.value === tableState.filter.value;
					return false;
				});
				if (columnFilters) setFilterSelected(columnFilters.value);
			}
		}
	}, [columnsState, tableState]);

	const itemsFilterName = useMemo(() => {
		const items: ItemDropdown<string>[] = [];
		columnsState.forEach((column) => {
			if (column.filterable) items.push({ value: column.key, display: column.display } as ItemDropdown<string>);
		});
		return items;
	}, [columnsState]);

	const itemsFilter = useMemo(() => {
		let items: ItemDropdown<string>[] = [];
		const currentColumn = columnsState.find((column) => column.key === columnSelected);
		if (currentColumn) {
			items = [...(currentColumn.filters as ItemDropdown<string>[])];
		}
		return items;
	}, [columnSelected, columnsState]);

	const updateFilterTable = useCallback(
		(value: string) => {
			clearTimeout(timeoutId);
			const timeout = window.setTimeout(() => {
				const currentColumn = columnsState.find((column) => column.key === columnSelected);
				if (currentColumn && currentColumn.filters.length > 0) {
					const currentFilter = currentColumn.filters.find((filter) => filter.value === filterSelected);
					updateTableState({
						...tableState,
						filterValue: value,
						filterColumn: columnSelected,
						filter: currentFilter,
					});
				}
			}, 300);
			setTimeoutId(timeout);
		},
		[columnSelected, columnsState, filterSelected, tableState, timeoutId, updateTableState]
	);

	const onChangeColumn = (item: ItemDropdown<string>) => {
		setColumnSelected(item.value);

		const currentColumn = columnsState.find((column) => column.key === item.value);
		if (currentColumn) {
			if (currentColumn.filters.length > 0) {
				updateTableState({ ...tableState, filterColumn: item.value, filter: currentColumn.filters[0] });
				setFilterSelected(currentColumn.filters[0].value);
			}
		}
	};

	const onChangeFilter = (item: ItemDropdown<string>) => {
		setFilterSelected(item.value);
		updateTableState({ ...tableState, filter: item });
	};

	const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
		updateFilterTable(event.target.value);
	};

	const onClear = () => {
		setInputValue("");
		updateTableState({ ...tableState, filterValue: undefined });
	};

	const onClearFilter = () => {
		setInputValue("");
		updateTableState({ ...tableState, filterValue: undefined, filterColumn: undefined, filter: undefined });
	};

	return (
		<div className="flex my-2 flex-col">
			<p>{translations?.header?.filter ?? "Filters: "}</p>
			<div className="flex items-center">
				<IconButton onClick={onClearFilter} Icon={CloseSvg} className="mr-2" strokeAnimation variant="flat" />
				<Dropdown<string>
					value={columnSelected}
					onChange={onChangeColumn}
					items={itemsFilterName}
					size="small"
					className=""
				/>
				<Dropdown<string>
					value={filterSelected}
					onChange={onChangeFilter}
					items={itemsFilter}
					size="small"
					className="mx-2"
				/>
				<Input className="my-1 [&>input]:max-w-[60px]" value={inputValue} onChange={onChangeInput} onClear={onClear} />
			</div>
		</div>
	);
};
