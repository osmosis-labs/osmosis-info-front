import { makeStyles } from "@material-ui/core"
import Paper from "../../../components/paper/Paper"
import { useMetrics } from "../../../contexts/MetricsProvider"
const useStyles = makeStyles((theme) => {
	return {
		topRoot: {},
	}
})

const Top = () => {
	const classes = useStyles()
	const { top } = useMetrics()

	return <Paper className={classes.topRoot}></Paper>
}

export default Top
