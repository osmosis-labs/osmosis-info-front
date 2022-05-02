import { makeStyles } from "@material-ui/core"
import { useToast } from "../../../../../../contexts/Toast.provider"
import { capitalizeFirstLetter, isOsmoAddress } from "../../../../../../helpers/helpers"

const useStyles = makeStyles((theme) => {
	return {
		rootAddressMessage: {
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
		address: {
			fontSize: "12px",
			cursor: "pointer",
			overflow: "hidden",
			textOverflow: "ellipsis",
			color: `${theme.palette.table.link2} !important`,
		},
	}
})
const AddressMessage = ({ address, name }) => {
	const classes = useStyles()
	const { showToast } = useToast()
	const copyAddress = () => {
		try {
			navigator.clipboard.writeText(address)
			showToast({
				severity: "success",
				text: "Address copied to clipboard",
			})
		} catch (e) {
			console.log("%Address.jsx -> 66 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
			showToast({
				severity: "warning",
				text: "Cannot copy address to clipboard",
			})
		}
	}

	let addressDisplay = address
	if (!isOsmoAddress(address)) {
		addressDisplay = address.substring(0, 5) + "..." + address.substring(address.length - 5)
	}
	let nameDisplay = capitalizeFirstLetter(name.replace("_", " "))

	return (
		<div className={`${classes.rootAddressMessage}`}>
			<p className={classes.name}>{nameDisplay}</p>
			<p onClick={copyAddress} className={classes.address}>
				{addressDisplay}
			</p>
		</div>
	)
}

export default AddressMessage
