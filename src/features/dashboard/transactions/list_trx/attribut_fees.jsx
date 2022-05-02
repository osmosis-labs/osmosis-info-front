import { makeStyles, TableCell } from "@material-ui/core"
import { formateNumberDecimalsAuto } from "../../../../helpers/helpers"
const useStyles = makeStyles((theme) => {
	return {
		rootAttributFees: {
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
const AttributFees = ({ data, config, itemConfig, itemKey }) => {
	const classes = useStyles()

	if (!data.fees && !data.fees)
		return (
			<div className={classes.rootAttributFees}>
				<span className={classes.firstNumber}>{0}</span>
				<span className={classes.symbol}>OSMO</span>
			</div>
		)
	let splitNumber = formateNumberDecimalsAuto({ price: data.fees }).toString().split(".")
	return (
		<div className={classes.rootAttributFees}>
			<span className={classes.firstNumber}>{splitNumber[0]}</span>
			{splitNumber.length > 1 ? <span className={classes.restNumber}>.{splitNumber[1]}</span> : null}
			<span className={classes.symbol}>OSMO</span>
		</div>
	)
}

export default AttributFees
