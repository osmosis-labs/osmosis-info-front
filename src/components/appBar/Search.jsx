import { makeStyles, useMediaQuery } from "@material-ui/core"
import { useState } from "react"
import PoolsTable from "../../features/pools/PoolsTable"
import useFocus from "../../hooks/FocusHook"
import DialogSearch from "./DialogSearch"
import { getInclude, normalize } from "../../helpers/helpers"
import { useEffect } from "react"
import { useCallback } from "react"
import { useWatchlistPools } from "../../contexts/WatchlistPoolsProvider"
import { useHistory } from "react-router-dom"
import { useWatchlistTokens } from "../../contexts/WatchlistTokensProvider"
import TokensTable from "../../features/tokens/TokensTable"
import { usePoolsV2 } from "../../contexts/PoolsV2.provier"
import { useTokensV2 } from "../../contexts/TokensV2.provider"

const useStyles = makeStyles((theme) => {
	return {
		searchRoot: {
			margin: `${theme.spacing(3)}px ${theme.spacing(4)}px ${theme.spacing(3)}px ${theme.spacing(2)}px`,
			[theme.breakpoints.down("sm")]: {
				display: "flex",
				alignItem: "center",
				justifyContent: "center",
				margin: `${theme.spacing(1)}px ${theme.spacing(3)}px ${theme.spacing(2)}px ${theme.spacing(3)}px`,
			},
		},

		input: {
			backgroundColor: theme.palette.primary.light,
			color: theme.palette.gray.contrastText,
			outline: "none",
			border: "none",
			zIndex: "1000",
			padding: theme.spacing(1),
			borderRadius: theme.spacing(2),
			width: "500px",
			fontSize: "16px",
			"&::placeholder": {
				color: theme.palette.gray.dark,
			},
			[theme.breakpoints.down("sm")]: {
				width: "90%",
			},
		},

		actions: {
			display: "flex",
			flexDirection: "row",
		},
		action: {
			margin: theme.spacing(1),
			padding: theme.spacing(1),
			color: theme.palette.gray.dark,
			backgroundColor: theme.palette.primary.dark2,
			borderRadius: theme.spacing(2),
			fontSize: "12px",
			cursor: "pointer",
		},
		actionActive: {
			color: theme.palette.primary.contrastText,
			backgroundColor: theme.palette.primary.light,
			borderRadius: theme.spacing(2),
		},
		resultContainer: {},
		showMore: {
			color: theme.palette.gray.dark,
			cursor: "pointer",
			paddingTop: theme.spacing(2),
			"&:hover": {
				color: theme.palette.gray.main,
			},
		},
	}
})

const Search = () => {
	const classes = useStyles()
	const [inputRef, setInputFocus] = useFocus()
	const [open, setOpen] = useState(false)
	const [sizePool, setSizePool] = useState(3)
	const [sizeToken, setSizeToken] = useState(3)
	const [active, setActive] = useState("all")
	const [inputSearch, setInputSearch] = useState("")
	const matchXS = useMediaQuery((theme) => theme.breakpoints.down("xs"))
	const matchSM = useMediaQuery((theme) => theme.breakpoints.down("sm"))
	const { pools } = usePoolsV2()
	const { tokens } = useTokensV2()
	const { watchlistPools } = useWatchlistPools()
	const { watchlistTokens } = useWatchlistTokens()
	const [dataShowPools, setDataShowPools] = useState([])
	const [dataShowTokens, setDataShowTokens] = useState([])
	const history = useHistory()

	const handleOpen = () => {
		setOpen(true)
		setInputFocus()
	}
	const handleClose = () => {
		setInputSearch("")
		setOpen(false)
	}

	const getSearchedData = useCallback((data, searchInput, size) => {
		let dataSorted = [...data]
		dataSorted.sort((a, b) => {
			if (b.liquidity < a.liquidity) {
				return -1
			}
			if (b.liquidity > a.liquidity) {
				return 1
			}
			return 0
		})
		return dataSorted
			.filter(
				(value) =>
					normalize(value.name).includes(normalize(searchInput)) ||
					normalize(value.symbol).includes(normalize(searchInput))
			)
			.slice(0, size)
	}, [])

	useEffect(() => {
		let dataSort = []
		if (active === "all") {
			dataSort = pools
		} else if (active === "watchlist") {
			dataSort = pools.filter((pool) => {
				let index = getInclude(watchlistPools, (plId) => {
					return plId === pool.id
				})
				return index >= 0
			})
		}
		let data = getSearchedData(dataSort, inputSearch, sizePool)
		setDataShowPools(data)
	}, [pools, inputSearch, watchlistPools, getSearchedData, active, sizePool])

	useEffect(() => {
		let dataSort = []
		if (active === "all") {
			dataSort = tokens
		} else if (active === "watchlist") {
			dataSort = tokens.filter((token) => {
				let index = getInclude(watchlistTokens, (symbol) => {
					return symbol === token.symbol
				})
				return index >= 0
			})
		}
		let data = getSearchedData(dataSort, inputSearch, sizeToken)
		setDataShowTokens(data)
	}, [tokens, inputSearch, watchlistTokens, getSearchedData, active, sizeToken])

	const getSize = () => {
		if (matchXS) return "xs"
		if (matchSM) return "sm"
		return "md"
	}

	const onClickPool = (pool) => {
		handleClose()
		history.push(`/pool/${pool.id}`)
	}

	const onClickToken = (token) => {
		handleClose()
		history.push(`/token/${token.symbol}`)
	}

	const onClickShowMorePool = () => {
		setSizePool(sizePool + 2)
	}

	const onClickShowMoreToken = () => {
		setSizeToken(sizeToken + 2)
	}

	return (
		<div className={classes.searchRoot}>
			<input
				placeholder="Search pools or tokens"
				ref={inputRef}
				onChange={(e) => {
					setInputSearch(e.target.value)
				}}
				className={classes.input}
				onClick={handleOpen}
				value={inputSearch}
			/>
			<DialogSearch open={open} handleClose={handleClose}>
				<div className={classes.actions}>
					<p
						onClick={() => {
							setActive("all")
						}}
						className={active === "all" ? `${classes.action} ${classes.actionActive}` : `${classes.action}`}
					>
						Search
					</p>
					<p
						onClick={() => {
							setActive("watchlist")
						}}
						className={active === "watchlist" ? `${classes.action} ${classes.actionActive}` : `${classes.action}`}
					>
						Watchlist
					</p>
				</div>
				<div className={classes.resultContainer}>
					<PoolsTable
						data={dataShowPools}
						textEmpty={active === "all" ? "Any rows" : "Saved pools will appear here"}
						size={getSize()}
						onClickPool={onClickPool}
						sortable={false}
					/>
					<p className={classes.showMore} onClick={onClickShowMorePool}>
						Show more...
					</p>
					<TokensTable
						data={dataShowTokens}
						textEmpty={active === "all" ? "Any rows" : "Saved Tokens will appear here"}
						size={getSize()}
						onClickToken={onClickToken}
						sortable={false}
					/>
					<p className={classes.showMore} onClick={onClickShowMoreToken}>
						Show more...
					</p>
				</div>
			</DialogSearch>
		</div>
	)
}

export default Search
