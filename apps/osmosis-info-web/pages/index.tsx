import React, { useEffect } from "react";
import { useTranslation } from "react-multi-lang";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores";
import Link from "next/link";
import axios from "axios";
import { TokenTable } from "../components/token-table/token-table";
import { PoolTable } from "../components/pool-table/pool-table";
import { DivMaxWidth } from "../components/main-layout/div-max-width";
import { LiquidityChart } from "../components/liquidity-chart/liquidity-chart";

const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;

const Overview = observer(() => {
	const t = useTranslation();
	const {
		userStore,
		tokensStore: { getTokens, tokens },
		poolsStore: { pools },
		metricsStore: { isLoadingMetrics, getMetrics, errorMetrics, metrics },
		liquidityStore: { liquidityDay, liquidityWeek, liquidityMonth },
		volumeStore: { volumeDay, volumeWeek, volumeMonth },
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

			<div>
				<div className="flex ">
					<LiquidityChart />
				</div>
				<TokenTable data={[...tokens.filter((token) => token.main)]} />
				<PoolTable data={[...pools.filter((pool) => pool.main)]} />
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
		axios({ url: `${API_URL}/pools/v2/all?low_liquidity=false` }),
		axios({ url: `${API_URL}/apr/v2/all` }),
		axios({ url: `${API_URL}/fees/v1/pools` }),
		axios({ url: `${API_URL}/liquidity/v2/historical/chart` }),
		axios({ url: `${API_URL}/volume/v2/historical/chart` }),
	]);

	return {
		props: {
			initialState: {
				metricsState: responses[0].data,
				tokensState: { tokens: responses[1].data, marketCap: responses[2].data, assetList: responses[3].data },
				poolsState: { pools: responses[4].data, apr: responses[5].data, fees: responses[6].data },
				liquidityChartState: responses[7].data,
				volumeChartState: responses[8].data,
			},
		},
	};
}

export default Overview;
