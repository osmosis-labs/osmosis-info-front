import React from "react";
import { PoolStore } from "../../stores/api/pools/pool-store";
import { useStore } from "../../stores";
import { Image } from "../../components/image/image";
import { Paper } from "@latouche/osmosis-info-ui";
import { TokenStore } from "../../stores/api/tokens/token-store";
import { formateNumberDecimals, formateNumberPriceDecimals, formaterNumber } from "../../helpers/format";
import { PoolToken } from "../../stores/api/pools/pools";
import { useTranslation } from "react-multi-lang";

export type PoolInfoProps = {
	pool: PoolStore | undefined;
};

export const PoolInfo = ({ pool }: PoolInfoProps) => {
	const t = useTranslation();
	return (
		<Paper className="flex flex-col w-full">
			<div className="bg-osmosverse-900 rounded-xl px-2 py-4 w-full">
				<p>{t("pool.pooledTokens.title")}</p>
				<div className="grid grid-cols-[2fr_1fr_1fr] my-2 w-full text-sm text-osmosverse-500">
					<div className="flex items-center">
						<span className="">{t("pool.pooledTokens.name")}</span>
					</div>
					<span className="text-right">{t("pool.pooledTokens.amount")}</span>
					<span className="text-right">{t("pool.pooledTokens.price")}</span>
				</div>
				{pool?.tokens.map((token, index) => {
					return <RowPool key={index} token={token} />;
				})}
			</div>
			<Liqudity pool={pool} />
			<Volume pool={pool} />
			<Volume7d pool={pool} />
			<Fees pool={pool} />
		</Paper>
	);
};

const RowPool = ({ token }: { token?: PoolToken }) => {
	const { assetsStore } = useStore();
	if (!token) return <></>;
	return (
		<div className="grid grid-cols-[2fr_1fr_1fr] my-2 w-full">
			<div className="flex items-center">
				<Image
					src={assetsStore.getImageFromDenom(token.denom) ?? "/images/default.png"}
					alt={token.denom ?? "token"}
					height={30}
					width={30}
					className="h-[30px] w-[30px] min-w-[30px] min-h-[30px]"
				/>
				<span className="ml-2 text-sm">{token.symbol}</span>
			</div>
			<span className="text-right">{formaterNumber(token.amount)}</span>
			<span className="text-right">{formateNumberPriceDecimals(token.tokenStore?.price ?? 0)}</span>
		</div>
	);
};

const Liqudity = ({ pool }: { pool: PoolStore | undefined }) => {
	const t = useTranslation();
	if (!pool) return <></>;
	return (
		<div className="flex flex-col  mt-4">
			<p className="text-osmosverse-500">{t("pool.liquidity")}</p>
			<p>{formateNumberPriceDecimals(pool.liquidity)}</p>
			<Percent percent={pool.liquidity24hChange} />
		</div>
	);
};

const Volume = ({ pool }: { pool: PoolStore | undefined }) => {
	const t = useTranslation();
	if (!pool) return <></>;
	return (
		<div className="flex flex-col  mt-4">
			<p className="text-osmosverse-500">{t("pool.volume")}</p>
			<p>{formateNumberPriceDecimals(pool.volume24h)}</p>
			<Percent percent={pool.volume24hChange} />
		</div>
	);
};

const Volume7d = ({ pool }: { pool: PoolStore | undefined }) => {
	const t = useTranslation();
	if (!pool) return <></>;
	return (
		<div className="flex flex-col  mt-4">
			<p className="text-osmosverse-500">{t("pool.volume7d")}</p>
			<p>{formateNumberPriceDecimals(pool.volume7d)}</p>
		</div>
	);
};
const Fees = ({ pool }: { pool: PoolStore | undefined }) => {
	const t = useTranslation();
	if (!pool) return <></>;
	return (
		<div className="flex flex-col  mt-4">
			<p className="text-osmosverse-500">{t("pool.fees")}</p>
			<p>{formateNumberDecimals(pool.fees.feesPercentage)}%</p>
		</div>
	);
};

const Percent = ({ percent }: { percent: number }) => {
	const value = formateNumberDecimals(percent);
	let body = <div className="text-ellipsis overflow-hidden">{value}%</div>;
	if (percent > 0) {
		body = <div className="text-bullish-400 text-ellipsis overflow-hidden">↑ {value}%</div>;
	} else if (percent < 0) {
		body = <div className="text-rust-500 text-ellipsis overflow-hidden">↓ {value}%</div>;
	}

	return <div className="">{body}</div>;
};
