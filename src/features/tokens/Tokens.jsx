import { makeStyles, useMediaQuery } from "@material-ui/core"
import { useEffect } from "react"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import BlocLoaderOsmosis from "../../components/loader/BlocLoaderOsmosis"
import Paper from "../../components/paper/Paper"
import { useTokens } from "../../contexts/TokensProvider"
import { useWatchlistTokens } from "../../contexts/WatchlistTokensProvider"
import { getInclude } from "../../helpers/helpers"
import TokensTable from "./TokensTable"

const useStyles = makeStyles((theme) => {
	return {
		tokensRoot: {
			display: "grid",
			gridAutoRows: "auto",
			rowGap: theme.spacing(2),
			margin: `${theme.spacing(2)}px 0`,
		},
		containerLoader:{
			position: "relative",
			minHeight: "200px"
		}
	}
})

const Tokens = () => {
	const classes = useStyles()
	const { tokens, loadingTokens } = useTokens()
	// get tokens from watch list
	const { watchlistTokens } = useWatchlistTokens()
	const [tokensOnWatchlist, setTokensOnWatchlist] = useState([])
	const history = useHistory()
	const [size, setSize] = useState("xl")
	const matchXS = useMediaQuery((theme) => theme.breakpoints.down("xs"))
	const matchSM = useMediaQuery((theme) => theme.breakpoints.down("sm"))
	const matchMD = useMediaQuery((theme) => theme.breakpoints.down("md"))
	const matchLD = useMediaQuery((theme) => theme.breakpoints.down("ld"))

	useEffect(() => {
		if (matchXS) {
			setSize("xs")
		} else if (matchSM) {
			setSize("sm")
		} else if (matchMD) {
			setSize("md")
		} else if (matchLD) {
			setSize("ld")
		} else {
			setSize("xl")
		}
	}, [matchXS, matchSM, matchMD, matchLD])

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
			<Paper>
				{watchlistTokens.length > 0 ? (
					<TokensTable
						data={tokensOnWatchlist}
						textEmpty={"Any rows"}
						size={size}
						onClickToken={onClickToken}
						sortable={true}
					/>
				) : (
					<p>Saved tokens will appear here</p>
				)}
			</Paper>
			<p className={classes.subTitle}>All tokens</p>
			<Paper className={classes.containerLoader}>
				<BlocLoaderOsmosis open={loadingTokens} borderRadius={true} />
				<TokensTable data={tokens} textEmpty={"Any rows"} size={size} onClickToken={onClickToken} sortable={true} />
			</Paper>
		</div>
	)
}

export default Tokens
