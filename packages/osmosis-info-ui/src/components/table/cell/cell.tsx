import React from "react";
import { ColumnConfiguration } from "../types";
import { useTable } from "../context/table-context";

type CellProps<D extends Record<string, any>> = {
	currentData: D;
	data: D[];
	configuration: ColumnConfiguration;
	width: number;
};
export function Cell<D extends Record<string, any>>({ currentData, data, configuration, width }: CellProps<D>) {
	const {
		tableState: { density },
	} = useTable();
	const { accessor } = configuration;
	const onClick = () => {
		return;
	};
	let elt: string | React.ReactNode = null;
	if (typeof accessor === "string" && accessor in currentData) {
		elt = currentData[accessor] as React.ReactNode;
	} else if (accessor instanceof Function) {
		elt = accessor({ currentData, data });
	}
	let currentClassName = ``;
	const style: React.CSSProperties = {};
	if (density === "small") currentClassName = `${currentClassName} p-cellSmall`;
	if (density === "medium") currentClassName = `${currentClassName} p-cellMedium`;
	if (density === "large") currentClassName = `${currentClassName} p-cellLarge`;

	style.maxWidth = `${width}px`;
	style.minWidth = `${width}px`;
	return (
		<div onClick={onClick} className={currentClassName} style={style}>
			<div className="w-full truncate">{elt}</div>
		</div>
	);
}
