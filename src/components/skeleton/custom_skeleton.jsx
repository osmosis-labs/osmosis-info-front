import Skeleton from "@mui/material/Skeleton"
import { makeStyles } from "@material-ui/core"

const CustomSkeleton = (props) => {
	const classes = useStyles()

	const classesName = `${props.classesName} ${classes.rootSkeleton}`

	return <Skeleton {...props} className={classesName} />
}

const useStyles = makeStyles((theme) => {
	return {
		rootSkeleton: {
			backgroundColor: `${theme.palette.skeleton.color} !important`,
			"&:after": {
			backgroundColor: `${theme.palette.skeleton.wave} !important`,
        },
		},
	}
})

export default CustomSkeleton
