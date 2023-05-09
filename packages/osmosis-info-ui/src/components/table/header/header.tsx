import React from "react";
import { useTable } from "../context/table-context";
import { CellHeader } from "./cell-header";

/*
- Display columns name with specified width
- Add popin for options
    - Density
    - Columns to display
    - Filter
    - Export
- Add options with filtering whith icons
- Add checkbox for selecting all rows
- Add resizing options
- Add options to order columns
- Add saving options

*/

export const Header = () => {
	const { columnsState } = useTable();
	return (
		<div className="h-[53px] flex items-center box-border border-[1px] border-main-700 rounded-t-md">
			{columnsState.map((column, index) => {
				return <CellHeader key={column.key} column={column} index={index} />;
			})}
		</div>
	);
};
