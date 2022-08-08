import { makeStyles } from "@material-ui/core"
import Paper from "../../../../components/paper/Paper"
import CustomSkeleton from "../../../../components/skeleton/custom_skeleton"

const PoolHeaderSkeleton = () => {
	const classes = useStyles()

	return (
		<div className={classes.rootPoolHeaderSkeleton}>
			<div className={classes.row}>
				<CustomSkeleton
					animation="wave"
					variant="rectangular"
					className={`${classes.skeleton}`}
					width={300}
					height={26}
				/>
			</div>
			<div className={classes.row}>
				<CustomSkeleton
					animation="wave"
					variant="rectangular"
					className={`${classes.skeleton}`}
					width={320}
					height={38}
				/>
			</div>
			<div className={classes.row}>
				<Paper className={classes.convertContainer}>
					<CustomSkeleton
						animation="wave"
						variant="rectangular"
						className={`${classes.skeleton}`}
						width={200}
						height={28}
					/>
				</Paper>
			</div>
			<div className={classes.row}>
				<CustomSkeleton
					animation="wave"
					variant="rectangular"
					className={`${classes.skeleton}`}
					width={360}
					height={30}
				/>
			</div>
		</div>
	)
}

const useStyles = makeStyles((theme) => {
	return {
		rootPoolHeaderSkeleton: {
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
			margin: "22px 0",
		},
		convertContainer: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			width: "fit-content",
			padding: "6px 10px",
		},
	}
})

export default PoolHeaderSkeleton
