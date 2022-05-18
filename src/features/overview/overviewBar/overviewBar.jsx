import { makeStyles } from "@material-ui/core"
import Paper from "../../../components/paper/Paper"
import { useMetrics } from "../../../contexts/MetricsProvider"
import { formaterNumber, getPercent } from "../../../helpers/helpers"

const useStyles = makeStyles((theme) => {
	return {
		rootOverviewBar: {
			display: "flex",
			alignItems: "center",
			overflow: "hidden",
			[theme.breakpoints.down("sm")]: {
				justifyContent: "center",
			},
		},
		item: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			whiteSpace: "nowrap",
			margin: "0 20px",
		},
		liquidity: {
			[theme.breakpoints.down("sm")]: {
				display: "none",
			},
		},

		itemLabel: {
			fontSize: "0.9rem",
		},
		change: {
			fontSize: "0.9rem",
			padding: "0 0.3rem",
		},
		arrow: {},
		up: {
			color: theme.palette.green.text,
		},
		down: {
			color: theme.palette.error.main,
		},
		percent: {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			fontSize: "0.9rem",
		},
	}
})

const OverviewBar = () => {
	const classes = useStyles()
	const { volume24h, volume24hChange, liquidityUSD, liquidityUSD24h } = useMetrics()

	const getClasses = (value, type) => {
		let res = ""
		if (!type) res = classes.change
		else if (type === "arrow") res = classes.arrow
		else if (type === "percent") res = classes.percent
		if (value > 0) {
			res += " " + classes.up
		} else if (value < 0) {
			res += " " + classes.down
		}
		return res
	}

	const getArrow = (value) => {
		if (value > 0) {
			return "↑"
		} else if (value < 0) {
			return "↓"
		} else return null
	}
	return (
		<Paper className={classes.rootOverviewBar}>
			<div className={classes.item}>
				<span className={classes.itemLabel}>Volume (-24h):</span>
				<span className={getClasses(volume24hChange)}>${formaterNumber(volume24h)}</span>

				<span className={`${getClasses(volume24hChange, "percent")}`}>
					({getArrow(volume24hChange)}
					{getPercent(Math.abs(volume24hChange))})
				</span>
			</div>

			<div className={`${classes.item} ${classes.liquidity}`}>
				<span className={classes.itemLabel}>Liquidity (-24h):</span>
				<span className={getClasses(liquidityUSD24h)}>
					{liquidityUSD24h > 0 ? "+" : "-"}${formaterNumber(Math.abs((liquidityUSD * liquidityUSD24h) / 100))}
				</span>

				<span className={`${getClasses(liquidityUSD24h, "percent")}`}>
					({getArrow(liquidityUSD24h)}
					{getPercent(Math.abs(liquidityUSD24h))})
				</span>
			</div>
		</Paper>
	)
}

export default OverviewBar
