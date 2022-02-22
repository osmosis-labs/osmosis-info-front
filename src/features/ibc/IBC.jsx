import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import BlocLoaderOsmosis from "../../components/loader/BlocLoaderOsmosis"
import { useIBC } from "../../contexts/IBCProvier"
import IBCInfo from "./IBCInfo"
import IBCList from "./IBCList"
const useStyles = makeStyles((theme) => {
	return {
		IBCRoot: {
			position: "relative",
			display: "flex",
			flexDirection: "column",
			flexGrow: 1,
			minHeight: "200px",
			width: "100vw",
		},
		loading:{
			backgroundColor: theme.palette.primary.dark2,
		}
	}
})

const IBC = () => {
	const classes = useStyles()
	const { ibcCouple, statusNormal, statusCongested, statusBlocked, getData, loaderIBC } = useIBC()

	const [timeLastUpdate, setTimeLastUpdate] = useState(0)

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

			<BlocLoaderOsmosis open={loaderIBC} classNameLoading={classes.loading}/>
			<IBCInfo
				timeLastUpdate={timeLastUpdate}
				statusNormal={statusNormal}
				statusCongested={statusCongested}
				statusBlocked={statusBlocked}
				nbNetwork={ibcCouple.length}
			/>
			<IBCList ibcCouple={ibcCouple} />
		</div>
	)
}

export default IBC
