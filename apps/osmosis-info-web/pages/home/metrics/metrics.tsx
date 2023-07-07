import React from "react";
import { observer } from "mobx-react-lite";
import { Paper } from "@latouche/osmosis-info-ui";
import { useStore } from "../../../stores";
import { formateNumberDecimals, formaterNumber } from "../../../helpers/format";
import { useTranslation } from "react-multi-lang";

export const Metrics = observer(() => {
	const {
		metricsStore: { metrics },
	} = useStore();
	const t = useTranslation();

	const classNamePrice = "";
	let classNameLiquidityPrice = `${classNamePrice} `;
	let classNameVolumePrice = `${classNamePrice}  `;

	if (metrics.liquidityUsd24h > 0) {
		classNameLiquidityPrice += " text-bullish-500";
	} else {
		classNameLiquidityPrice += " text-rust-500";
	}

	if (metrics.volume24hChange > 0) {
		classNameVolumePrice += " text-bullish-500 ";
	} else {
		classNameVolumePrice += " text-rust-500";
	}

	return (
		<Paper className="mt-8 mx-2 !p-5 flex">
			<div>
				{t("overview.liquidity24h")}{" "}
				<span className={classNameLiquidityPrice}>
					${formaterNumber(Math.round(metrics.liquidityUsd))} ({metrics.liquidityUsd24h > 0 ? "↑" : "↓"}
					{formateNumberDecimals(metrics.liquidityUsd24h, 2, 0)}%)
				</span>
			</div>
			<div className=" ml-8">
				{t("overview.volume24h")}{" "}
				<span className={classNameVolumePrice}>
					${formaterNumber(Math.round(metrics.volume24h))} ({metrics.volume24hChange > 0 ? "↑" : "↓"}
					{formateNumberDecimals(metrics.volume24hChange, 2, 0)}%)
				</span>
			</div>
		</Paper>
	);
});
