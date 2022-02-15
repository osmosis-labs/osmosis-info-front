import { makeStyles } from "@material-ui/core"
import BlocLoaderOsmosis from "./BlocLoaderOsmosis"
const useStyles = makeStyles((theme) => {
	return {
		loaderContainer: {
			position: "relative",
			minHeight: "200px",
			height: "100%",
			width: "100%",
		},
		childrenHide: {
			opacity: 0,
			height: "100%",
			width: "100%",
		},
		childrenShow: {
			opacity: 1,
			height: "100%",
			width: "100%",
		},
	}
})

const ContainerLoader = ({ isLoading, className, children, classChildren }) => {
	const classes = useStyles()

	return (
		<div className={`${className} ${classes.loaderContainer}`}>
			<BlocLoaderOsmosis open={isLoading} borderRadius={true} />
			<div className={isLoading ? classes.childrenHide : `${classes.childrenShow} ${classChildren}`}>{children}</div>
		</div>
	)
}

export default ContainerLoader
