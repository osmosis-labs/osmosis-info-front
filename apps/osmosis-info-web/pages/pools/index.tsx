import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-multi-lang";
import axios from "axios";
import { useStore } from "../../stores";
import { Paper } from "@latouche/osmosis-info-ui";
import { PoolTable } from "../../components/pool-table/pool-table";
import { Pool } from "../../stores/api/pools/pools";
import { observer } from "mobx-react-lite";
const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;

const Pools = observer(() => {
	const t = useTranslation();
	const {
		poolsStore: { pools },
		favoriteStore: { pools: favoritesPools },
	} = useStore();
	const [poolsFavorites, setPoolsFavorites] = React.useState<Pool[]>([]);

	const poolsMain = useMemo(() => {
		return [...pools.filter((pool) => pool.main)];
	}, [pools]);

	useEffect(() => {
		setPoolsFavorites([...poolsMain.filter((pool) => favoritesPools.includes(pool.id.toString()))]);
	}, [favoritesPools, poolsMain]);

	return (
		<div className="w-full">
			<h1 className="text-2xl">{t("pools.title")}</h1>
			<p className="mt-8 mx-2">{t("overview.watchlistPools")}</p>
			<Paper className="mt-4 mx-2">
				{poolsFavorites.length === 0 ? (
					<p>{t("overview.watchlistPoolsEmpty")}</p>
				) : (
					<PoolTable data={poolsFavorites} autoHeight={true} />
				)}
			</Paper>
			<p className="mt-8 mx-2">{t("pools.allPools")}</p>
			<Paper className="mt-4 mx-2">
				<PoolTable data={poolsMain} />
			</Paper>
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
		axios({ url: `${API_URL}/tokens/v2/top/gainers` }),
		axios({ url: `${API_URL}/tokens/v2/top/losers` }),
	]);

	return {
		props: {
			initialState: {
				metricsState: responses[0].data,
				tokensState: { tokens: responses[1].data, marketCap: responses[2].data, assetList: responses[3].data },
				poolsState: { pools: responses[4].data, apr: responses[5].data, fees: responses[6].data },
				liquidityChartState: responses[7].data,
				volumeChartState: responses[8].data,
				topsState: {
					gainers: responses[9].data,
					losers: responses[10].data,
				},
			},
		},
	};
}

export default Pools;
