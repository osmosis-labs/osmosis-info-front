import React from "react";
import { useTable } from "../../context/table-context";
import { Switch } from "../../../switch/switch";

export const ColumnsResizing = () => {
	const { tableState, updateTableState } = useTable();

	const { resizing } = tableState;

	const onChange = (value: boolean) => {
		updateTableState({ ...tableState, resizing: value });
	};

	return (
		<div className="flex my-2 items-center">
			<p>Enable columns resizing: </p>
			<div className="flex items-center">
				<Switch value={resizing} onChange={onChange} className="ml-2" name="resizing" />
			</div>
		</div>
	);
};
