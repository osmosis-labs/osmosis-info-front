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
const useStyles = makeStyles((theme) => {
	return {
		appRoot: {
			fontFamily: "'Inter', sans-serif",
			padding: `0 0 ${theme.spacing(4)}px 0`,
			minHeight: "100vh",
			width: "100ww",
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
			minHeight: "calc(100vh - 140px)",
			overflow: "auto",
			[theme.breakpoints.down("sm")]: {
				paddingTop: "170px",
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
					<PoolsProvider>
						<TokensProvider>
							<ChartsProvider>
								<WatchlistPoolsProvider>
									<WatchlistTokensProvider>
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
												<div className={classes.content}>
													<Route path="/" exact={true}>
														<Overview showToast={showToast} />
													</Route>
													<Route path="/pools">
														<Pools showToast={showToast} />
													</Route>
													<Route path="/pool/:id">
														<Pool showToast={showToast} />
													</Route>
													<Route path="/tokens">
														<Tokens showToast={showToast} />
													</Route>
													<Route path="/token/:symbol">
														<Token showToast={showToast} />
													</Route>
												</div>
											</div>
										</div>
									</WatchlistTokensProvider>
								</WatchlistPoolsProvider>
							</ChartsProvider>
						</TokensProvider>
					</PoolsProvider>
				</>
			</Switch>
		</BrowserRouter>
	)
}

export default App
