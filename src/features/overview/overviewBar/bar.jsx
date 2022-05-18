import { makeStyles } from "@material-ui/core"
import { useMetrics } from "../../../contexts/MetricsProvider"
import { formateNumberDecimals, formaterNumber, getPercent } from "../../../helpers/helpers"
import { usePrices } from "../../../hooks/data/prices.hook"

const useStyles = makeStyles((theme) => {
	return {
		rootBar: {
			display: "flex",
			alignItems: "center",
		},
		item: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			whiteSpace: "nowrap",
			margin: "0 20px",
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
		buttonGroup: {
			alignSelf: "center",
		},
	}
})

const Bar = ({ className }) => {
	const classes = useStyles()
	const {
		osmosChange24h,
		volume24h,
		volume24hChange,
		liquidityUSD,
		liquidityUSD24h,
		liquidityAtom,
		liquidityAtom24h,
		liquidityOsmo,
		liquidityOsmo24h,
	} = useMetrics()
	const {
		data: { priceOsmoBrut },
	} = usePrices()
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
		<div className={`${classes.rootBar} ${className}`}>
			<div className={classes.item}>
				<span className={classes.itemLabel}>OSMO (-24h):</span>
				<span className={getClasses(osmosChange24h)}>${formateNumberDecimals(priceOsmoBrut)}</span>

				<span className={`${getClasses(osmosChange24h, "percent")}`}>
					({getArrow(osmosChange24h)}
					{getPercent(Math.abs(osmosChange24h))})
				</span>
			</div>
			<div className={classes.item}>
				<span className={classes.itemLabel}>Volume (-24h):</span>
				<span className={getClasses(volume24hChange)}>${formaterNumber(volume24h)}</span>

				<span className={`${getClasses(volume24hChange, "percent")}`}>
					({getArrow(volume24hChange)}
					{getPercent(Math.abs(volume24hChange))})
				</span>
			</div>

			<div className={classes.item}>
				<span className={classes.itemLabel}>USD Liquidity (-24h):</span>
				<span className={getClasses(liquidityUSD24h)}>${formaterNumber(liquidityUSD)}</span>

				<span className={`${getClasses(liquidityUSD24h, "percent")}`}>
					({getArrow(liquidityUSD24h)}
					{getPercent(Math.abs(liquidityUSD24h))})
				</span>
			</div>
			<div className={classes.item}>
				<span className={classes.itemLabel}>ATOM Liquidity (-24h):</span>
				<span className={getClasses(liquidityAtom24h)}>{formaterNumber(liquidityAtom)} ATOM</span>

				<span className={`${getClasses(liquidityAtom24h, "percent")}`}>
					({getArrow(liquidityAtom24h)}
					{getPercent(Math.abs(liquidityAtom24h))})
				</span>
			</div>
			<div className={classes.item}>
				<span className={classes.itemLabel}>OSMO Liquidity (-24h):</span>
				<span className={getClasses(liquidityOsmo24h)}>{formaterNumber(liquidityOsmo)} OSMO</span>

				<span className={`${getClasses(liquidityOsmo24h, "percent")}`}>
					({getArrow(liquidityOsmo24h)}
					{getPercent(Math.abs(liquidityOsmo24h))})
				</span>
			</div>
		</div>
	)
}

export default Bar
