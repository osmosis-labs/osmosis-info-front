import React from "react";
import { ColumnState } from "../types";
import { useTable } from "../context/table-context";
import { DENSITY_FACTORS } from "../config";
import { Skeleton } from "../../skeleton/skeleton";

export function SkeletonRow() {
	const {
		columnsState,
		rowState,
		tableState: { density },
	} = useTable();

	const onClick = () => {
		return;
	};

	const densityFactor = DENSITY_FACTORS[density];

	const height = rowState.height * densityFactor;

	return (
		<div
			className="flex w-fit min-w-full items-center border-b-[1px] border-surface box-border overflow-hidden hover:bg-osmosverse-800 transition-colors duration-default"
			style={{
				height: `${height}px`,
			}}
			onClick={onClick}
		>
			{columnsState.map((column: ColumnState, index: number): React.ReactElement | null => {
				const style: React.CSSProperties = {};
				style.maxWidth = `${column.width}px`;
				style.minWidth = `${column.width}px`;
				let classNameContent = "w-full flex  items-center";
				if (column.align === "right") {
					classNameContent += " justify-end";
				} else if (column.align === "center") {
					classNameContent += " justify-center ";
				}
				return column.hide ? null : (
					<div style={style} className={classNameContent} key={index}>
						<Skeleton height={height * 0.5} width={"60%"} className="bg-osmosverse-700 m-2" />
					</div>
				);
			})}
		</div>
	);
}
