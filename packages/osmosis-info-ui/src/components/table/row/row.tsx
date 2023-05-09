import React from "react";
import { ColumnState } from "../types";
import { Cell } from "../cell/cell";
import { useTable } from "../context/table-context";

type RowProps = {
	currentData: any;
	data: any[];
};

export function Row({ currentData, data }: RowProps) {
	const {
		columnsState,
		configuration: { getRowHeight },
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
			className="flex w-fit min-w-full items-center border-b-[1px] border-main-700 box-border overflow-hidden hover:bg-main-800 transition-colors duration-default"
			style={{
				height: `${height}px`,
			}}
			onClick={onClick}
		>
			{columnsState.map((column: ColumnState, index: number): React.ReactElement => {
				return (
					<Cell
						key={`${column.key}-${index}`}
						currentData={currentData}
						data={data}
						state={column}
						width={column?.width ?? 0}
					/>
				);
			})}
		</div>
	);
}
