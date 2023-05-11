import React, { useState } from "react";
import { useTable } from "../context/table-context";
import { DENSITY_FACTORS, HEADER_SETTINGS_HEIGHT } from "../config";
import { CloseSvg, SettingsSvg } from "../../svg";
import { Dialog } from "../../dialog/dialog";
import { Dropdown, ItemDropdown } from "../../dropdown/dropdown";
import { ColumnState, Density } from "../types";
import { Button } from "../../buttons/button/button";
import { IconButton } from "../../buttons/icon-button/icon-button";
import { Switch } from "../../switch/switch";

export const HeaderSettings = () => {
	const { tableState, updateTableState, updateColumnsState, columnsState } = useTable();
	const { displaySettings, density } = tableState;

	const densityFactor = DENSITY_FACTORS[density];
	const heightSettings = displaySettings ? HEADER_SETTINGS_HEIGHT * densityFactor : 0;

	const [openDialog, setOpenDialog] = useState(false);

	const onClickSettings = () => {
		setOpenDialog(true);
	};

	const onCloseDialog = () => {
		setOpenDialog(false);
	};
	const itemsDensity = [
		{ value: "compact", display: "Compact" } as ItemDropdown<string>,
		{ value: "medium", display: "Medium" } as ItemDropdown<string>,
		{ value: "confortable", display: "Confortable" } as ItemDropdown<string>,
	];

	const onChangeDensity = (item: ItemDropdown<string>) => {
		updateTableState({ ...tableState, density: item.value as Density });
	};

	const onChangeHideColumn = (value: boolean, index: number) => {
		const columnUpdated = { ...columnsState[index] };

		let columns: ColumnState[] = [];

		columnUpdated.hide = value;

		columns = [...columnsState.slice(0, index), { ...columnUpdated }, ...columnsState.slice(index + 1)];

		updateColumnsState([...columns]);
	};

	return (
		<div
			className="border-r-[1px] border-l-[1px] border-t-[1px] border-main-700 rounded-t-md font-light text-xs cursor-pointer flex items-center justify-end px-2 pt-3 pb-1 "
			style={{
				height: `${heightSettings}px`,
			}}
		>
			<span
				onClick={onClickSettings}
				className="flex items-center justify-end hover:opacity-100 opacity-60 transition-opacity duration-default"
			>
				Settings
				<SettingsSvg className="fill-white-full ml-2" height={18} width={18} />
			</span>
			<Dialog open={openDialog} onClose={onCloseDialog} closeOnClickAway={true}>
				<div className="mx-2 mb-2">
					<div className="flex items-center justify-between">
						<p className=" my-2">Table settings</p>
						<IconButton onClick={onCloseDialog} Icon={CloseSvg} variant="flat" className="stroke-main-500 !pr-0" />
					</div>
					<div className="flex items-center">
						<p>Density: </p>
						<Dropdown<string>
							value={density}
							onChange={onChangeDensity}
							items={itemsDensity}
							size="small"
							className="ml-2"
						/>
					</div>
					<div>
						<p>Columns: </p>

						<div>
							{columnsState.map((column, index) => {
								const onChange = (value: boolean) => {
									onChangeHideColumn(!value, index);
								};

								return (
									<div key={column.key} className="flex items-center my-1">
										<Switch value={!column.hide} onChange={onChange} className="mr-2" name={column.key} />
										{column.display}
									</div>
								);
							})}
						</div>
					</div>
					<div className="flex items-center justify-center mt-2">
						<Button onClick={onCloseDialog} size="small">
							Validate
						</Button>
					</div>
				</div>
			</Dialog>
		</div>
	);
};
