import React from "react";

type CellChangeProps = {
	change: number;
};

export const CellChange = ({ change }: CellChangeProps) => {
	const value = parseFloat(Math.abs(change) + "".replace(",", "")).toFixed(2);
	let body = <div className="text-ellipsis overflow-hidden">{value}%</div>;
	if (change > 0) {
		body = <div className="text-bullish-400 text-ellipsis overflow-hidden">↑ {value}%</div>;
	} else if (change < 0) {
		body = <div className="text-rust-500 text-ellipsis overflow-hidden">↓ {value}%</div>;
	}

	return <div className="">{body}</div>;
};
