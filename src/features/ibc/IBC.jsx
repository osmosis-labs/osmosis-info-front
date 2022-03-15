import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import BlocLoaderOsmosis from "../../components/loader/BlocLoaderOsmosis"
import Paper from "../../components/paper/Paper"
import { MIN_BLOCKED, MIN_CONGESTED, useIBC } from "../../contexts/IBCProvier"
import { useWatchlistIBC } from "../../contexts/WatchlistIBCProvider"
import { getInclude } from "../../helpers/helpers"
import IBCInfo from "./IBCInfo"
import IBCList from "./IBCList"
import IBCSearch from "./IBCSearch"
import IBCwatchlist from "./IBCwatchlist"

const useStyles = makeStyles((theme) => {
	return {
		IBCRoot: {
			position: "relative",
			display: "flex",
			flexDirection: "column",
			flexGrow: 1,
			minHeight: "200px",
			width: "100vw",
			alignItems: "center",
		},
		loading: {
			backgroundColor: theme.palette.primary.dark2,
		},

		subTitle: {
			alignSelf: "flex-start",
			margin: `${theme.spacing(2)}px 0`,
			fontSize: "1.5rem",
		},
		content: {
			maxWidth: "1200px",
			width: "90%",
		},
		info: {
			margin: `${theme.spacing(2)}px 0`,
		},
	}
})

const IBC = () => {
	const classes = useStyles()
	const { ibcCouple, statusNormal, statusCongested, statusBlocked, getData, loaderIBC } = useIBC()

	const [timeLastUpdate, setTimeLastUpdate] = useState(0)
	const { updateWatchlistIBC, isInWatchlist } = useWatchlistIBC()
	const [ibcSearch, setIbcSearch] = useState("")
	const [ibcSearchList, setIbcSearchList] = useState([])

	const [ibcFilter, setIbcFilter] = useState("")

	const filterSearch = (list, value) => {
		let res = []
		if (!value || value.length < 3) {
			res = list
		} else {
			res = list.filter((ibc) => {
				return getInclude(ibc, (item) => {
					return item.token_name.toLowerCase().includes(value.toLowerCase())
				}) !== -1
			})
		}
		return res
	}

	const updateFilter = (value) => {
		if (value === ibcFilter) setIbcFilter("")
		else setIbcFilter(value)
	}

	const filterStatus = (list, value) => {
		let res = []
		if (!value || value.length === 0) {
			res = list
		} else {
			res = list.filter((ibc) => {
				if (value === "normal")
					return ibc[0].duration_minutes < MIN_CONGESTED || ibc[1].duration_minutes < MIN_CONGESTED
				if (value === "congested")
					return (
						(ibc[0].duration_minutes < MIN_BLOCKED && ibc[0].duration_minutes > MIN_CONGESTED) ||
						(ibc[1].duration_minutes < MIN_BLOCKED && ibc[1].duration_minutes > MIN_CONGESTED)
					)
				if (value === "blocked") return ibc[0].duration_minutes >= MIN_BLOCKED || ibc[1].duration_minutes >= MIN_BLOCKED
			})
		}
		return res
	}

	useEffect(() => {
		let list = filterSearch(ibcCouple, ibcSearch)
		list = filterStatus(list, ibcFilter)
		setIbcSearchList(list)
	}, [ibcSearch, ibcCouple, ibcFilter])

	useEffect(() => {
		const timer = setTimeout(() => {
			let newTime = timeLastUpdate + 1
			if (newTime > 60) {
				setTimeLastUpdate(0)
				getData()
			} else {
				setTimeLastUpdate(newTime)
			}
		}, 1000)
		return () => clearTimeout(timer)
	})
	return (
		<div className={classes.IBCRoot}>
			<BlocLoaderOsmosis open={loaderIBC} classNameLoading={classes.loading} />
			<IBCInfo
				timeLastUpdate={timeLastUpdate}
				statusNormal={statusNormal}
				statusCongested={statusCongested}
				statusBlocked={statusBlocked}
				nbNetwork={ibcCouple.length}
				setIbcFilter={updateFilter}
				ibcFilter={ibcFilter}
			/>
			<IBCwatchlist ibcCouple={ibcCouple} />
			<div className={classes.content}>
				<p className={classes.subTitle}>IBC list</p>
			</div>
			<IBCSearch ibcSearch={ibcSearch} setIbcSearch={setIbcSearch} />
			{ibcSearchList.length === 0 ? (
				<div className={classes.content}>
					<p className={classes.info}>No result</p>
				</div>
			) : (
				<IBCList ibcCouple={ibcSearchList} updateWatchlistIBC={updateWatchlistIBC} isInWatchlist={isInWatchlist} />
			)}
		</div>
	)
}

export default IBC
