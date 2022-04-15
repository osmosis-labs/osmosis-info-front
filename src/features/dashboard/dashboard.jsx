import { makeStyles } from "@material-ui/core"
import { useKeplr } from "../../contexts/KeplrProvider"
const useStyles = makeStyles((theme) => {
	return {
		rootDashboard: {
			[theme.breakpoints.down("xs")]: {},
		},
	}
})
const Dashboard = () => {
	const classes = useStyles()
	const { keplrStatus } = useKeplr()

	console.log("dashboard.jsx -> 15: keplrStatus", keplrStatus)

	return (
		<div className={classes.rootDashboard}>
			<h1>Heelo</h1>
		</div>
	)
}

export default Dashboard
