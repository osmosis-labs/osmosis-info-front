import React, { useMemo } from "react";
import { Trx } from "../../../stores/api/pools/trx-store";
import { useLanguage } from "../../../hooks/use-language";
import dayjs from "dayjs";

type CellTimeProps = {
	trx: Trx;
};

export const CellTime = ({ trx }: CellTimeProps) => {
	const locale = useLanguage();

	const time = useMemo(() => {
		return dayjs(trx.time).locale(locale).format("DD/MM/YY LTS");
	}, [trx.time, locale]);
	return <span className="overflow-hidden items-center text-sm">{time}</span>;
};
