import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { Trx } from "../../../stores/api/pools/trx-store";
import { truncate } from "../../../helpers/format";

type CellHashProps = {
	trx: Trx;
};

export const CellHash = ({ trx }: CellHashProps) => {
	const onClick = useCallback(() => {
		window.open(`https://www.mintscan.io/osmosis/txs/${trx.hash}`, "_blank");
	}, [trx]);

	const hashTruncated = useMemo(() => {
		return truncate(trx.hash);
	}, [trx.hash]);

	return (
		<span onClick={onClick} className="overflow-hidden items-center cursor-pointer text-ion-500 text-sm">
			{hashTruncated}
		</span>
	);
};
