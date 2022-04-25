import { makeStyles, TableCell } from "@material-ui/core"
import { formateNumberDecimalsAuto } from "../../../../helpers/helpers"
const useStyles = makeStyles((theme) => {
	return {
		rootCellFees: {
			textAlign: "right",
			width: "140px",
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
			fontSize: "15px",
		},
	}
})
const CellFees = ({ cellKey, cellConfig, data }) => {
	const classes = useStyles()
	const onClick = () => {
		cellConfig.onClickCell(data)
	}

	if (!data.fees && !data.fees)
		return (
			<TableCell key={cellKey} onClick={onClick} className={classes.rootCellFees}>
				-
			</TableCell>
		)
	let splitNumber = formateNumberDecimalsAuto({ price: data.fees }).toString().split(".")
	return (
		<TableCell key={cellKey} className={classes.rootCellFees}>
			<div className={classes.rootCellFees} onClick={onClick}>
				<span className={classes.firstNumber}>{splitNumber[0]}</span>
				{splitNumber.length > 1 ? <span className={classes.restNumber}>.{splitNumber[1]}</span> : null}
				<span className={classes.symbol}>osmo</span>
			</div>
		</TableCell>
	)
}

export default CellFees
