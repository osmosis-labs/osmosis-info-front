import { makeStyles } from "@material-ui/core"
import { useCallback, useState } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Toast from "../../components/toast/Toast"
import Overview from "../overview/Overview"
import Pools from "../pools/Pools"
import Tokens from "../tokens/Tokens"
import AppBar from "../../components/appBar/AppBar"
import { PoolsProvider } from "../../contexts/PoolsProvider"
import { ChartsProvider } from "../../contexts/ChartsProvider"
import Pool from "../pools/pool/Pool"
import { WatchlistPoolsProvider } from "../../contexts/WatchlistPoolsProvider"
import InfoBar from "../../components/appBar/Infobar"
import { PricesProvider } from "../../contexts/PricesProvider"
import { TokensProvider } from "../../contexts/TokensProvider"
import { WatchlistTokensProvider } from "../../contexts/WatchlistTokensProvider"
import Token from "../tokens/token/Token"
import LoaderOsmosis from "../../components/loader/LoaderOsmosis"
import { LoaderProvider } from "../../contexts/LoaderProvider"
import { SettingsProviders } from "../../contexts/SettingsProvider"
import { MetricsProvider } from "../../contexts/MetricsProvider"
import OverviewMetrics from "../overview/metrics/OverviewMetrics"
const useStyles = makeStyles((theme) => {
	return {
		appRoot: {
			fontFamily: "'Inter', sans-serif",
			padding: `0 0 ${theme.spacing(4)}px 0`,
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
			minHeight: "calc(100vh - 126px)",
			overflow: "auto",
			[theme.breakpoints.down("sm")]: {
				paddingTop: "157px",
			},
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

	return (
		<BrowserRouter>
			<Switch>
				<>
					<SettingsProviders>
						<PoolsProvider>
							<TokensProvider>
								<ChartsProvider>
									<WatchlistPoolsProvider>
										<WatchlistTokensProvider>
											<LoaderProvider>
												<LoaderOsmosis />
												<div className={classes.appRoot}>
													<Toast
														open={stateToast.open}
														severity={stateToast.severity}
														message={stateToast.text}
														handleClose={closeToast}
													/>
													<PricesProvider>
														<InfoBar />
													</PricesProvider>
													<AppBar />
													<div className={classes.container}>
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
													</div>
												</div>
											</LoaderProvider>
										</WatchlistTokensProvider>
									</WatchlistPoolsProvider>
								</ChartsProvider>
							</TokensProvider>
						</PoolsProvider>
					</SettingsProviders>
				</>
			</Switch>
		</BrowserRouter>
	)
}

export default App
