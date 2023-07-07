import { Paper } from "@latouche/osmosis-info-ui";
import axios from "axios";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import React, { useEffect } from "react";
import { useTranslation } from "react-multi-lang";
import { useStore } from "../../stores";
import { TokenStore } from "../../stores/api/tokens/token-store";

const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;

const Tokens = observer(() => {
	const t = useTranslation();
	const {
		tokensStore: { isLoadingTokens, errorTokens, tokens },
	} = useStore();

	useEffect(() => {
		if (errorTokens) {
			console.log("%cindex.tsx -> 18 ERROR: errorTokens", "background: #FF0000; color:#FFFFFF", errorTokens);
		}
	}, [errorTokens]);
	return (
		<div>
			<h1 className="text-2xl">{t("tokens.title")}</h1>
			<div>
				<div>
					{isLoadingTokens && "Loading Tokens"}
					{!isLoadingTokens && !errorTokens && <p>{tokens.length}</p>}
				</div>
				{!isLoadingTokens &&
					!errorTokens &&
					tokens.map((tokenStore) => <Token key={tokenStore.symbol + "*" + tokens.length} tokenStore={tokenStore} />)}
			</div>
		</div>
	);
});

const Token = observer(({ tokenStore }: { tokenStore: TokenStore }) => {
	return (
		<Link href={`/tokens/${tokenStore.symbol}`} prefetch={false}>
			<Paper className="p-2 m-2 bg-wosmongton-600 w-fit min-w-[260px] rounded-sm cursor-pointer hover:bg-wosmongton-700 transition-colors duration-default">
				<p>id: {tokenStore.id}</p>
				<p>symbol: {tokenStore.symbol}</p>
				<p>price: {tokenStore.price}</p>
			</Paper>
		</Link>
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

export default Tokens;
