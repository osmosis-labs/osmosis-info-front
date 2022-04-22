import { makeStyles } from "@material-ui/core"
import dayjs from "dayjs"
import Default from "./attributes/default"
import Type from "./attributes/type"

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
		// console.log("message.jsx -> 36: key, message", key, message[key])
		let res = null
		switch (key) {
			case "type":
				res = <Type key={key + i} index={i} message={message} data={data} />
				break
			case "proof_commitment":
				res = <Default key={key + i} data="Data-default" name="Title-default" />
				break
			default:
				res = null
				break
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
			{Object.keys(message).map((key, i) => getArtribute(key, i))}
		</div>
	)
}

export default Message
