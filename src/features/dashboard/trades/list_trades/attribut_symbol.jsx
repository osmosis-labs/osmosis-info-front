import { makeStyles, TableCell } from "@material-ui/core"
import { formateNumberDecimalsAuto } from "../../../../helpers/helpers"
const useStyles = makeStyles((theme) => {
	return {
		rootAttributSymbol: {
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
			color: theme.palette.table.cellDark,
			fontSize: "13px",
		},
	}
})
const AttributSymbol = ({ data, config, itemConfig, itemKey }) => {
	const classes = useStyles()
	let currentData = data[itemConfig.key]
	console.log("attribut_symbol.jsx -> 30: currentData", currentData  )

	if (!data && !data.value)
		return (
			<div className={classes.rootAttributSymbol}>
				<span className={classes.firstNumber}>{0}</span>
				<span className={classes.symbol}>{currentData.symbol}</span>
			</div>
		)
	let splitNumber = formateNumberDecimalsAuto({ price: currentData.value }).toString().split(".")

	return (
		<div className={classes.rootAttributSymbol}>
			<span className={classes.firstNumber}>{splitNumber[0]}</span>
			{splitNumber.length > 1 ? <span className={classes.restNumber}>.{splitNumber[1]}</span> : null}
			<span className={classes.symbol}>{currentData.symbol}</span>
		</div>
	)
}

export default AttributSymbol
