import { makeStyles } from "@material-ui/core"
import Metrics from "./Metrics"

const useStyles = makeStyles((theme) => {
	return {
		overviewMetricsRoot: {
			backgroundColor: theme.palette.primary.dark2,
			width: "100vw",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		},
		overviewMetricsContainer: {
			maxWidth: "1200px",
			width: "90%",
			margin: "40px 0",
		},
		title: {
			fontSize: "1.6rem",
			color: theme.palette.gray.contrastText,
			marginBottom: "20px",
		},
	}
})

const OverviewMetrics = () => {
	const classes = useStyles()
	

	return (
		<div className={classes.overviewMetricsRoot}>
			<div className={classes.overviewMetricsContainer}>
				<p className={classes.title}>Overview</p>
				<Metrics />
			</div>
		</div>
	)
}

export default OverviewMetrics
