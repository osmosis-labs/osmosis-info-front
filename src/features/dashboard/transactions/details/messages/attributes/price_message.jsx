import { makeStyles } from "@material-ui/core"
import { capitalizeFirstLetter, formateNumberDecimalsAuto } from "../../../../../../helpers/helpers"
import { getExponent, useAssets } from "../../../../../../hooks/data/assets.hook"

const useStyles = makeStyles((theme) => {
	return {
		rootPriceMessage: {
			display: "flex",
			flexDirection: "row",
			width: "100%",
			alignContent: "center",
			justifyContent: "space-between",
			margin: "6px 0",
			[theme.breakpoints.down("xs")]: {},
		},
		name: {
			fontSize: "12px",
			color: theme.palette.primary.contrastText,
		},
		firstNumber: {
			fontSize: "13px",
		},
		restNumber: {
			fontSize: "11px",
		},
		symbol: {
			paddingLeft: "5px",
			color: theme.palette.table.cellDark,
			fontSize: "12px",
			maxWidth: "75px",
			overflow: "hidden",
			textOverflow: "ellipsis",
			display: "inline-block",
		},
		price: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
		},
	}
})
const PriceMessage = ({ denom, amount, name, usd = null }) => {
	const classes = useStyles()
	const { data: assets } = useAssets()


	let asset = assets[denom]
	if (asset) {
		let expo = getExponent(asset, denom)
		denom = asset.symbol
		amount = amount / Math.pow(10, expo)
	}


	let nameDisplay = capitalizeFirstLetter(name.replace("_", " "))
	
	let splitNumber = formateNumberDecimalsAuto({ price: amount }).toString().split(".")

	return (
		<div className={`${classes.rootPriceMessage}`}>
			<p className={classes.name}>{nameDisplay}</p>
			<p className={classes.price}>
				<span className={classes.firstNumber}>{splitNumber[0]}</span>
				{splitNumber.length > 1 ? <span className={classes.restNumber}>.{splitNumber[1]}</span> : null}
				<span className={classes.symbol}>{denom}</span>
				{/* {usd ? <span className={classes.symbol}>$(~{usd})</span> : null} */}
			</p>
		</div>
	)
}

export default PriceMessage
