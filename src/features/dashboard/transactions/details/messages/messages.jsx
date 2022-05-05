import { makeStyles } from "@material-ui/core"
import dayjs from "dayjs"
import Message from "./message"

const useStyles = makeStyles((theme) => {
	return {
		rootMessages: {
			width: "100%",
			marginTop: "24px",
			[theme.breakpoints.down("xs")]: {},
		},
		title: {
			color: theme.palette.primary.contrastText,
			fontSize: "16px",
			backgroundColor: theme.palette.primary.main2,
			padding: "12px 20px",
			borderRadius: "16px 16px 0 0",
			borderBottom: `1px solid ${theme.palette.primary.light}`,
		},
		noMessage: {
			width: "100%",
			fontSize: "12px",
			fontWeight: "bold",
			padding: "0 0 8px 0",
			marginTop: "4px",
			color: theme.palette.gray.dark,
		},
	}
})
const Messages = ({ data }) => {
	const classes = useStyles()
	console.log("%cmessages.jsx -> 32 TEAL: messages", "background: #009688; color:#FFFFFF", data.messages)

	return (
		<div className={classes.rootMessages}>
			<p className={classes.title}>{data.messages.length > 1 ? "Messages" : "Message"}</p>
			{data.messages.length === 0 ? <p className={classes.noMessage}>Any message for this transaction</p> : null}
			{data.messages.map((message, index) => {
				return <Message message={message} data={data} index={index} key={index} />
			})}
		</div>
	)
}

export default Messages
