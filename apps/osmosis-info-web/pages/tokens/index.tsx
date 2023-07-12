import { Paper } from "@latouche/osmosis-info-ui";
import { observer } from "mobx-react-lite";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-multi-lang";
import { useStore } from "../../stores";
import { Token } from "../../stores/api/tokens/tokens";
import { TokenTable } from "../../components/token-table/token-table";
import { TokensMovers } from "../../components/tokens-movers/tokens-movers";
import { defaultGetServerSideProps } from "../../helpers/server-side-props";

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
	return defaultGetServerSideProps();
}

export default Tokens;
