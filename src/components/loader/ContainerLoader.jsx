import { makeStyles } from "@material-ui/core"
import BlocLoaderOsmosis from "./BlocLoaderOsmosis"
const useStyles = makeStyles((theme) => {
	return {
		loaderContainer: {
			position: "relative",
			minHeight: "200px",
		},
	}
})

const ContainerLoader = ({
	isLoading,
	className,
    children,
}) => {
	const classes = useStyles()


	return (
		<div className={`${className} ${classes.loaderContainer}`}>
			<BlocLoaderOsmosis open={isLoading} borderRadius={true} />

			{!isLoading ? (children): null}
				
		</div>
	)
}

export default ContainerLoader
