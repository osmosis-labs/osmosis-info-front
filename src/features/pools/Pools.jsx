import { makeStyles, useMediaQuery } from "@material-ui/core"
import { useEffect } from "react"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import BlocLoaderOsmosis from "../../components/loader/BlocLoaderOsmosis"
import Paper from "../../components/paper/Paper"
import { usePoolsV2 } from "../../contexts/PoolsV2.provider"
import { useWatchlistPools } from "../../contexts/WatchlistPoolsProvider"
import { getInclude } from "../../helpers/helpers"
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
	const { pools, loadingPools } = usePoolsV2()
	// get pools from watch list
	const { watchlistPools } = useWatchlistPools()
	const [poolsOnWatchlist, setPoolsOnWatchlist] = useState([])
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
						textEmpty={"Any rows"}
						size={size}
						onClickPool={onClickPool}
						sortable={true}
					/>
				) : (
					<p>Saved pools will appear here</p>
				)}
			</Paper>
			<p className={classes.subTitle}>All pools</p>
			<Paper className={classes.containerLoader}>
				<BlocLoaderOsmosis open={loadingPools} borderRadius={true} />
				<PoolsTable data={pools} onClickPool={onClickPool} />
			</Paper>
		</div>
	)
}

export default Pools
