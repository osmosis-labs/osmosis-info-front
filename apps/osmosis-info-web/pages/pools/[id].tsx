import React, { useEffect } from "react";
import axios from "axios";
import { useStore } from "../../stores";
const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;

const Pool = ({ id }: { id: string }) => {
	const { tokensStore } = useStore();

	useEffect(() => {
		tokensStore.getTokens();
		// const tokenStore = tokensStore.getToken(id);
	}, [id, tokensStore]);

	return (
		<div className="w-full">
			<h1 className="text-2xl">Pool: {id}</h1>
		</div>
	);
};

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

export default Pool;
