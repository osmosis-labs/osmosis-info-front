import { makeStyles, ThemeProvider } from "@material-ui/core"
import { useCallback, useState } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Helmet } from "react-helmet"
import Toast from "../../components/toast/Toast"
import Overview from "../overview/Overview"
import Pools from "../pools/Pools"
import Tokens from "../tokens/Tokens"
import AppBar from "../../components/appBar/AppBar"
import { ChartsProvider } from "../../contexts/ChartsProvider"
import Pool from "../pools/pool/Pool"
import { WatchlistPoolsProvider } from "../../contexts/WatchlistPoolsProvider"
import InfoBar from "../../components/appBar/Infobar"
import { PricesProvider } from "../../contexts/PricesProvider"
import { WatchlistTokensProvider } from "../../contexts/WatchlistTokensProvider"
import Token from "../tokens/token/Token"
import LoaderOsmosis from "../../components/loader/LoaderOsmosis"
import { LoaderProvider } from "../../contexts/LoaderProvider"
import { MetricsProvider } from "../../contexts/MetricsProvider"
import IBC from "../ibc/IBC"
import { IBCProvider } from "../../contexts/IBCProvier"
import { WatchlistIBCProvider } from "../../contexts/WatchlistIBCProvider"
import { TokensV2Provider } from "../../contexts/TokensV2.provider"
import { PoolsV2Provider } from "../../contexts/PoolsV2.provider"
import { TokenChartV2Provider } from "../../contexts/TokenChartV2"
import NotFound from "../404/notFound"
import { useThemeCustom } from "../../contexts/ThemeProvider"
import { KeplrProvider } from "../../contexts/KeplrProvider"
import { ToastProvider } from "../../contexts/Toast.provider"
import { getKeplrFromWindow } from "@keplr-wallet/stores"
import { KeplrWalletConnectV1, WalletInfo, WalletManagerProvider } from "cosmodal"
import keplrLogo from "./keplr.png"
import walletConnectLogo from "./wallet-connect.png"
import { DashboardProvider } from "../../contexts/dashboard.provider"
import Analytics from "../dashboard/analytics/analytics"
import Transactions from "../dashboard/transactions/transactions"
import Trades from "../dashboard/trades/trades"
import { DebugProvider } from "../../contexts/debug.provider"
import DebugModal from "../_debug/debug_modal"

const MODE = process.env.REACT_APP_MODE
const useStyles = makeStyles((theme) => {
	return {
		"@global": {
			"::-webkit-scrollbar": {
				width: "8px",
				cursor: "scroll",
			},
			/* Track */
			"::-webkit-scrollbar-track": {
				background: theme.palette.primary.dark,
			},

			"::-webkit-scrollbar-thumb ": {
				background: theme.palette.primary.light2,
				border: `1px solid ${theme.palette.primary.dark}`,
				borderRadius: "10px",
			},

			"::-webkit-scrollbar-thumb:hover": {
			},
		},
		appRoot: {
			fontFamily: "'Inter', sans-serif",
			minHeight: "100vh",
			// width: "100vw",
			color: theme.palette.gray.main,
			backgroundColor: theme.palette.primary.main,
			overflow: "hidden",
			fontSize: theme.fontSize.medium,
		},
		container: {
			paddingTop: "124px",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			height: "100vh",
			overflow: "hidden",
			[theme.breakpoints.down("sm")]: {
				paddingTop: "108px",
			},
		},
		contentContainer: {
			overflow: "auto",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			minWidth: "100%",
			flexGrow: 1,
		},
		content: {
			maxWidth: "1200px",
			width: "90%",
			[theme.breakpoints.down("sm")]: {
				width: "95%",
			},
		},
	}
})

const walletInfoList = [
	{
		id: "keplr-wallet-extension",
		name: "Keplr Wallet",
		description: "Keplr Browser Extension",
		logoImgUrl: keplrLogo,
		getWallet: () => getKeplrFromWindow(),
	},
	{
		id: "walletconnect-keplr",
		name: "WalletConnect",
		description: "Keplr Mobile",
		logoImgUrl: walletConnectLogo,
		getWallet: (connector) =>
			Promise.resolve(connector ? new KeplrWalletConnectV1(connector, EmbedChainInfos) : undefined),
	},
]

const AppDesktop = () => {
	const classes = useStyles()

	return (
		<BrowserRouter basename=".">
			<WalletManagerProvider walletInfoList={walletInfoList}>
				<TokensV2Provider>
					<PoolsV2Provider>
						<ChartsProvider>
							<WatchlistPoolsProvider>
								<WatchlistTokensProvider>
									<WatchlistIBCProvider>
										<PricesProvider>
											<TokenChartV2Provider>
												<MetricsProvider>
													<KeplrProvider>
														<LoaderProvider>
															<ToastProvider>
																<DashboardProvider>
																	<DebugProvider>
																		{MODE === "dev" ? <DebugModal /> : null}
																		<LoaderOsmosis />
																		<Helmet>
																			<script src="/charting_library/charting_library.js" type="text/javascript" />
																		</Helmet>
																		<div className={classes.appRoot}>
																			<Toast />

																			<InfoBar />
																			<AppBar />
																			<div className={classes.container}>
																				<div className={classes.contentContainer}>
																					<Switch>
																						<Route path="/" exact={true}>
																							<div className={classes.content}>
																								<Overview />
																							</div>
																						</Route>
																						<Route path="/pools">
																							<div className={classes.content}>
																								<Pools />
																							</div>
																						</Route>
																						<Route path="/pool/:id">
																							<div className={classes.content}>
																								<Pool />
																							</div>
																						</Route>
																						<Route path="/tokens">
																							<div className={classes.content}>
																								<Tokens />
																							</div>
																						</Route>
																						<Route path="/token/:symbol">
																							<Token />
																						</Route>
																						<Route path="/ibc">
																							<IBCProvider>
																								<IBC />
																							</IBCProvider>
																						</Route>
																						<Route exact={true} path="/dashboard/">
																							<Analytics />
																						</Route>
																						<Route path="/dashboard/transactions">
																							<Transactions />
																						</Route>
																						<Route path="/dashboard/trades">
																							<Trades />
																						</Route>
																						<Route>
																							<div className={classes.content}>
																								<NotFound />
																							</div>
																						</Route>
																					</Switch>
																				</div>
																			</div>
																		</div>
																	</DebugProvider>
																</DashboardProvider>
															</ToastProvider>
														</LoaderProvider>
													</KeplrProvider>
												</MetricsProvider>
											</TokenChartV2Provider>
										</PricesProvider>
									</WatchlistIBCProvider>
								</WatchlistTokensProvider>
							</WatchlistPoolsProvider>
						</ChartsProvider>
					</PoolsV2Provider>
				</TokensV2Provider>
			</WalletManagerProvider>
		</BrowserRouter>
	)
}

const themeWrapper = () => {
	const theme = useThemeCustom()
	return (
		<ThemeProvider theme={theme}>
			<AppDesktop />
		</ThemeProvider>
	)
}

export default themeWrapper
