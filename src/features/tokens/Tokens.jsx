import { makeStyles } from "@material-ui/core"
import { useEffect } from "react"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import BlocLoaderOsmosis from "../../components/loader/BlocLoaderOsmosis"
import Paper from "../../components/paper/Paper"
import { useDebug } from "../../contexts/debug.provider"
import { useSettings } from "../../contexts/SettingsProvider"
import { useWatchlistTokens } from "../../contexts/WatchlistTokensProvider"
import { getInclude } from "../../helpers/helpers"
import { useTokens } from "../../hooks/data/tokens.hook"
import { useScrollTop } from "../../hooks/scroll.hook"
import TokenOverview from "./tokenOverview/tokenOverview"
import TokensTable from "./tokensTable/tokensTable"

const useStyles = makeStyles((theme) => {
	return {
		tokensRoot: {
			margin: `${theme.spacing(2)}px 0`,
			display: "grid",
			gridAutoRows: "auto",
			rowGap: theme.spacing(2),
		},
		containerLoader: {
			position: "relative",
			overflowX: "hidden",
			minHeight: "200px",
		},
		containerWatchlist: {
			position: "relative",
			minWidth: "200px",
		},
		subTitle: {
			zIndex: 1,
		},
	}
})

const Tokens = () => {
	const classes = useStyles()
	const {
		data: { current: tokens },
		isLoading: loadingTokens,
		isFetching: fetchingTokens,
	} = useTokens()
	useScrollTop()
	const { isLoadingDebug } = useDebug()
	const { settings, updateSettings } = useSettings()
	const isLoading = loadingTokens || fetchingTokens || isLoadingDebug

	const setSettingsTokens = (settings) => {
		updateSettings({ tokenTable: settings })
	}
	// get tokens from watch list
	const { watchlistTokens } = useWatchlistTokens()
	const [tokensOnWatchlist, setTokensOnWatchlist] = useState([])
	const history = useHistory()

	const onClickToken = (token) => {
		history.push(`/token/${token.symbol}`)
	}

	useEffect(() => {
		let tokensWL = tokens.filter((token) => {
			let index = getInclude(watchlistTokens, (symbol) => {
				return symbol === token.symbol
			})
			return index >= 0
		})
		setTokensOnWatchlist(tokensWL)
	}, [watchlistTokens, tokens])

	return (
		<div className={classes.tokensRoot}>
			<p className={classes.subTitle}>Your watchlist</p>
			<Paper className={classes.containerWatchlist}>
				{watchlistTokens.length > 0 ? (
					<TokensTable
						data={tokensOnWatchlist}
						onClickToken={onClickToken}
						setSettings={setSettingsTokens}
						settings={settings.tokenTable}
						isLoading={isLoading}
					/>
				) : (
					<p>Saved tokens will appear here</p>
				)}
			</Paper>
			<p className={classes.subTitle}>Top movers</p>
			<TokenOverview />
			<p className={classes.subTitle}>All tokens</p>
			<Paper className={classes.containerLoader}>
				<TokensTable
					data={tokens}
					onClickToken={onClickToken}
					setSettings={setSettingsTokens}
					settings={settings.tokenTable}
					isLoading={isLoading}
				/>
			</Paper>
		</div>
	)
}

export default Tokens
