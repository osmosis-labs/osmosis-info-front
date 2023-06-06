import React from "react";
import { ColumnState } from "../types";
import { Cell } from "../cell/cell";
import { useTable } from "../context/table-context";
import { DENSITY_FACTORS } from "../config";

type RowProps = {
	currentData: any;
	data: any[];
};

export function Row({ currentData, data }: RowProps) {
	const {
		columnsState,
		configuration: { getRowHeight, onClickRow },
		rowState,
		tableState: { density },
	} = useTable();

	const onClick = () => {
		if (!onClickRow || typeof onClickRow !== "function") return;
		onClickRow({ currentData, data });
	};

	const densityFactor = DENSITY_FACTORS[density];

	let height = rowState.height * densityFactor;
	if (getRowHeight && typeof getRowHeight === "function") {
		height = getRowHeight({ currentData, data, densityFactor: densityFactor });
	}

	return (
		<div
			className="flex w-fit min-w-full items-center border-b-[1px] border-surface box-border overflow-hidden hover:bg-surface transition-colors duration-default"
			style={{
				height: `${height}px`,
			}}
			onClick={onClick}
		>
			{columnsState.map((column: ColumnState, index: number): React.ReactElement | null => {
				return column.hide ? null : (
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
