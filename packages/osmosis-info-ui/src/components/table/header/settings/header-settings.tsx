import React, { useState } from "react";
import { useTable } from "../../context/table-context";
import { DENSITY_FACTORS, HEADER_SETTINGS_HEIGHT } from "../../config";
import { CloseSvg, SettingsSvg } from "../../../svg";
import { Dialog } from "../../../dialog/dialog";
import { Button } from "../../../buttons/button/button";
import { IconButton } from "../../../buttons/icon-button/icon-button";
import { DensitySettings } from "./density-settings";
import { ColumnsSettings } from "./columns-settings";

export const HeaderSettings = () => {
	const { tableState } = useTable();
	const { displaySettings, density } = tableState;

	const densityFactor = DENSITY_FACTORS[density];
	const heightSettings = displaySettings ? HEADER_SETTINGS_HEIGHT * densityFactor : 0;

	const [openDialog, setOpenDialog] = useState(true);

	const onClickSettings = () => {
		setOpenDialog(true);
	};

	const onCloseDialog = () => {
		setOpenDialog(false);
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
					<DensitySettings />
					<ColumnsSettings />
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
