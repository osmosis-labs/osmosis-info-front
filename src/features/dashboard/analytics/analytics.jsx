import { makeStyles } from "@material-ui/core"
import { useDashboard } from "../../../contexts/dashboard.provider"
import Exposure from "./exposure/exposure"
import LiquidityReward from "./liquidity_reward/liquidity_reward"
import MyWallet from "./my_wallet/my_wallet"
import Overview from "./overview"
import StackingRewards from "./stacking_reward/stacking_rewards"

const useStyles = makeStyles((theme) => {
	return {
		rootAnalytics: {
			width: "100%",

			[theme.breakpoints.down("xs")]: {},
		},
		container: {
			margin: "20px 0",
			width: "100%",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			backgroundColor: theme.palette.primary.main,
		},

		rowOne: {
			width: "100%",
			maxWidth: "1200px",
			display: "grid",
			gridTemplateColumns: "repeat(2, 1fr)",
			gridGap: "24px",
		},
		rowTwo: {
			width: "100%",
			maxWidth: "1200px",
			display: "grid",
			gridTemplateColumns: "1.3fr 1fr",
			gridGap: "24px",
		},
	}
})
const Analytics = () => {
	const classes = useStyles()
	const { address } = useDashboard()

	if (!address)
		return (
			<div className={classes.rootAnalytics}>
				<Overview />
			</div>
		)

	return (
		<div className={classes.rootAnalytics}>
			<Overview />
			<div className={classes.container}>
				<div className={classes.rowOne}>
					<StackingRewards />
					<LiquidityReward />
				</div>
				<div className={classes.rowTwo}>
					<Exposure />
					<MyWallet />
				</div>
			</div>
		</div>
	)
}

export default Analytics
