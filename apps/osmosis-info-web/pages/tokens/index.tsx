import { Paper } from "@latouche/osmosis-info-ui";
import axios from "axios";
import { observer } from "mobx-react-lite";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-multi-lang";
import { useStore } from "../../stores";
import { Token } from "../../stores/api/tokens/tokens";
import { TokenTable } from "../../components/token-table/token-table";
import { TokensMovers } from "../../components/tokens-movers/tokens-movers";

const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;

const Tokens = observer(() => {
	const t = useTranslation();
	const {
		tokensStore: { getTokens, tokens },
		favoriteStore: { tokens: favoritesTokens },
	} = useStore();
	const [tokensFavorites, setTokensFavorites] = React.useState<Token[]>([]);

	const tokensMain = useMemo(() => {
		return [...tokens.filter((token) => token.main)];
	}, [tokens]);

	useEffect(() => {
		setTokensFavorites([...tokensMain.filter((token) => favoritesTokens.includes(token.symbol))]);
	}, [favoritesTokens, tokensMain]);

	useEffect(() => {
		getTokens();
	}, [getTokens]);

	return (
		<div>
			<h1 className="text-2xl">{t("tokens.title")}</h1>
			<p className="mt-8 mx-2">{t("overview.watchlistTokens")}</p>
			<Paper className="mt-4 mx-2">
				{tokensFavorites.length === 0 ? (
					<p>{t("overview.watchlistTokensEmpty")}</p>
				) : (
					<TokenTable data={tokensFavorites} autoHeight={true} />
				)}
			</Paper>
			<p className="mt-8 mx-2">{t("tokens.topMovers")}</p>
			<TokensMovers />
			<p className="mt-8 mx-2">{t("tokens.allTokens")}</p>
			<Paper className="mt-4 mx-2">
				<TokenTable data={tokensMain} />
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

export default Tokens;
