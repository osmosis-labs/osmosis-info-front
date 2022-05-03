import { makeStyles, ThemeProvider } from "@material-ui/core"
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
import { ToastProvider } from "../../contexts/Toast.provider"
import { DebugProvider } from "../../contexts/debug.provider"

const MODE = process.env.REACT_APP_MODE
const useStyles = makeStyles((theme) => {
	return {
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

const AppMobile = () => {
	const classes = useStyles()
	return (
		<BrowserRouter basename=".">
			<TokensV2Provider>
				<PoolsV2Provider>
					<ChartsProvider>
						<WatchlistPoolsProvider>
							<WatchlistTokensProvider>
								<WatchlistIBCProvider>
									<PricesProvider>
										<TokenChartV2Provider>
											<MetricsProvider>
												<LoaderProvider>
													<ToastProvider>
														<DebugProvider>
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
													</ToastProvider>
												</LoaderProvider>
											</MetricsProvider>
										</TokenChartV2Provider>
									</PricesProvider>
								</WatchlistIBCProvider>
							</WatchlistTokensProvider>
						</WatchlistPoolsProvider>
					</ChartsProvider>
				</PoolsV2Provider>
			</TokensV2Provider>
		</BrowserRouter>
	)
}

const themeWrapper = () => {
	const theme = useThemeCustom()
	return (
		<ThemeProvider theme={theme}>
			<AppMobile />
		</ThemeProvider>
	)
}

export default themeWrapper
