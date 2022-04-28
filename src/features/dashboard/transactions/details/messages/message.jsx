import { makeStyles } from "@material-ui/core"
import dayjs from "dayjs"
import { isOsmoAddress } from "../../../../../helpers/helpers"
import AddressMessage from "./attributes/address_message"
import DefaultMessage from "./attributes/default_message"
import PriceMessage from "./attributes/price_message"
import TypeMessage from "./attributes/type_message"

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
	console.log("%cmessage.jsx -> 30 BLUE: message",'background: #2196f3; color:#FFFFFF', message  )
	const getArtribute = (key, i) => {
		let res = null
		let data = message[key]
		let isObject = typeof data === "object" && !Array.isArray(data) && data !== null
		let isArray = Array.isArray(data) && data !== null
		console.log("message.jsx -> 36: data, key,", data, key,  )
		if (key === "type") res = <TypeMessage key={key + i} index={i} data={data} type={key}/>
		else if ((key === "tokenOut" || key === "tokenIn") && !data.amount && !data.denom) {
			let name = key
			if (name === "tokenIn") name = "Token in"
			if (name === "tokenOut") name = "Token out"
			res = (
				<PriceMessage
					key={key + i}
					index={i}
					amount={data.value}
					denom={data.symbol}
					name={name}
					type={key}
					usd={data.usd}
				/>
			)
		} else if (key === "pools") {
			let name = key
			res = <DefaultMessage key={key + i} index={i} data={data} name={name} />
		} else {
			if (!isObject && !isArray && isOsmoAddress(data)) {
				res = <AddressMessage key={key + i} index={i} address={data} name={key} type={key} />
			} else if (isObject && data.amount && data.denom) {
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
