import { makeStyles } from "@material-ui/core"
import Paper from "../../../components/paper/Paper"
import { useMetrics } from "../../../contexts/MetricsProvider"
import PieChartIcon from "@material-ui/icons/PieChart"
import DominanceItem from "./DominanceItem"
import BlocLoaderOsmosis from "../../../components/loader/BlocLoaderOsmosis"
const useStyles = makeStyles((theme) => {
	return {
		dominanceRoot: {
			position: "relative",
		},
		titleContainer: {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
		},
		items: {
			paddingTop: theme.spacing(1),
		},
	}
})

const Dominance = () => {
	const classes = useStyles()
	const { dominance, loadingDominance } = useMetrics()

	return (
		<Paper className={classes.dominanceRoot}>
			<BlocLoaderOsmosis open={loadingDominance} />
			<div className={classes.titleContainer}>
				<p>Dominance</p>
				<PieChartIcon />
			</div>
			<div className={classes.items}>
				{dominance.map((item, index) => {
					return <DominanceItem key={index} item={item} index={index} />
				})}
			</div>
		</Paper>
	)
}

export default Dominance
