import { makeStyles } from "@material-ui/core"
import { useCallback, useEffect, useState } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
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
import { SettingsProviders } from "../../contexts/SettingsProvider"
import { MetricsProvider } from "../../contexts/MetricsProvider"
import OverviewMetrics from "../overview/metrics/OverviewMetrics"
import IBC from "../ibc/IBC"
import { IBCProvider } from "../../contexts/IBCProvier"
import { WatchlistIBCProvider } from "../../contexts/WatchlistIBCProvider"
import { TokensV2Provider } from "../../contexts/TokensV2.provider"
import { PoolsV2Provider } from "../../contexts/PoolsV2.provier"
import { appUseEffect } from "../../patrickTheme/script"
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
			paddingTop: "140px",
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
		},
	}
})

// The first component, contains all app. It's the wrapper, with the menu and toast component
const App = () => {
	const classes = useStyles()
	const [stateToast, setOpenToast] = useState({
		open: false,
		text: "",
		severity: "",
	})
	const closeToast = () => {
		setOpenToast(false)
	}
	const showToast = useCallback(({ text, severity }) => {
		setOpenToast((prev) => ({ ...prev, open: true, text, severity }))
	}, [])

	useEffect(appUseEffect,[])

	return (
		<BrowserRouter basename=".">
			<Switch>
				<>
					<SettingsProviders>
						<TokensV2Provider>
							<PoolsV2Provider>
								<ChartsProvider>
									<WatchlistPoolsProvider>
										<WatchlistTokensProvider>
											<WatchlistIBCProvider>
												<PricesProvider>
													<LoaderProvider>
														<LoaderOsmosis />
														<div className={classes.appRoot}>
															<Toast
																open={stateToast.open}
																severity={stateToast.severity}
																message={stateToast.text}
																handleClose={closeToast}
															/>
															<InfoBar />
															<AppBar />
															<div className={classes.container}>
																<div className={classes.contentContainer}>
																	<Route path="/" exact={true}>
																		<MetricsProvider>
																			<OverviewMetrics />
																			<div className={classes.content}>
																				<Overview showToast={showToast} />
																			</div>
																		</MetricsProvider>
																	</Route>
																	<Route path="/pools">
																		<div className={classes.content}>
																			<Pools showToast={showToast} />
																		</div>
																	</Route>
																	<Route path="/pool/:id">
																		<div className={classes.content}>
																			<Pool showToast={showToast} />
																		</div>
																	</Route>
																	<Route path="/tokens">
																		<div className={classes.content}>
																			<Tokens showToast={showToast} />
																		</div>
																	</Route>
																	<Route path="/token/:symbol">
																		<div className={classes.content}>
																			<Token showToast={showToast} />
																		</div>
																	</Route>
																	<Route path="/ibc">
																		<IBCProvider>
																			<IBC showToast={showToast} />
																		</IBCProvider>
																	</Route>
																</div>
															</div>
														</div>
													</LoaderProvider>
												</PricesProvider>
											</WatchlistIBCProvider>
										</WatchlistTokensProvider>
									</WatchlistPoolsProvider>
								</ChartsProvider>
							</PoolsV2Provider>
						</TokensV2Provider>
					</SettingsProviders>
				</>
			</Switch>
		</BrowserRouter>
	)
}

export default App
