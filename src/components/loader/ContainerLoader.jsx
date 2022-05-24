import { makeStyles } from "@material-ui/core"
import BlocLoaderOsmosis from "./BlocLoaderOsmosis"
const useStyles = makeStyles((theme) => {
	return {
		loaderContainer: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			position: "relative",
			minHeight: "200px",
		},
		childrenHide: {
			opacity: 0,
		},
		childrenShow: {
			opacity: 1,
		},
	}
})

const ContainerLoader = ({ isLoading, className, children, classChildren, borderRadius = true }) => {
	const classes = useStyles()

	return (
		<div className={`${className} ${classes.loaderContainer}`}>
			<BlocLoaderOsmosis open={isLoading} borderRadius={borderRadius} />
			<div className={isLoading ? classes.childrenHide : `${classes.childrenShow} ${classChildren}`}>{children}</div>
		</div>
	)
}

export default ContainerLoader
