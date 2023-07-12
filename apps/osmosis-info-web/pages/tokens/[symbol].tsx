import React, { useEffect } from "react";
import { useStore } from "../../stores";
import { defaultGetServerSideProps } from "../../helpers/server-side-props";

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

export async function getServerSideProps() {
	return defaultGetServerSideProps();
}
export default Token;
