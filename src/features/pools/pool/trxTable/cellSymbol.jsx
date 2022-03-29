import { makeStyles, TableCell } from "@material-ui/core"
import { formateNumberDecimalsAuto } from "../../../../helpers/helpers"
const useStyles = makeStyles((theme) => {
	return {
		rootCellSymbol: {
			textAlign: "right",
		},
		firstNumber: {
			fontSize: "14px",
		},
		restNumber: {
			fontSize: "12px",
		},
		symbol: {
			paddingLeft: "5px",
			color: theme.palette.table.cellDark,
			fontSize: "15px",
		},
	}
})
const CellSymbol = ({ cellKey, cellConfig, data }) => {
	const classes = useStyles()
	let currentData = data[cellConfig.cellKey]
	if (!currentData && !currentData.value) return <TableCell key={cellKey}>-</TableCell>
	let splitNumber = formateNumberDecimalsAuto({ price: currentData.value }).toString().split(".")
	return (
		<TableCell key={cellKey}>
			<div className={classes.rootCellSymbol}>
				<span className={classes.firstNumber}>{splitNumber[0]}</span>
				{splitNumber.length > 1 ? <span className={classes.restNumber}>.{splitNumber[1]}</span> : null}
				<span className={classes.symbol}>{currentData.symbol}</span>
			</div>
		</TableCell>
	)
}

export default CellSymbol
