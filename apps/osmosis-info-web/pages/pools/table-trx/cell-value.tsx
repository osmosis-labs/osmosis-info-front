import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { Trx } from "../../../stores/api/pools/trx-store";
import { formatAutoPrice, truncate } from "../../../helpers/format";

type CellValueProps = {
	trx: Trx;
};

export const CellValue = ({ trx }: CellValueProps) => {
	const value = useMemo(() => {
		return formatAutoPrice(trx.valueUsd);
	}, [trx.valueUsd]);

	return <span className="overflow-hidden items-center cursor-pointertext-sm">{value}</span>;
};
