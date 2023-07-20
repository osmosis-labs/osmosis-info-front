import React, { useCallback, useMemo } from "react";
import { Trx } from "../../../stores/api/pools/trx-store";
import { truncate } from "../../../helpers/format";

type CellAddressProps = {
	trx: Trx;
};

export const CellAddress = ({ trx }: CellAddressProps) => {
	const onClick = useCallback(() => {
		window.open(`https://www.mintscan.io/osmosis/account/${trx.address}`, "_blank");
	}, [trx]);

	const addressTruncated = useMemo(() => {
		return truncate(trx.address);
	}, [trx.address]);

	return (
		<span onClick={onClick} className="overflow-hidden items-center cursor-pointer text-ion-500 text-sm">
			{addressTruncated}
		</span>
	);
};
