import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { EnterTrx, Trx } from "../../../stores/api/pools/trx-store";
import { formateNumberDecimals, truncate } from "../../../helpers/format";

type CellTokenProps = {
	enter: EnterTrx;
};

export const CellToken = ({ enter }: CellTokenProps) => {
	const addressTruncated = useMemo(() => {
		return formateNumberDecimals(enter.value);
	}, [enter.value]);

	return (
		<div className="flex justify-end items-center">
			<span>{addressTruncated}</span>
			<span className="ml-1 text-sm text-osmosverse-500">{enter.symbol}</span>
		</div>
	);
};

type CellTokenInProps = {
	trx: Trx;
};

export const CellTokenIn = ({ trx }: CellTokenInProps) => {
	return <CellToken enter={trx.in} />;
};

type CellTokenOutProps = {
	trx: Trx;
};

export const CellTokenOut = ({ trx }: CellTokenOutProps) => {
	return <CellToken enter={trx.out} />;
};
