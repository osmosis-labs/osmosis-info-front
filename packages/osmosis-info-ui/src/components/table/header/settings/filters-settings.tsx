import React, { useEffect, useMemo, useState } from "react";
import { Density } from "../../types";
import { Dropdown, ItemDropdown } from "../../../dropdown/dropdown";
import { useTable } from "../../context/table-context";
import { Input } from "../../../input/input";

export const FiltersSettings = () => {
	const { tableState, updateTableState, columnsState } = useTable();

	const [columnSelected, setColumnSelected] = useState<string>(columnsState[0].key);
	const [filterSelected, setFilterSelected] = useState<string>(columnsState[0].key);

	useEffect(() => {
		const firstColumn = columnsState.find((column) => column.filterable);
		if (firstColumn) {
			setColumnSelected(firstColumn.key);
			if (firstColumn.filters.length > 0) setFilterSelected(firstColumn.filters[0].value);
		}
	}, [columnsState]);

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

	const onChangeColumn = (item: ItemDropdown<string>) => {
		setColumnSelected(item.value);
		const firstColumn = columnsState.find((column) => column.key === item.value);
		if (firstColumn) {
			if (firstColumn.filters.length > 0) setFilterSelected(firstColumn.filters[0].value);
		}
	};

	const onChangeFilter = (item: ItemDropdown<string>) => {
		setFilterSelected(item.value);
	};

	return (
		<div className="flex my-2 flex-col">
			<p>Filter: </p>
			<div>
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
					className=""
				/>
				<div className="m-1 flex flex-col">
					<Input className="my-1" />
					<Input className="my-1" variant="outlined" />
					<Input className="my-1" disabled />
					<Input className="my-1" error />
					<Input className="my-1" label={"Lapin"} />
					<Input className="my-1" label={["Lapin", "Cerise"]} />
					<Input className="my-1" label="Pomme" error />
				</div>
			</div>
		</div>
	);
};
