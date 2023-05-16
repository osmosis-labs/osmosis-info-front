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
			<Paper className="p-2 m-2 bg-primary-600 w-fit min-w-[260px] rounded-sm cursor-pointer hover:bg-primary-700 transition-colors duration-default">
				<p>id: {tokenStore.id}</p>
				<p>symbol: {tokenStore.symbol}</p>
				<p>price: {tokenStore.price}</p>
			</Paper>
		</Link>
	);
});

export async function getServerSideProps() {
	const responses = await Promise.all([
		axios({ url: `${API_URL}/tokens/v2/all` }),
		axios({ url: `${API_URL}/tokens/v2/mcap` }),
	]);

	return {
		props: {
			initialState: {
				tokensState: { tokens: responses[0].data, marketCap: responses[1].data },
			},
		},
	};
}

export default Tokens;
