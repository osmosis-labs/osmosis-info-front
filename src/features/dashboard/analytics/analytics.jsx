import { makeStyles } from "@material-ui/core"
import { useKeplr } from "../../../contexts/KeplrProvider"
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
		rootAnalyticsNot:{
			width: "100%",
			height: "100%",
			backgroundColor: theme.palette.primary.dark2,

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
	const { address } = useKeplr()


	if (!address)
		return (
			<div className={classes.rootAnalyticsNot}>
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
