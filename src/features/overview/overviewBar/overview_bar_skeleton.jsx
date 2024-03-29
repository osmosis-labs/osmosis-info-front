import { makeStyles } from "@material-ui/core"
import CustomSkeleton from "../../../components/skeleton/custom_skeleton"

const OverviewBarSkeleton = () => {
	const classes = useStyles()

	return (
		<div className={classes.rootOverviewBarSkeleton}>
			<div className={classes.row}>
				<CustomSkeleton animation="wave" variant="rectangular" className={`${classes.skeleton}`} width={200} height={"1rem"} />
				<CustomSkeleton animation="wave" variant="rectangular" className={`${classes.skeleton}`} width={200} height={"1rem"} />
			</div>
		</div>
	)
}

const useStyles = makeStyles((theme) => {
	return {
		rootOverviewBarSkeleton: {
			height: "100%",
			width: "100%",
		},
		skeleton: {
			margin: "0 40px 0 0",
		},
		row: {
			display: "flex",
			flexDirection: "row",
			alignItems: "flex-end",
			margin: "0 0 0 0",
		},
	}
})

export default OverviewBarSkeleton
