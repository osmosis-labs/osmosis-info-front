import { makeStyles } from "@material-ui/core"
import ChartSkeleton from "../../components/skeleton/chart_skeleton"
import CustomSkeleton from "../../components/skeleton/custom_skeleton"

const ContainerChartSkeleton = () => {
	const classes = useStyles()

	return (
		<div className={classes.rootContainerChartSkeleton}>
			<div className={classes.row}>
				<CustomSkeleton animation="wave" variant="rectangular" width={100} height={20} />
			</div>
			<div className={classes.row}>
				<CustomSkeleton animation="wave" variant="rectangular" width={200} height={50} />
				<CustomSkeleton animation="wave" variant="rectangular" width={100} height={30} />
			</div>
			<div className={classes.row}>
				<CustomSkeleton animation="wave" variant="rectangular" width={100} height={20} />
			</div>
			<div className={classes.row}>
				<ChartSkeleton />
			</div>
		</div>
	)
}

const useStyles = makeStyles((theme) => {
	return {
		rootContainerChartSkeleton: {
			height: "100%",
			width: "100%",
		},
		row: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "flex-end",
			margin: "0 0 8px 0",
		},
	}
})

export default ContainerChartSkeleton
