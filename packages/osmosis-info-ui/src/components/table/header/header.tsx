import React, { forwardRef } from "react";
import { useTable } from "../context/table-context";
import { CellHeader } from "./cell-header";
import { DENSITY_FACTORS, HEADER_HEIGHT, HEADER_SETTINGS_HEIGHT } from "../config";
import { HeaderSettings } from "./settings/header-settings";

/*
- Display columns name with specified width
- Add popin for options
    - Filter
    - Export
	- reset to default settings
	- Add options to order columns
- Add checkbox for selecting all rows
- Add resizing options
- Add saving options

*/

export const Header = forwardRef<HTMLDivElement>((_, ref) => {
	const {
		columnsState,
		tableState: { density, displaySettings },
	} = useTable();

	const densityFactor = DENSITY_FACTORS[density];

	const heightSettings = displaySettings ? HEADER_SETTINGS_HEIGHT * densityFactor : 0;
	const height = HEADER_HEIGHT * densityFactor;

	return (
		<div
			className=""
			style={{
				height: `${height + heightSettings}px`,
			}}
		>
			{displaySettings && <HeaderSettings />}
			<div
				className="border-l-[1px]  border-r-[1px] border-b-[1px] border-primary-700 overflow-hidden"
				style={{
					height: `${height}px`,
				}}
			>
				<div
					className="flex items-center "
					ref={ref}
					style={{
						height: `${height}px`,
					}}
				>
					{columnsState.map((column, index) => {
						return column.hide ? null : <CellHeader key={column.key} column={column} index={index} />;
					})}
				</div>
			</div>
		</div>
	);
});

Header.displayName = "Header";
