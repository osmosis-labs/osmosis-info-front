import React, { useState } from "react";
import { PoolStore } from "../../stores/api/pools/pool-store";
import { formateNumberDecimals } from "../../helpers/format";
import { VoteSVG } from "@latouche/osmosis-info-ui";

import { DialogReturn } from "../dialog-apr/dialog-return";

type CellTotalReturnProps = {
	pool: PoolStore;
};
export const CellTotalReturn = ({ pool }: CellTotalReturnProps) => {
	const [open, setOpen] = useState(false);

	const onClose = () => {
		setOpen(false);
	};

	const onOpen = () => {
		setOpen(true);
		console.log("cell-total-return.tsx -> 18: open");
	};
	return (
		<div className="grid grid-cols-[70px_30px] items-center">
			<DialogReturn open={open} onClose={onClose} pool={pool} />
			<span>{`${formateNumberDecimals(pool.totalAPR, 2, 2)}%`}</span>
			<VoteSVG className="fill-default-500 cursor-pointer" height={24} onClick={onOpen} />
		</div>
	);
};
