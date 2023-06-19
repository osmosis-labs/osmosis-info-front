import React, { useMemo, useState } from "react";
import { ButtonMultiple, CloseSvg, Dialog, ItemButtonMultiple, VoteSVG, LeftSvg } from "@latouche/osmosis-info-ui";
import { PoolStore } from "../../stores/api/pools/pool-store";
import { InputTokens } from "./input-tokens";
import { formateNumberDecimals } from "../../helpers/format";
import { useTranslation } from "react-multi-lang";

type DialogReturnProps = {
	open: boolean;
	onClose: () => void;
	pool: PoolStore;
};

type KeyApr = "apr1d" | "apr7d" | "apr14d";

export const DialogReturn = ({ open, onClose, pool }: DialogReturnProps) => {
	const t = useTranslation();

	const [valueUSD, setValueUSD] = useState(100);

	const itemsPeriode: ItemButtonMultiple<KeyApr>[] = useMemo(
		() => [
			{ label: t("pools.calculatorAPR.periodes.one"), value: "apr1d" },
			{ label: t("pools.calculatorAPR.periodes.seven"), value: "apr7d" },
			{ label: t("pools.calculatorAPR.periodes.fourteen"), value: "apr14d" },
		],
		[t]
	);

	const [periode, setPeriode] = useState(itemsPeriode[2]);

	const onClickPeriode = (periode: ItemButtonMultiple<KeyApr>) => {
		setPeriode(periode);
	};

	const onChange = (value: number) => {
		setValueUSD(value);
	};

	return (
		<Dialog onClose={onClose} open={open} closeOnClickAway classNamePaper="p- bg-surface rounded-xl">
			<div className="relative">
				<div className=" p-5  overflow-hidden">
					<div className="flex items-center mx-2 mb-2">
						<span className="border-[1px] rounded-full border-frontier-500 p-2 mr-2">
							<VoteSVG className="fill-bullish-500  " height={24} />
						</span>
						{t("pools.calculatorAPR.title", { poolName: pool.name })}
						<CloseSvg
							className="stroke-default-500  absolute top-[10px] right-[10px] cursor-pointer"
							height={24}
							onClick={onClose}
						/>
					</div>
					<div>
						<InputTokens pool={pool} onChange={onChange} valueUSD={valueUSD} />
					</div>
					<div className="m-2">
						<p className="mb-2">{t("pools.calculatorAPR.stakedFor")}</p>
						<ButtonMultiple selected={periode} onClick={onClickPeriode} items={itemsPeriode} />
					</div>
					<div className="m-2 mt-4 ">
						<Details pool={pool} periode={periode.value} valueUSD={valueUSD} />
					</div>
				</div>
			</div>
		</Dialog>
	);
};

type DetailsProps = {
	pool: PoolStore;
	periode: KeyApr;
	valueUSD: number;
};
const Details = ({ pool, periode, valueUSD }: DetailsProps) => {
	const [showDetails, setShowDetails] = useState(false);
	const t = useTranslation();

	const toogleDetails = () => {
		setShowDetails(!showDetails);
	};
	const percent = (((pool.fees.feesSpent7d / 7) * 365) / pool.liquidity) * 100;
	let total = percent;
	let totalSuperfluid = 0;
	if (pool.apr.length > 0) totalSuperfluid = pool.apr[0].aprSuperfluid - pool.apr[0].apr14d;
	pool.apr.forEach((apr) => {
		total += apr[periode] ?? 0;
	});

	total += totalSuperfluid;

	const classHeaderDetails =
		"flex items-center justify-between transition-all duration-300  z-20 relative border-b-[1px] border-surface ";
	const classHeaderDetailsShow = `${classHeaderDetails} -translate-y-detailsReturn bg-background rounded-t-xl`;
	const classHeaderDetailsHide = `${classHeaderDetails} `;

	const classBodyDetails = `transition-all duration-300 h-full max-h-detailsReturn overflow-y-auto bg-background z-20 relative `;
	const classBodyDetailsShow = `${classBodyDetails} -translate-y-detailsReturn opacity-100 rounded-b-xl`;
	const classBodyDetailsHide = `${classBodyDetails} translate-y-detailsReturn opacity-0`;

	const classBackdropDetails = `transition-all duration-300 top-0 left-0 right-0 bottom-0  absolute bg-surface `;
	const classBackdropDetailsShow = `${classBackdropDetails} z-10 opacity-60 rounded-xl`;
	const classBackdropDetailsHide = `${classBackdropDetails} z-[-1] opacity-0`;

	const classIconDetails = `stroke-default-500 transition-all duration-300`;
	const classIconDetailsShow = `${classIconDetails} -rotate-90`;
	const classIconDetailsHide = `${classIconDetails} rotate-90`;

	const classRow = "grid grid-cols-3 gap-2  items-center p-2 not-italic text-sm text-default-400";

	return (
		<div className="max-h-[24px] ">
			<div className={showDetails ? classBackdropDetailsShow : classBackdropDetailsHide} onClick={toogleDetails}></div>
			<div className={showDetails ? classHeaderDetailsShow : classHeaderDetailsHide} onClick={toogleDetails}>
				<em className="not-italic flex items-center p-2">{t("pools.calculatorAPR.total")}</em>
				<em className="not-italic flex items-center">
					{t("pools.calculatorAPR.priceDay", { price: formateNumberDecimals(((total / 100) * valueUSD) / 365, 2, 2) })}
				</em>
				<em className="not-italic flex items-center">
					{t("pools.calculatorAPR.percentAPR", { percent: formateNumberDecimals(total) })}
				</em>
				<span className="flex items-center text-sm  text-default-500 cursor-pointer">
					{t("pools.calculatorAPR.details")}
					<LeftSvg className={showDetails ? classIconDetailsShow : classIconDetailsHide} />
				</span>
			</div>
			<div className={showDetails ? classBodyDetailsShow : classBodyDetailsHide}>
				<div>
					{pool.apr.map((apr, i) => {
						if (apr[periode] < 0.001) return null;
						return (
							<div key={i} className={classRow}>
								<em className="not-italic ">{apr.token?.symbol}</em>
								<em className="not-italic">
									{t("pools.calculatorAPR.priceDay", {
										price: formateNumberDecimals(((apr[periode] / 100) * valueUSD) / 365, 2, 2),
									})}
								</em>
								<em className="not-italic">{formateNumberDecimals(apr[periode], 2, 2)}%</em>
							</div>
						);
					})}
					{totalSuperfluid > 0 && periode === "apr14d" && (
						<div className={classRow}>
							<em className="not-italic ">{t("pools.calculatorAPR.superfluid")}</em>
							<em className="not-italic ">
								{t("pools.calculatorAPR.priceDay", {
									price: formateNumberDecimals(((totalSuperfluid / 100) * valueUSD) / 365, 2, 2),
								})}
							</em>
							<em className="not-italic ">{formateNumberDecimals(totalSuperfluid, 2, 2)}%</em>
						</div>
					)}
					<div className={classRow}>
						<em className="not-italic ">{t("pools.calculatorAPR.swap")}</em>
						<em className="not-italic ">
							{t("pools.calculatorAPR.priceDay", {
								price: formateNumberDecimals(((percent / 100) * valueUSD) / 365, 2, 2),
							})}
						</em>
						<em className="not-italic ">{formateNumberDecimals(percent, 2, 2)}%</em>
					</div>
				</div>
			</div>
		</div>
	);
};
