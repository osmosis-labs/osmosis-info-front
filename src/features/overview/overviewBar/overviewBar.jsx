import { makeStyles } from "@material-ui/core"
import { useQuery } from "react-query"
import Paper from "../../../components/paper/Paper"
import { useMetrics } from "../../../contexts/MetricsProvider"
import { formateNumberDecimals, formaterNumber, getPercent } from "../../../helpers/helpers"
import { usePrices } from "../../../hooks/data/prices.hook"
import useRequest from "../../../hooks/request.hook"
import Bar from "./bar"

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
	const {
		osmosPrice,
		osmosChange24h,
		nbToken,
		volume24h,
		volume24hChange,
		liquidityUSD,
		liquidityUSD24h,
		liquidityAtom,
		liquidityAtom24h,
		liquidityOsmo,
		liquidityOsmo24h,
		loadingMetrics,
	} = useMetrics()
	const { getter, defaultValue: defaultPrice } = usePrices()
	const { data: prices } = useQuery(["prices", {}], getter)
	const { priceOsmoBrut } = prices ? prices : defaultPrice

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
			{/* <div className={classes.item}>
				<span className={classes.itemLabel}>ATOM Liquidity (-24h):</span>
				<span className={getClasses(liquidityAtom24h)}>{formaterNumber(liquidityAtom)} ATOM</span>

				<span className={`${getClasses(liquidityAtom24h, "percent")}`}>
					({getArrow(liquidityAtom24h)}
					{liquidityAtom24h > 0 ? "+" : ""}
					{getPercent(liquidityAtom24h)})
				</span>
			</div>
			<div className={classes.item}>
				<span className={classes.itemLabel}>OSMO Liquidity (-24h):</span>
				<span className={getClasses(liquidityOsmo24h)}>{formaterNumber(liquidityOsmo)} OSMO</span>

				<span className={`${getClasses(liquidityOsmo24h, "percent")}`}>
					({getArrow(liquidityOsmo24h)}
					{liquidityOsmo24h > 0 ? "+" : ""}
					{getPercent(liquidityOsmo24h)})
				</span>
			</div> */}
		</Paper>
	)
}

export default OverviewBar
