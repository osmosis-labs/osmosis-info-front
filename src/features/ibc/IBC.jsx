import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import BlocLoaderOsmosis from "../../components/loader/BlocLoaderOsmosis"
import Paper from "../../components/paper/Paper"
import { useIBC } from "../../contexts/IBCProvier"
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
	}
})

const IBC = () => {
	const classes = useStyles()
	const { ibcCouple, statusNormal, statusCongested, statusBlocked, getData, loaderIBC } = useIBC()

	const [timeLastUpdate, setTimeLastUpdate] = useState(0)
	const { updateWatchlistIBC, isInWatchlist } = useWatchlistIBC()
	const [ibcSearch, setIbcSearch] = useState("")
	const [ibcSearchList, setIbcSearchList] = useState([])

	useEffect(() => {
		if (!ibcSearch || ibcSearch.length < 3) {
			setIbcSearchList(ibcCouple)
		} else {
			let list = ibcCouple.filter((ibc) => {
				return getInclude(ibc, (item) => item.token_name.toLowerCase().includes(ibcSearch.toLowerCase())) !== -1
			})
			setIbcSearchList(list)
		}
	}, [ibcSearch, ibcCouple])

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
			/>
			<IBCwatchlist ibcCouple={ibcCouple} />
			<div className={classes.content}>
				<p className={classes.subTitle}>IBC list</p>
			</div>
			<IBCSearch ibcSearch={ibcSearch} setIbcSearch={setIbcSearch} />
			<IBCList ibcCouple={ibcSearchList} updateWatchlistIBC={updateWatchlistIBC} isInWatchlist={isInWatchlist} />
		</div>
	)
}

export default IBC
