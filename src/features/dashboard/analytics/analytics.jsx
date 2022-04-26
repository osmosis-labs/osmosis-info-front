import { makeStyles } from "@material-ui/core"
import { useEffect } from "react"
import { useDashboard } from "../../../contexts/dashboard.provider"
import Overview from "./overview"
const useStyles = makeStyles((theme) => {
	return {
		rootAnalytics: {
            width: "100%",

			[theme.breakpoints.down("xs")]: {},
		},
	}
})
const Analytics = () => {
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
		<div className={classes.rootAnalytics}>
			<Overview />
		</div>
	)
}

export default Analytics
