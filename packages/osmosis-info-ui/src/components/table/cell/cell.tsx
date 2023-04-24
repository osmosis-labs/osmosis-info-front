import React from "react";
import { ColumnConfiguration } from "../types";

type CellProps<D extends Record<string, any>> = {
	currentData: D;
	data: D[];
	configuration: ColumnConfiguration;
	width: number;
};
export function Cell<D extends Record<string, any>>({ currentData, data, configuration, width }: CellProps<D>) {
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
	const currentClassName = `px-2`;
	const style: React.CSSProperties = {};

	style.maxWidth = `${width}px`;
	style.minWidth = `${width}px`;
	return (
		<div onClick={onClick} className={currentClassName} style={style}>
			<div className="w-full truncate">{elt}</div>
		</div>
	);
}
