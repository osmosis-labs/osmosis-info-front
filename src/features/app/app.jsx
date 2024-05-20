import { makeStyles, ThemeProvider } from "@material-ui/core"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Helmet } from "react-helmet"
import Toast from "../../components/toast/Toast"
import Overview from "../overview/Overview"
import Pools from "../pools/Pools"
import Tokens from "../tokens/Tokens"
import AppBar from "../../components/appBar/AppBar"
import Pool from "../pools/pool/Pool"
import { WatchlistPoolsProvider } from "../../contexts/WatchlistPoolsProvider"
import InfoBar from "../../components/appBar/Infobar"
import { WatchlistTokensProvider } from "../../contexts/WatchlistTokensProvider"
import Token from "../tokens/token/Token"
import LoaderOsmosis from "../../components/loader/LoaderOsmosis"
import { LoaderProvider } from "../../contexts/LoaderProvider"
import IBC from "../ibc/IBC"
import { WatchlistIBCProvider } from "../../contexts/WatchlistIBCProvider"
import NotFound from "../404/notFound"
import { useThemeCustom } from "../../contexts/ThemeProvider"
import { KeplrProvider } from "../../contexts/KeplrProvider"
import { ToastProvider } from "../../contexts/Toast.provider"
import { getKeplrFromWindow } from "@keplr-wallet/stores"
import { KeplrWalletConnectV1, WalletManagerProvider } from "cosmodal"
import keplrLogo from "./keplr.png"
import walletConnectLogo from "./wallet-connect.png"
import Analytics from "../dashboard/analytics/analytics"
import Transactions from "../dashboard/transactions/transactions"
import Trades from "../dashboard/trades/trades"
import { DebugProvider } from "../../contexts/debug.provider"
import DebugModal from "../_debug/debug_modal"
import ModalMessage from "../modal_message/modal_message"
import { MadeFixe, MadeSimpleText } from "../../components/made/made"

let MODE = "production"
if (process.env.REACT_APP_ENV && process.env.REACT_APP_ENV !== "production" && process.env.REACT_APP_DEBUG === "true") {
	MODE = "dev"
}

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

			"::-webkit-scrollbar-thumb:hover": {},
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
			paddingTop: `${theme.menuHeight.desktop}px`,
			paddingBottom: `30px`,
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			height: "100vh",
			overflow: "hidden",
			[theme.breakpoints.down("sm")]: {
				paddingTop: `${theme.menuHeight.mobile}px`,
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

const App = () => {
	const classes = useStyles()

	return (
		<BrowserRouter basename=".">
			<DebugProvider MODE={MODE}>
				<WalletManagerProvider walletInfoList={walletInfoList}>
					<WatchlistPoolsProvider>
						<WatchlistTokensProvider>
							<WatchlistIBCProvider>
								<KeplrProvider>
									<LoaderProvider>
										<ToastProvider>
											{MODE === "dev" ? <DebugModal /> : null}
											<ModalMessage />
											<LoaderOsmosis />
											<Helmet>
												<script src="/charting_library/charting_library.js" type="text/javascript" />
											</Helmet>
											<div className={classes.appRoot}>
												<Toast />

												<InfoBar />
												<AppBar />
												<div className={classes.container}>
													<div className={classes.contentContainer} id="mainContainer">
														{/* <Switch>
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
																<IBC />
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
														</Switch> */}
														<p>
															info.osmosis.zone has been deprecated. Historical Osmosis info can be found on 
															<span><a href="app.osmosis.zone">app.osmosis.zone</a></span> and 
															<span><a href="https://www.datalenses.zone/chain/osmosis">https://www.datalenses.zone/chain/osmosis</a></span>
														</p>

														{/* <MadeFixe /> */}
													</div>
												</div>
											</div>
										</ToastProvider>
									</LoaderProvider>
								</KeplrProvider>
							</WatchlistIBCProvider>
						</WatchlistTokensProvider>
					</WatchlistPoolsProvider>
				</WalletManagerProvider>
			</DebugProvider>
		</BrowserRouter>
	)
}

const themeWrapper = () => {
	const theme = useThemeCustom()
	return (
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	)
}

export default themeWrapper
