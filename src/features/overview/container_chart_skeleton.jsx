import { makeStyles } from "@material-ui/core"
import { Skeleton } from "@mui/material"

const ContainerChartSkeleton = () => {
	const classes = useStyles()

	return (
		<div className={classes.rootContainerChartSkeleton}>
			<div className={classes.row}>
				<Skeleton animation="wave" variant="rectangular" className={`${classes.skeleton}`} width={100} height={20} />
			</div>
			<div className={classes.row}>
				<Skeleton animation="wave" variant="rectangular" className={`${classes.skeleton}`} width={200} height={50} />
				<Skeleton animation="wave" variant="rectangular" className={`${classes.skeleton}`} width={100} height={30} />
			</div>
			<div className={classes.row}>
				<Skeleton animation="wave" variant="rectangular" className={`${classes.skeleton}`} width={100} height={20} />
			</div>
			<div className={classes.row}>
				<Skeleton animation="wave" variant="rectangular" className={`${classes.skeleton}`} width={"100%"} height={200} />
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
		skeleton: {},
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
