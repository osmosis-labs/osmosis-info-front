import { makeStyles } from "@material-ui/core"
import Paper from "../../../components/paper/Paper"
import Bar from "./bar"

const useStyles = makeStyles((theme) => {
	return {
		rootOverviewBar: {
			display: "flex",
			alignItems: "center",
			overflow: "hidden",
		},
		bar: {
			animation: '$defil 40s linear infinite'
		},
		barOne: {},
		barTwo: {},

		"@keyframes defil": {
			"0%": {
				transform: "translate(0%, 0)",
			},
			"100%": {
				transform: "translate(-100%, 0)",
			},
		},
	}
})

const OverviewBar = () => {
	const classes = useStyles()

	return (
		<Paper className={classes.rootOverviewBar}>
			<Bar className={`${classes.bar} ${classes.barOne}`} />
			<Bar className={`${classes.bar} ${classes.barTwo}`} />
		</Paper>
	)
}

export default OverviewBar
