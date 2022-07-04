import { makeStyles } from "@material-ui/core"
import CustomSkeleton from "../../../../components/skeleton/custom_skeleton"

const TokenHeaderSkeleton = () => {
	const classes = useStyles()

	return (
		<div className={classes.rootTokenHeaderSkeleton}>
			<div style={{ margin: "16px 0" }} className={classes.row}>
				<CustomSkeleton animation="wave" variant="rectangular" className={`${classes.skeleton}`} width={300} height={26} />
			</div>
			<div style={{ margin: "16px 0" }} className={classes.row}>
				<CustomSkeleton animation="wave" variant="rectangular" className={`${classes.skeleton}`} width={320} height={38} />
			</div>

			<div style={{ margin: "16px 0" }} className={classes.row}>
				<CustomSkeleton animation="wave" variant="rectangular" className={`${classes.skeleton}`} width={150} height={50} />
			</div>
		</div>
	)
}

const useStyles = makeStyles((theme) => {
	return {
		rootTokenHeaderSkeleton: {
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
		},
	}
})

export default TokenHeaderSkeleton
