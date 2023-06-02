import React, { useEffect } from "react";
import axios from "axios";
import { useStore } from "../../stores";
const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;

const Token = ({ symbol }: { symbol: string }) => {
	const { tokensStore } = useStore();

	useEffect(() => {
		tokensStore.getTokens();
		// const tokenStore = tokensStore.getToken(symbol);
	}, [symbol, tokensStore]);

	return (
		<div className="w-full">
			<h1 className="text-2xl">Token: {symbol}</h1>
		</div>
	);
};

export async function getServerSideProps(test: any) {
	const symbol = test.params.symbol;
	const responses = await Promise.all([
		axios({ url: `${API_URL}/tokens/v2/${symbol}` }),
		axios({ url: `${API_URL}/tokens/v2/all` }),
		axios({ url: `${API_URL}/tokens/v2/mcap` }),
		axios({ url: `https://raw.githubusercontent.com/osmosis-labs/assetlists/main/osmosis-1/osmosis-1.assetlist.json` }),
	]);

	return {
		props: {
			symbol,
			initialState: {
				tokenState: responses[0].data,
				tokensState: { tokens: responses[1].data, marketCap: responses[2].data, assetList: responses[3].data },
			},
		},
	};
}

export default Token;
