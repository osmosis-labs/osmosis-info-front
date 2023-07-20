import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useStore } from "../../stores";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import { defaultGetServerSideProps } from "../../helpers/server-side-props";
import { TableTrx } from "./table-trx/table-trx";
import { PoolName } from "./pool-name";
import { Path, Paths } from "../../components/path/path";
import { PoolPrice } from "./pool-price";
import { PoolSelect } from "./pool-select";
import { PoolToken } from "../../stores/api/pools/pools";
import { PoolInfo } from "./pool-info";
import { useTranslation } from "react-multi-lang";
import { Charts } from "./chart/charts";

const Pool = observer(() => {
	const router = useRouter();
	const t = useTranslation();
	const {
		query: { id },
	} = router;

	const {
		poolsStore: { getPool },
	} = useStore();

	const poolId = !(id === undefined || typeof id === "object") ? parseInt(id) : 0;
	const poolStore = getPool(poolId);

	const poolExists = poolStore !== undefined;

	const [firstSelected, setFirstSelected] = useState<PoolToken | undefined>(undefined);
	const [secondSelected, setSecondSelected] = useState<PoolToken | undefined>(undefined);

	useEffect(() => {
		if (!poolExists) {
			// TODO redirect and diplay message
			console.log("%c[id].tsx -> 23 ERROR: pool not found", "background: #FF0000; color:#FFFFFF");
			router.push("/pools");
		}
	}, [poolExists, router]);

	useEffect(() => {
		if (!poolStore) return;
		if (poolStore.isPlaying) return;
		poolStore.play();
		poolStore.volumeStore.getData();
		poolStore.liquidityStore.getData();
		if (poolStore.tokens.length > 0) setFirstSelected(poolStore.tokens[0]);
		if (poolStore.tokens.length > 1) setSecondSelected(poolStore.tokens[1]);
		if (poolStore.trxStore.data.length === 0) poolStore.trxStore.getData({ limit: 20, offset: 0 });
		return () => {
			poolStore.pause();
		};
	}, [poolStore]);

	// const itemsPeriode: ItemButtonMultiple<PriceChartPeriode>[] = useMemo(
	// 	() => [
	// 		{ label: "D", value: "7d" as PriceChartPeriode },
	// 		{ label: "W", value: "1mo" as PriceChartPeriode },
	// 		{ label: "M", value: "1y" as PriceChartPeriode },
	// 	],
	// 	[]
	// );

	// const [periode, setPeriode] = useState(itemsPeriode[0]);

	// const itemsDenom: ItemButtonMultiple<string>[] = useMemo(() => {
	// 	return (
	// 		poolStore?.tokens.map((token) => {
	// 			return { label: token.symbol ?? truncate(token.denom), value: token.denom };
	// 		}) ?? []
	// 	);
	// }, [poolStore?.tokens]);

	// const [denom, setDenom] = useState(itemsDenom.length > 0 ? itemsDenom[0] : { label: "", value: "" });
	// const [denom2, setDenom2] = useState(itemsDenom.length > 1 ? itemsDenom[1].value : "");

	// useEffect(() => {
	// 	if (!poolStore) return;
	// 	poolStore.priceStore.getData(denom.value, denom2, periode.value);
	// }, [denom, denom2, periode, poolStore]);

	const onClickMoreTrx = useCallback(
		async (nextPage: (currentPage: number) => void, currentPage: number) => {
			const lengthBefore = poolStore?.trxStore.data.length ?? 0;
			await poolStore?.trxStore.fetchNextPage();
			if (lengthBefore !== poolStore?.trxStore.data.length) {
				nextPage(currentPage + 1);
			}
		},
		[poolStore?.trxStore]
	);

	const paths = useMemo<Path[]>(() => {
		return [
			{ name: t("overview.title"), href: "/" },
			{ name: t("pools.title"), href: "/pools" },
			{ name: poolStore?.name ?? "", href: `/pools/${poolStore?.id}` },
		];
	}, [poolStore?.id, poolStore?.name, t]);

	const onChangeSelect = useCallback((first: PoolToken, second: PoolToken) => {
		setFirstSelected(first);
		setSecondSelected(second);
	}, []);

	return (
		<div className="w-full  flex flex-col items-center">
			<div className="w-full max-w-container">
				{/* <h1 className="text-2xl">Pool: {id}</h1>
			<div className="m-2">
				<ButtonMultiple selected={periode} onClick={onClickPeriode} items={itemsPeriode} />
			</div>
			<div className="m-2">
				<ButtonMultiple selected={denom} onClick={onClickDenom} items={itemsDenom} />
			</div> */}
				<Paths paths={paths} selected={2} className="mt-2" />
				<PoolName pool={poolStore} className="mt-8" />
				<PoolPrice firstSelected={firstSelected} secondSelected={secondSelected} className="mt-4" />
				<PoolSelect
					firstSelected={firstSelected}
					secondSelected={secondSelected}
					onChangeSelect={onChangeSelect}
					pool={poolStore}
					className="mt-4"
				/>
				<div className="grid grid-cols-[2fr_5fr] gap-6 my-8">
					<PoolInfo pool={poolStore} />
					<Charts pool={poolStore} firstSelected={firstSelected} secondSelected={secondSelected} />
				</div>
				<TableTrx
					data={poolStore?.trxStore.data ?? []}
					onClickMore={onClickMoreTrx}
					isLoading={poolStore?.trxStore.isLoading}
				/>
			</div>
		</div>
	);
});

export async function getServerSideProps() {
	return defaultGetServerSideProps();
}

export default Pool;
