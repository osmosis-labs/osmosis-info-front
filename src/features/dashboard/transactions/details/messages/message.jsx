import { makeStyles } from "@material-ui/core"
import dayjs from "dayjs"
import { isOsmoAddress } from "../../../../../helpers/helpers"
import Address from "./attributes/address_message"
import Default from "./attributes/default_message"
import PriceMessage from "./attributes/price_message"
import Type from "./attributes/type_message"

const useStyles = makeStyles((theme) => {
	return {
		rootMessageLast: {
			padding: "8px 20px 12px 20px",
			margin: "0 0 4px 0",
			borderRadius: "0 0 16px 16px ",
		},
		rootMessage: {
			margin: "0 0 4px 0",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			padding: "8px 20px",
			alignItems: "flex-start",
			backgroundColor: theme.palette.primary.light,
			[theme.breakpoints.down("xs")]: {},
		},
	}
})
const Message = ({ message, index, data }) => {
	const classes = useStyles()
	// console.log(
	// 	"%cmessage.jsx -> 26 PURPLE: data, message, index",
	// 	"background: #9c27b0; color:#FFFFFF",
	// 	data,
	// 	message,
	// 	index
	// )

	const getArtribute = (key, i) => {
		let res = null
		if (key === "type") res = <Type key={key + i} index={i} message={message} data={data} type={key} />
		else {
			let data = message[key]
			let isObject = typeof data === "object" && !Array.isArray(data) && data !== null
			let isArray = Array.isArray(data) && data !== null
			// console.log(
			// 	"%cmessage.jsx -> 42 TEAL: data: ",
			// 	"background: #009688; color:#FFFFFF",
			// 	data,
			// 	" \nobject: ",
			// 	isObject,
			// 	"array: ",
			// 	isArray,
			// 	"key: ",
			// 	key
			// )
			if (!isObject && !isArray && isOsmoAddress(data)) {
				res = <Address key={key + i} index={i} address={data} name={key} type={key} />
			}
			if (isObject && data.amount && data.denom) {
				let name = key
				if (name === "tokenIn") name = "Token in"
				if (name === "tokenOut") name = "Token out"
				res = <PriceMessage key={key + i} index={i} amount={data.amount} denom={data.denom} name={name} type={key} />
			}
		}
		return res
	}

	return (
		<div
			className={
				index === data.messages.length - 1
					? `${classes.rootMessage} ${classes.rootMessageLast}`
					: `${classes.rootMessage}`
			}
		>
			{Object.keys(message)
				.sort((a, b) => {
					if (a === "type") return -1
					if (b === "type") return 1
					return 0
				})
				.map((key, i) => getArtribute(key, i))}
		</div>
	)
}

export default Message
