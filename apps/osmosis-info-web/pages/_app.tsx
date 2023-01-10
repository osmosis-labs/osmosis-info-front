import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "@latouche/osmosis-info-ui/lib/styles.css";
import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { StoreProvider } from "../stores";
import MainLayout from "../components/main-layout/main-layout";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import updateLocale from "dayjs/plugin/updateLocale";
import en from "../localizations/en.json";
import fr from "../localizations/fr.json";
import { DEFAULT_LANGUAGE } from "../stores/app/settings-store/language";
import { setDefaultLanguage, setTranslations } from "react-multi-lang";
import dayjsLocaleEn from "../localizations/dayjs-locale-en.js";
import dayjsLocaleFr from "../localizations/dayjs-locale-fr.js";
dayjs.extend(utc);
dayjs.extend(updateLocale);
setDefaultLanguage(DEFAULT_LANGUAGE.value);
setTranslations({ en, fr });
dayjs.updateLocale("en", dayjsLocaleEn);
dayjs.updateLocale("fr", dayjsLocaleFr);

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
