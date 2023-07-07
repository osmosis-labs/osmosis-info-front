import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-multi-lang";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores";
import Link from "next/link";
import axios from "axios";
import { TokenTable } from "../components/token-table/token-table";
import { PoolTable } from "../components/pool-table/pool-table";
import { DivMaxWidth } from "../components/main-layout/div-max-width";
import { LiquidityChart } from "../components/charts/liquidity-chart/liquidity-chart";
import { VolumeChart } from "../components/charts/volume-chart/volume-chart";
import { Paper } from "@latouche/osmosis-info-ui";
import { Metrics } from "./home/metrics/metrics";
import { Token } from "../stores/api/tokens/tokens";
import { Pool } from "../stores/api/pools/Pools";

const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;

const Overview = observer(() => {
	const t = useTranslation();
	const {
		tokensStore: { getTokens, tokens },
		poolsStore: { pools },
		favoriteStore: { tokens: favoritesTokens, pools: favoritesPools },
		metricsStore: { getMetrics, errorMetrics },
	} = useStore();
	const [tokensFavorites, setTokensFavorites] = React.useState<Token[]>([]);
	const [poolsFavorites, setPoolsFavorites] = React.useState<Pool[]>([]);

	const tokensMain = useMemo(() => {
		return [...tokens.filter((token) => token.main)];
	}, [tokens]);

	const poolsMain = useMemo(() => {
		return [...pools.filter((pool) => pool.main)];
	}, [pools]);

	useEffect(() => {
		setTokensFavorites([...tokensMain.filter((token) => favoritesTokens.includes(token.symbol))]);
	}, [favoritesTokens, tokensMain]);

	useEffect(() => {
		setPoolsFavorites([...poolsMain.filter((pool) => favoritesPools.includes(pool.id.toString()))]);
	}, [favoritesPools, poolsMain]);

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
				<div className="flex w-full mt-4 md:flex-col">
					<div className="flex w-1/2 md:w-full">
						<div className="pr-4 pl-2 md:p-0 w-full">
							<LiquidityChart />
						</div>
					</div>
					<div className="flex w-1/2 md:w-full md:mt-4">
						<div className="pr-2 pl-4  md:p-0 w-full">
							<VolumeChart />
						</div>
					</div>
				</div>
				<Metrics />
				<p className="mt-8 mx-2">{t("overview.watchlistTokens")}</p>
				<Paper className="mt-4 mx-2">
					{tokensFavorites.length === 0 ? (
						<p>{t("overview.watchlistTokensEmpty")}</p>
					) : (
						<TokenTable data={tokensFavorites} autoHeight={true} />
					)}
				</Paper>
				<p className="mt-8 mx-2">{t("overview.watchlistPools")}</p>
				<Paper className="mt-4 mx-2">
					{poolsFavorites.length === 0 ? (
						<p>{t("overview.watchlistPoolsEmpty")}</p>
					) : (
						<PoolTable data={poolsFavorites} autoHeight={true} />
					)}
				</Paper>
				<p className="mt-8 mx-2">Tokens</p>
				<Paper className="mt-4 mx-2">
					<TokenTable data={tokensMain} />
				</Paper>
				<p className="mt-8 mx-2">Pools</p>
				<Paper className="mt-4 mx-2">
					<PoolTable data={poolsMain} />
				</Paper>
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
