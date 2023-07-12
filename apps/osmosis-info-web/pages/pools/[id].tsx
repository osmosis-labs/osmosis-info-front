import React, { useEffect, useMemo, useState } from "react";
import { useStore } from "../../stores";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import { defaultGetServerSideProps } from "../../helpers/server-side-props";
import { PriceChartPeriode } from "../../stores/api/pools/price-chart-store";
import { ButtonMultiple, ItemButtonMultiple } from "@latouche/osmosis-info-ui";
import { truncate } from "../../helpers/format";

const Pool = observer(() => {
	const router = useRouter();
	const {
		query: { id },
	} = router;

	const {
		poolsStore: { getPool },
	} = useStore();

	const poolId = !(id === undefined || typeof id === "object") ? parseInt(id) : 0;
	const poolStore = getPool(poolId);

	const poolExists = poolStore !== undefined;

	useEffect(() => {
		if (!poolExists) {
			// TODO redirect and diplay message
			console.log("%c[id].tsx -> 23 ERROR: pool not found", "background: #FF0000; color:#FFFFFF");
			router.push("/pools");
		}
	}, [poolExists, router]);

	useEffect(() => {
		if (!poolStore) return;
		poolStore.play();
		poolStore.volumeStore.getData();
		poolStore.liquidityStore.getData();
		poolStore.trxStore.getData({ limit: 10, offset: 0 });
		return () => {
			poolStore.pause();
		};
	}, [poolStore]);

	const itemsPeriode: ItemButtonMultiple<PriceChartPeriode>[] = useMemo(
		() => [
			{ label: "D", value: "7d" as PriceChartPeriode },
			{ label: "W", value: "1mo" as PriceChartPeriode },
			{ label: "M", value: "1y" as PriceChartPeriode },
		],
		[]
	);

	const [periode, setPeriode] = useState(itemsPeriode[0]);

	const itemsDenom: ItemButtonMultiple<string>[] = useMemo(() => {
		return (
			poolStore?.tokens.map((token) => {
				return { label: token.symbol ?? truncate(token.denom), value: token.denom };
			}) ?? []
		);
	}, [poolStore?.tokens]);

	const [denom, setDenom] = useState(itemsDenom.length > 0 ? itemsDenom[0] : { label: "", value: "" });
	const [denom2, setDenom2] = useState(itemsDenom.length > 1 ? itemsDenom[1].value : "");

	const onClickPeriode = (periode: ItemButtonMultiple<PriceChartPeriode>) => {
		setPeriode(periode);
	};

	const onClickDenom = (denom: ItemButtonMultiple<string>) => {
		if (denom.value === denom2) {
			if (itemsDenom.length > 1 && denom2 !== itemsDenom[0].value) setDenom2(itemsDenom[0].value);
			else setDenom2(itemsDenom[1].value);
		}
		setDenom(denom);
	};

	useEffect(() => {
		if (!poolStore) return;
		poolStore.priceStore.getData(denom.value, denom2, periode.value);
	}, [denom, denom2, periode, poolStore]);

	console.log("%c[id].tsx -> 87 PINK: data", "background: #e91e63; color:#FFFFFF", poolStore?.priceStore?.data);

	return (
		<div className="w-full">
			<h1 className="text-2xl">Pool: {id}</h1>
			<div className="m-2">
				<ButtonMultiple selected={periode} onClick={onClickPeriode} items={itemsPeriode} />
			</div>
			<div className="m-2">
				<ButtonMultiple selected={denom} onClick={onClickDenom} items={itemsDenom} />
			</div>
		</div>
	);
});

export async function getServerSideProps() {
	return defaultGetServerSideProps();
}

export default Pool;
