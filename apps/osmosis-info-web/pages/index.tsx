import React, { useEffect } from "react";
import { useTranslation } from "react-multi-lang";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores";
import Link from "next/link";
import axios from "axios";
import { LiquidityChart } from "../components/liquidity-chart/liquidity-chart";
import { Table } from "@latouche/osmosis-info-ui";
import { TokenTable } from "../components/token-table/token-table";

const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;

const Overview = observer(() => {
	const t = useTranslation();
	const {
		userStore,
		metricsStore: { isLoadingMetrics, getMetrics, errorMetrics, metrics },
	} = useStore();

	useEffect(() => {
		getMetrics();
		window.setTimeout(() => {
			getMetrics();
		}, 1000);
	}, [getMetrics]);

	useEffect(() => {
		if (errorMetrics) {
			console.log("%cindex.tsx -> 18 ERROR: errorMetrics", "background: #FF0000; color:#FFFFFF", errorMetrics);
		}
	}, [errorMetrics]);

	return (
		<div>
			<h1 className="text-2xl">{t("overview.title")}</h1>

			{userStore.name ? <p className="text-lg">Hello {userStore.name}</p> : ""}
			<div>
				{isLoadingMetrics && "Loading Metrics"}
				{!isLoadingMetrics && !errorMetrics && <p>{metrics.liquidityUsd}</p>}
			</div>
			<Link href={`/tokens`} prefetch={false}>
				Go to tokens
			</Link>

			<div>
				<TokenTable />
				{/* <LiquidityChart /> */}
			</div>
		</div>
	);
});

export async function getServerSideProps() {
	const responses = await axios({ url: `${API_URL}/overview/v1/metrics` });

	return {
		props: {
			initialState: {
				metricsState: responses.data,
			},
		},
	};
}

export default Overview;
