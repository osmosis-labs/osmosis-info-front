import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => {
	return {
		rootTypeMessage: {
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
		data: {
			pointerEvents: "none",
			backgroundColor: theme.palette.table.badgeBackground,
			color: theme.palette.table.badgeText,
			borderRadius: "16px",
			fontSize: "12px",
			padding: "2px 10px",
			marginLeft: "5px",
		},
        
	}
})
const TypeMessage = ({ message, index, data }) => {
	const classes = useStyles()

	return (
		<div className={`${classes.rootTypeMessage}`}>
			{" "}
			<p className={classes.name}>Type</p>
			<span className={classes.data}>{message.type}</span>
		</div>
	)
}

export default TypeMessage
