import { makeStyles } from "@material-ui/core"
import dayjs from "dayjs"

const useStyles = makeStyles((theme) => {
	return {
		rootMessage: {
			[theme.breakpoints.down("xs")]: {},
		},
	}
})
const Message = ({ data }) => {
	const classes = useStyles()

  	return (
		<div className={classes.rootMessage}>
			<p className={classes.title}>Transaction Message</p>
			<p className={classes.subTitle}>{dateToShow}</p>
		</div>
	)
}

export default Message
