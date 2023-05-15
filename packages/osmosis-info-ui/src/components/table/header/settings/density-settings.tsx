import React from "react";
import { Density } from "../../types";
import { Dropdown, ItemDropdown } from "../../../dropdown/dropdown";
import { useTable } from "../../context/table-context";

export const DensitySettings = () => {
	const { tableState, updateTableState } = useTable();

	const itemsDensity = [
		{ value: "compact", display: "Compact" } as ItemDropdown<string>,
		{ value: "medium", display: "Medium" } as ItemDropdown<string>,
		{ value: "confortable", display: "Confortable" } as ItemDropdown<string>,
	];

	const onChangeDensity = (item: ItemDropdown<string>) => {
		updateTableState({ ...tableState, density: item.value as Density });
	};

	return (
		<div className="flex items-center my-2">
			<p>Density: </p>
			<Dropdown<string>
				value={tableState.density}
				onChange={onChangeDensity}
				items={itemsDensity}
				size="small"
				className="ml-2"
			/>
		</div>
	);
};
