import { makeStyles, TableCell } from "@material-ui/core"
import { formateNumberDecimalsAuto } from "../../../../helpers/helpers"
const useStyles = makeStyles((theme) => {
	return {
		rootAttributAddress: {
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
const AttributAddress = ({ data, config, itemConfig, itemKey }) => {
	const classes = useStyles()
	if (!data?.messages?.length === 0 || !data?.messages?.[0]?.from_address || !data?.messages?.[0]?.from_address)
		return (
			<div className={classes.rootAttributFees}>
				<span className={classes.symbol}>-</span>
			</div>
		)

	console.log("attribut_amount.jsx (l:30): data:", data)
	let address = data.messages[0].from_address
	if (data.type === "Send") address = data.messages[0].to_address

	let display = address.substring(0, 5) + "..." + address.substring(address.length - 5)
	return (
		<div className={classes.rootAttributAddress}>
			<span className={classes.symbol}>{display}</span>
		</div>
	)
}

export default AttributAddress
