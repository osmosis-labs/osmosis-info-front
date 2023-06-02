import React from "react";
import { useTable } from "../../context/table-context";
import { Button } from "../../../buttons/button/button";
import { ColumnState } from "../../types";

export const CSVSettings = () => {
	const {
		displayData,
		columnsState,
		configuration: { translations },
	} = useTable();

	const onClickCSV = () => {
		const headers: any[] = [];
		const columnKeys: string[] = [];
		columnsState.forEach((column: ColumnState) => {
			if (!column.hide) {
				headers.push(column.display);
				columnKeys.push(column.key);
			}
		});

		const dataCSV: any[] = [];
		displayData.forEach((row: any) => {
			const currentRow = columnKeys.map((key: string) => {
				return row[key];
			});
			dataCSV.push(currentRow);
		});

		const dataDownload = [headers, ...dataCSV];
		const csv = dataDownload.map((row) => row.join(",")).join("\n");
		const a = document.createElement("a");
		a.href = `data:attachment/csv,${encodeURIComponent(csv)}`;
		a.target = "_blank";
		a.download = `osmosis_table.csv`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

	return (
		<Button size="small" onClick={onClickCSV}>
			{translations?.header?.downloadCSV ?? "Download CSV"}
		</Button>
	);
};
