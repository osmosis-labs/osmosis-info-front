import { makeStyles } from "@material-ui/core"
import { useEffect } from "react"
import { useDashboard } from "../../../contexts/dashboard.provider"
const useStyles = makeStyles((theme) => {
	return {
		rootAnalytics: {
			[theme.breakpoints.down("xs")]: {},
		},
	}
})
const Analytics = () => {
	const classes = useStyles()
	const { address, getNbTransaction } = useDashboard()

	useEffect(() => {
		const fetch = async () => {
			let trx = await getNbTransaction(address)
			console.log("analytics.jsx -> 21: trx", trx)
		}

		if (address && address.length > 0) {
			fetch()
		}
	}, [address])

	return (
		<div className={classes.rootAnalytics}>
			<h1>Analytics</h1>
		</div>
	)
}

export default Analytics
