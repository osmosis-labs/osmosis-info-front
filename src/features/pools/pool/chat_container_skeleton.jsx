import { makeStyles, useTheme } from "@material-ui/core"
import { Skeleton } from "@mui/material"
import Paper from "../../../components/paper/Paper"

const ChartContainerSkeleton = () => {
	const classes = useStyles()
	const theme = useTheme()

	return (
		<div className={classes.rootChartContainerSkeleton}>
			<div className={classes.header}>
				<div className={classes.left}>
					<Skeleton
						animation="wave"
						variant="rectangular"
						className={`${classes.skeleton}`}
						width={300}
						height={34}
						sx={{ bgcolor: theme.palette.primary.main, margin: "4px 0" }}
					/>
					<Skeleton
						animation="wave"
						variant="rectangular"
						className={`${classes.skeleton}`}
						width={260}
						height={18}
						sx={{ bgcolor: theme.palette.primary.main, margin: "4px 0" }}
					/>
				</div>
				<div className={classes.right}>
					<Skeleton
						animation="wave"
						variant="rectangular"
						className={`${classes.skeleton}`}
						width={250}
						height={24}
						sx={{ bgcolor: theme.palette.primary.main, margin: "4px 0" }}
					/>
					<Skeleton
						animation="wave"
						variant="rectangular"
						className={`${classes.skeleton}`}
						width={240}
						height={24}
						sx={{ bgcolor: theme.palette.primary.main, margin: "4px 0" }}
					/>
				</div>
			</div>
			<Skeleton
				animation="wave"
				variant="rectangular"
				className={`${classes.skeleton}`}
				width={"100%"}
				height={400}
				sx={{ bgcolor: theme.palette.primary.main, margin: "4px 0" }}
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
