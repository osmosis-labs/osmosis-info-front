import { makeStyles } from "@material-ui/core"
import Image from "../../../components/image/Image"
import Paper from "../../../components/paper/Paper"
import { formateNumberDecimals, formateNumberDecimalsAuto, getPercent } from "../../../helpers/helpers"
import { getImageFromAsset, useAssets } from "../../../hooks/data/assets.hook"

const useStyles = makeStyles((theme) => {
	return {
		rootMoverItem: {
			margin: "0px 10px",
			borderRadius: "10px",
			padding: "8px 12px",
			backgroundColor: theme.palette.primary.dark,
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
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
		image: {
			height: "30px",
			borderRadius: "50%",
			border: `1px solid ${theme.palette.yellow.gold}`,
			margin: "0 10px 0 0px",
		},
		infos: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "flex-start",
		},
		priceContainer: {
			display: "grid",
			gridTemplateColumns: "1fr 1fr",
			gridGap: "10px",
		},
		name: {
			marginBottom: "4px",
			color: theme.palette.primary.contrastText,
		},
		price: {
			color: theme.palette.primary.contrastText,
		},
	}
})

const MoverItem = ({ item, index }) => {
	const classes = useStyles()
	const { data: assets } = useAssets()
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
		<div className={classes.rootMoverItem}>
			<Image
				className={`${classes.image}`}
				assets={true}
				pathAssets=""
				src={getImageFromAsset(assets, item)}
				srcFallback="../assets/default.png"
				alt={`${item.symbol}`}
			/>
			<div className={classes.infos}>
				<span className={classes.name}>{item.symbolDisplay}</span>
				<div className={classes.priceContainer}>
					<span className={classes.price}>${formateNumberDecimalsAuto({ price: item.price })}</span>
					<span className={getClasses(item.price_24h_change)}>
						{getArrow(item.price_24h_change)}
						{getPercent(Math.abs(item.price_24h_change))}
					</span>
				</div>
			</div>
		</div>
	)
}

export default MoverItem
