import React from "react";
import { useTable } from "../../context/table-context";
import { Switch } from "../../../switch/switch";
import { TableTranslations } from "../../types";
type ColumnsResizingProps = {
	translations?: TableTranslations;
};

export const ColumnsResizing = ({ translations }: ColumnsResizingProps) => {
	const { tableState, updateTableState } = useTable();

	const { resizing } = tableState;

	const onChange = (value: boolean) => {
		updateTableState({ ...tableState, resizing: value });
	};

	return (
		<div className="flex my-2 items-center">
			<p> {translations?.header?.enableColunmResize ?? "Enable columns resizing:"} </p>
			<div className="flex items-center">
				<Switch value={resizing} onChange={onChange} className="ml-2" name="resizing" />
			</div>
		</div>
	);
};
