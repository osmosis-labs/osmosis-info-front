import { makeStyles } from "@material-ui/core"
import { useEffect } from "react"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import BlocLoaderOsmosis from "../../components/loader/BlocLoaderOsmosis"
import Paper from "../../components/paper/Paper"
import { useDebug } from "../../contexts/debug.provider"
import { useSettings } from "../../contexts/SettingsProvider"
import { useWatchlistPools } from "../../contexts/WatchlistPoolsProvider"
import { getInclude } from "../../helpers/helpers"
import { usePools } from "../../hooks/data/pools.hook"
import PoolsTable from "./poolsTable/poolsTable"

const useStyles = makeStyles((theme) => {
	return {
		poolsRoot: {
			display: "grid",
			gridAutoRows: "auto",
			rowGap: theme.spacing(2),
			margin: `${theme.spacing(2)}px 0`,
		},
		containerLoader: {
			overflowX: "hidden",
			position: "relative",
			minHeight: "200px",
		},
		containerWatchlist: {
			position: "relative",
			minWidth: "200px",
		},
	}
})

const Pools = () => {
	const classes = useStyles()
	const {
		data: { current: pools },
		isLoading: isLoadingPools,
		isFetching: isFetchingPools,
	} = usePools({})
	const { settings, updateSettings } = useSettings()
	const { isLoadingDebug } = useDebug()

	const isLoading = isLoadingPools || isFetchingPools || isLoadingDebug
	const setSettingsPools = (settings) => {
		updateSettings({ poolTable: settings })
	}

	// get pools from watch list
	const { watchlistPools } = useWatchlistPools()
	const [poolsOnWatchlist, setPoolsOnWatchlist] = useState([])
	const history = useHistory()

	const onClickPool = (pool) => {
		history.push(`/pool/${pool.id}`)
	}

	useEffect(() => {
		let poolsWL = pools.filter((pool) => {
			let index = getInclude(watchlistPools, (plId) => {
				return plId === pool.id
			})
			return index >= 0
		})
		setPoolsOnWatchlist(poolsWL)
	}, [watchlistPools, pools])

	return (
		<div className={classes.poolsRoot}>
			<p className={classes.subTitle}>Your watchlist</p>
			<Paper className={classes.containerWatchlist}>
				{watchlistPools.length > 0 ? (
					<PoolsTable
						data={poolsOnWatchlist}
						onClickPool={onClickPool}
						setSettings={setSettingsPools}
						settings={settings.poolTable}
						isLoading={isLoading}
					/>
				) : (
					<p>Saved pools will appear here</p>
				)}
			</Paper>
			<p className={classes.subTitle}>All pools</p>
			<Paper className={classes.containerLoader}>
				<PoolsTable
					data={pools}
					onClickPool={onClickPool}
					setSettings={setSettingsPools}
					settings={settings.poolTable}
					isLoading={isLoading}
				/>
			</Paper>
		</div>
	)
}

export default Pools
