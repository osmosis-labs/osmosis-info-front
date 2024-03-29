import { makeStyles, TableCell } from "@material-ui/core"
import { formateNumberDecimalsAuto } from "../../../../helpers/helpers"
import { getExponent, useAssets } from "../../../../hooks/data/assets.hook"
const useStyles = makeStyles((theme) => {
	return {
		rootAttributAmount: {
			textAlign: "right",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
			overflow: "hidden",
			textOverflow: "ellipsis",
			cursor: "pointer",
		},
		firstNumber: {
			fontSize: "14px",
		},
		restNumber: {
			fontSize: "13px",
		},
		symbol: {
			paddingLeft: "5px",
			maxWidth: "50px",
			color: theme.palette.table.cellDark,
			fontSize: "13px",
			overflow: "hidden",
			textOverflow: "ellipsis",
		},
	}
})
const AttributAmount = ({ data, config, itemConfig, itemKey }) => {
	const classes = useStyles()
	const { data: assets } = useAssets()

	if (!data?.messages?.length === 0 || !data?.messages?.[0]?.amount)
		return (
			<div className={classes.rootAttributFees}>
				<span className={classes.firstNumber}>{0}</span>
				<span className={classes.symbol}>OSMO</span>
			</div>
		)

	let amount = data.messages[0]?.amount[0]?.amount
	let denom = data.messages[0]?.amount[0]?.denom
	let asset = assets[denom]
	if (asset) {
		let expo = getExponent(asset, denom)
		denom = asset.symbol
		amount = amount / Math.pow(10, expo)
	}

	let splitNumber = formateNumberDecimalsAuto({ price: amount }).toString().split(".")
	return (
		<div className={classes.rootAttributAmount}>
			<span className={classes.firstNumber}>{splitNumber[0]}</span>
			{splitNumber.length > 1 ? <span className={classes.restNumber}>.{splitNumber[1]}</span> : null}
			<span className={classes.symbol}>{denom}</span>
		</div>
	)
}

export default AttributAmount
