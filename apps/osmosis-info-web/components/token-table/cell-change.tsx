import React from "react";

type CellChangeProps = {
	change: number;
};

export const CellChange = ({ change }: CellChangeProps) => {
	const value = parseFloat(Math.abs(change) + "".replace(",", "")).toFixed(2);
	let body = <div>{value}%</div>;
	if (change > 0) {
		body = <div className="text-success">↑ {value}%</div>;
	} else if (change < 0) {
		body = <div className="text-error">↓ {value}%</div>;
	}

	return <div>{body}</div>;
};
