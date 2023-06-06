import React from "react";
import { Density, TableTranslations } from "../../types";
import { Dropdown, ItemDropdown } from "../../../dropdown/dropdown";
import { useTable } from "../../context/table-context";

type DensitySettingsProps = {
	translations?: TableTranslations;
};

export const DensitySettings = ({ translations }: DensitySettingsProps) => {
	const { tableState, updateTableState } = useTable();

	const itemsDensity = [
		{ value: "compact", display: translations?.header?.densityCompact ?? "Compact" } as ItemDropdown<string>,
		{ value: "medium", display: translations?.header?.densityMedium ?? "Medium" } as ItemDropdown<string>,
		{
			value: "confortable",
			display: translations?.header?.densityConfortable ?? "Confortable",
		} as ItemDropdown<string>,
	];

	const onChangeDensity = (item: ItemDropdown<string>) => {
		updateTableState({ ...tableState, density: item.value as Density });
	};

	return (
		<div className="flex items-center my-2">
			<p>{translations?.header?.density ?? "Density: "}</p>
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
