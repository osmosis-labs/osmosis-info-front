import { makeStyles } from "@material-ui/core"
import { useState } from "react"
import useFocus from "../../hooks/FocusHook"
import DialogSearch from "./DialogSearch"
import { getInclude, normalize } from "../../helpers/helpers"
import { useEffect } from "react"
import { useCallback } from "react"
import { useWatchlistPools } from "../../contexts/WatchlistPoolsProvider"
import { useHistory } from "react-router-dom"
import { useWatchlistTokens } from "../../contexts/WatchlistTokensProvider"
import PoolsTable from "../../features/pools/poolsTable/poolsTable"
import TokensTable from "../../features/tokens/tokensTable/tokensTable"
import { useSettings } from "../../contexts/SettingsProvider"
import { useTokens } from "../../hooks/data/tokens.hook"
import { usePools } from "../../hooks/data/pools.hook"

const useStyles = makeStyles((theme) => {
	return {
		searchRoot: {
			margin: `${theme.spacing(3)}px ${theme.spacing(4)}px ${theme.spacing(3)}px ${theme.spacing(2)}px`,
			zIndex: theme.zIndex.appBar - 2,
			[theme.breakpoints.down("sm")]: {
				display: "flex",
				alignItem: "center",
				justifyContent: "center",
				margin: `${theme.spacing(2)}px `,
			},
		},

		input: {
			backgroundColor: theme.palette.primary.light,
			color: theme.palette.gray.contrastText,
			outline: "none",
			border: "none",
			padding: theme.spacing(1),
			borderRadius: theme.spacing(2),
			width: "300px",
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
		headerClass: {
			backgroundColor: theme.palette.primary.dark,
			borderRadius: 0,
		},
	}
})

const Search = () => {
	const classes = useStyles()
	const [inputRef, setInputFocus] = useFocus()
	const { settings, updateSettings } = useSettings()

	const setSettingsPools = (poolTableSearch) => {
		updateSettings({ poolTableSearch })
	}

	const setSettingsTokens = (tokenTableSearch) => {
		console.log("Search.jsx -> 91: settings", tokenTableSearch)
		updateSettings({ tokenTableSearch })
	}
	const [open, setOpen] = useState(false)
	const [sizePool, setSizePool] = useState(3)
	const [sizeToken, setSizeToken] = useState(3)
	const [active, setActive] = useState("all")
	const [inputSearch, setInputSearch] = useState("")

	const {
		data: { current: pools },
	} = usePools({})

	const { watchlistPools } = useWatchlistPools()
	const { watchlistTokens } = useWatchlistTokens()
	const [dataShowPools, setDataShowPools] = useState([])
	const [dataShowTokens, setDataShowTokens] = useState([])
	const [rowPerPageToken, setRowPerPageToken] = useState(10)
	const [rowPerPagePool, setRowPerPagePool] = useState(10)
	const history = useHistory()
	const {
		data: { current: tokens },
	} = useTokens()

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
		return dataSorted.filter(
			(value) =>
				normalize(value.name).includes(normalize(searchInput)) ||
				normalize(value.symbol).includes(normalize(searchInput))
		)
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
		let data = getSearchedData(dataSort, inputSearch)
		setDataShowPools(data)
	}, [pools, inputSearch, watchlistPools, getSearchedData, active])

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
		let data = getSearchedData(dataSort, inputSearch)
		setDataShowTokens(data)
	}, [tokens, inputSearch, watchlistTokens, getSearchedData, active])

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

	const notifChangeRowPerPageToken = (nb) => {
		setRowPerPageToken(nb)
	}

	const notifChangeRowPerPagePool = (nb) => {
		setRowPerPagePool(nb)
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
					<TokensTable
						data={dataShowTokens}
						onClickToken={onClickToken}
						headerClass={classes.headerClass}
						maxRowDisplay={sizeToken}
						hideFooter={sizeToken < rowPerPageToken}
						settings={settings.tokenTableSearch}
						setSettings={setSettingsTokens}
						notifChangeRowPerPage={notifChangeRowPerPageToken}
					/>
					{sizePool < rowPerPageToken && (
						<p className={classes.showMore} onClick={onClickShowMoreToken}>
							Show more...
						</p>
					)}

					<PoolsTable
						data={dataShowPools}
						onClickPool={onClickPool}
						headerClass={classes.headerClass}
						maxRowDisplay={sizePool}
						hideFooter={sizePool < rowPerPagePool}
						settings={settings.poolTableSearch}
						setSettings={setSettingsPools}
						notifChangeRowPerPage={notifChangeRowPerPagePool}
					/>
					{sizeToken < rowPerPagePool && (
						<p className={classes.showMore} onClick={onClickShowMorePool}>
							Show more...
						</p>
					)}
				</div>
			</DialogSearch>
		</div>
	)
}

export default Search
