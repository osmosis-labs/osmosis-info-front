import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "@latouche/osmosis-info-ui/lib/styles.css";
import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { StoreProvider } from "../stores";
import MainLayout from "../components/main-layout/main-layout";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<StoreProvider>
			<>
				<Head>
					<title>Osmosis Info</title>
					<meta name="description" content="An analytics interface for Osmosis AMM." />
					<link rel="icon" href="/logo.webp" />
				</Head>
				<ToastContainer autoClose={2000} theme="colored" />

				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</>
		</StoreProvider>
	);
};

export default App;
