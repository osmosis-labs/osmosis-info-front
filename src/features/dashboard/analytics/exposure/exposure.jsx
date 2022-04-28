import { makeStyles } from "@material-ui/core"
import Paper from "../../../../components/paper/Paper"

const useStyles = makeStyles((theme) => {
	return {
		rootExposure: {
			width: "100%",
			margin: "20px 0",

			[theme.breakpoints.down("xs")]: {},
		},
		title: {
			fontSize: "1.4rem",
			color: theme.palette.gray.contrastText,
			marginBottom: "20px",
		},
		paper: {
			display: "grid",
			gridTemplateColumns: "1fr 1.5fr",
		},
	}
})
const Exposure = () => {
	const classes = useStyles()

	return (
		<div className={classes.rootExposure}>
			<p className={classes.title}>My Exposure</p>
			<Paper className={classes.paper}>Hello</Paper>
		</div>
	)
}

export default Exposure
