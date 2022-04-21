import { makeStyles } from "@material-ui/core"
import { useEffect } from "react"
import { useDashboard } from "../../../contexts/dashboard.provider"
const useStyles = makeStyles((theme) => {
	return {
		rootDashboard: {
			[theme.breakpoints.down("xs")]: {},
		},
	}
})
const Trades = () => {
	const classes = useStyles()
	const { address, getNbTransaction } = useDashboard()

	useEffect(() => {
		const fetch = async () => {
		}

		if (address && address.length > 0) {
			fetch()
		}
	}, [address])

	return (
		<div className={classes.rootTrades}>
			<h1>Trades</h1>
		</div>
	)
}

export default Trades
