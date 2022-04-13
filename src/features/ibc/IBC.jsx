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
import IbcTable from "./ibcTable/ibcTable"
import IBCwatchlist from "./IBCwatchlist"
const useStyles = makeStyles((theme) => {
	return {
		IBCRoot: {
			position: "relative",
			display: "flex",
			flexDirection: "column",
			minHeight: "200px",
			alignItems: "center",
		},
		loading: {
			backgroundColor: theme.palette.primary.dark2,
		},

		subTitle: {
			alignSelf: "flex-start",
			margin: `60px 0 20px 0`,
			fontSize: "1.5rem",
		},
		container: {
			width: "100vw",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		},
		content: {
			overflowX: "hidden",
			maxWidth: "1200px",
			width: "90%",
		},
		info: {
			margin: `${theme.spacing(2)}px 0`,
		},
		table: {
			marginBottom: "60px",
		},
		containerTable: {
			position: "relative",
			overflowX: "hidden",
			minHeight: "200px",
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
				return (
					getInclude(ibc, (item) => {
						return item.token_name.toLowerCase().includes(value.toLowerCase())
					}) !== -1
				)
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
			<div className={classes.container}>
				<div className={classes.content}>
					<IBCwatchlist ibcCouple={ibcCouple} />
					<p className={classes.subTitle}>IBC list</p>
					<IBCSearch ibcSearch={ibcSearch} setIbcSearch={setIbcSearch} />
					<div className={classes.containerTable}>
						<IbcTable
							data={ibcSearchList}
							updateWatchlistIBC={updateWatchlistIBC}
							isInWatchlist={isInWatchlist}
							className={classes.table}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default IBC
