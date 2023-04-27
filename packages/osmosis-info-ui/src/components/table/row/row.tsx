import React from "react";
import { ColumnConfiguration } from "../types";
import { Cell } from "../cell/cell";
import { useTable } from "../context/table-context";
import { findInArray } from "../utils/utils";

type RowProps = {
	currentData: any;
	data: any[];
};

export function Row({ currentData, data }: RowProps) {
	const {
		columnsState,
		configuration: { getRowHeight, columns },
		rowState,
		tableState: { densityFactor },
	} = useTable();

	const onClick = () => {
		return;
	};

	let height = rowState.height * densityFactor;
	if (getRowHeight && typeof getRowHeight === "function") {
		height = getRowHeight({ currentData, data, densityFactor });
	}

	return (
		<div
			className="flex w-fit min-w-full items-center border-b-2 border-main-600 box-border overflow-hidden"
			style={{
				height: `${height}px`,
			}}
			onClick={onClick}
		>
			{columns.map((column: ColumnConfiguration, index: number): React.ReactElement => {
				const currentState = findInArray(columnsState, column.key);
				return (
					<Cell
						key={`${column.key}-${index}`}
						currentData={currentData}
						data={data}
						configuration={column}
						width={currentState.width}
					/>
				);
			})}
		</div>
	);
}
