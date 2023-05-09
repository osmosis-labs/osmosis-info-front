import React from "react";
import { ColumnState } from "../types";

type CellHeaderProps = {
	column: ColumnState;
};

export const CellHeader = ({ column }: CellHeaderProps) => {
	const { key } = column;
	return <div>{key}</div>;
};
