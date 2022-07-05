import { makeStyles, useTheme } from "@material-ui/core"
import CustomSkeleton from "../../../components/skeleton/custom_skeleton"

const ChartContainerSkeleton = () => {
	const classes = useStyles()
	const theme = useTheme()

	return (
		<div className={classes.rootChartContainerSkeleton}>
			<div className={classes.header}>
				<div className={classes.left}>
					<CustomSkeleton
						animation="wave"
						variant="rectangular"
						className={`${classes.skeleton}`}
						width={300}
						height={34}
						sx={{ margin: "4px 0" }}
					/>
					<CustomSkeleton
						animation="wave"
						variant="rectangular"
						className={`${classes.skeleton}`}
						width={260}
						height={18}
						sx={{ margin: "4px 0" }}
					/>
				</div>
				<div className={classes.right}>
					<CustomSkeleton
						animation="wave"
						variant="rectangular"
						className={`${classes.skeleton}`}
						width={250}
						height={24}
						sx={{ margin: "4px 0" }}
					/>
					<CustomSkeleton
						animation="wave"
						variant="rectangular"
						className={`${classes.skeleton}`}
						width={270}
						height={24}
						sx={{ margin: "4px 0" }}
					/>
					<CustomSkeleton
						animation="wave"
						variant="rectangular"
						className={`${classes.skeleton}`}
						width={230}
						height={28}
						sx={{ margin: "4px 0" }}
					/>
				</div>
			</div>
			<CustomSkeleton
				animation="wave"
				variant="rectangular"
				className={`${classes.skeleton}`}
				width={"100%"}
				height={350}
				sx={{ margin: "4px 0" }}
			/>
		</div>
	)
}

const useStyles = makeStyles((theme) => {
	return {
		rootChartContainerSkeleton: {
			height: "100%",
			width: "100%",
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
		},

		skeleton: {
			margin: "0 40px 0 0",
		},
		header: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
		},
		left: {
			display: "flex",
			flexDirection: "column",
		},
		right: {
			display: "flex",
			flexDirection: "column",
			alignItems: "flex-end",
		},
	}
})

export default ChartContainerSkeleton
