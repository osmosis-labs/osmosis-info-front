import React, { useEffect } from "react";
import { useTranslation } from "react-multi-lang";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores";
import Link from "next/link";
import axios from "axios";
import { TokenTable } from "../components/token-table/token-table";

const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;

const Overview = observer(() => {
	const t = useTranslation();
	const {
		userStore,
		tokensStore: { getTokens, tokens },
		metricsStore: { isLoadingMetrics, getMetrics, errorMetrics, metrics },
	} = useStore();

	useEffect(() => {
		getTokens();
	}, [getTokens]);

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
				<TokenTable data={[...tokens]} />
				{/* <LiquidityChart /> */}
			</div>
		</div>
	);
});

export async function getServerSideProps() {
	const responses = await Promise.all([
		axios({ url: `${API_URL}/overview/v1/metrics` }),
		axios({ url: `${API_URL}/tokens/v2/all` }),
		axios({ url: `${API_URL}/tokens/v2/mcap` }),
		axios({ url: `https://raw.githubusercontent.com/osmosis-labs/assetlists/main/osmosis-1/osmosis-1.assetlist.json` }),
	]);

	return {
		props: {
			initialState: {
				metricsState: responses[0].data,
				tokensState: { tokens: responses[1].data, marketCap: responses[2].data, assetList: responses[3].data },
			},
		},
	};
}

export default Overview;
