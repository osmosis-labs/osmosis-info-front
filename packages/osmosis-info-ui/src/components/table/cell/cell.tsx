import React from "react";
import { ColumnState } from "../types";

type CellProps<D extends Record<string, any>> = {
	currentData: D;
	data: D[];
	state: ColumnState;
	width: number;
};
export function Cell<D extends Record<string, any>>({ currentData, data, state, width }: CellProps<D>) {
	const { accessor, align } = state;
	const onClick = () => {
		return;
	};
	let elt: string | React.ReactNode = null;
	if (typeof accessor === "string" && accessor in currentData) {
		elt = currentData[accessor] as React.ReactNode;
	} else if (accessor instanceof Function) {
		elt = accessor({ currentData, data });
	}
	const currentClassName = `px-2 `;
	const style: React.CSSProperties = {};

	style.maxWidth = `${width}px`;
	style.minWidth = `${width}px`;

	let classNameContent = "w-full truncate";
	if (align === "right") {
		classNameContent += " text-right";
	} else if (align === "center") {
		classNameContent += "  text-center";
	}
	return (
		<div onClick={onClick} className={currentClassName} style={style}>
			<div className={classNameContent}>{elt}</div>
		</div>
	);
}
