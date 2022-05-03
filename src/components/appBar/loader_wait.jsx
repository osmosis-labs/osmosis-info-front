import { makeStyles } from "@material-ui/core"
import BlocLoaderOsmosis from "../loader/BlocLoaderOsmosis"

const useStyles = makeStyles((theme) => {
	return {
		rootLoaderWait: {
			height: "100vh",
            position: "relative",
			width: "100vw",
			backgroundColor: "rgb(35, 29, 75)",
		},
	}
})

const LoaderWait = () => {
	const classes = useStyles()

	return (
		<div className={classes.rootLoaderWait}>
			<BlocLoaderOsmosis open={true} />
		</div>
	)
}

export default LoaderWait
