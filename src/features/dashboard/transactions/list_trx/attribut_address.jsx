import { makeStyles, TableCell } from "@material-ui/core"
import { useToast } from "../../../../contexts/Toast.provider"
import { formateNumberDecimalsAuto } from "../../../../helpers/helpers"
const useStyles = makeStyles((theme) => {
	return {
		rootAttributAddress: {
			display: "flex",
			alignItems: "center",
			overflow: "hidden",
			textOverflow: "ellipsis",
			cursor: "pointer",
		},

		address: {
			paddingLeft: "10px",
			color: theme.palette.table.cellDark,
			fontSize: "13px",
			overflow: "hidden",
			textOverflow: "ellipsis",
		},
	}
})
const AttributAddress = ({ data, config, itemConfig, itemKey }) => {
	const classes = useStyles()
	const { showToast } = useToast()

	if (!data?.messages?.length === 0 || !data?.messages?.[0]?.from_address || !data?.messages?.[0]?.from_address)
		return (
			<div className={classes.rootAttributFees}>
				<span className={classes.address}>-</span>
			</div>
		)

	let address = data.messages[0].from_address
	if (data.type === "Send") address = data.messages[0].to_address

	let display = address.substring(0, 5) + "..." + address.substring(address.length - 5)
	const onClick = () => {
		try {
			navigator.clipboard.writeText(address)
			showToast({
				severity: "success",
				text: "Address copied to clipboard",
			})
		} catch (e) {
			console.log("%cattribuadresse.jsx -> 66 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
			showToast({
				severity: "warning",
				text: "Cannot copy Address to clipboard",
			})
		}
	}
	return (
		<div className={classes.rootAttributAddress} onClick={onClick}>
			<span className={classes.address}>{display}</span>
		</div>
	)
}

export default AttributAddress
