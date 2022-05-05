import { makeStyles } from "@material-ui/core"
import { capitalizeFirstLetter } from "../../../../../../helpers/helpers"

const useStyles = makeStyles((theme) => {
	return {
		rootDefaultMessage: {
			display: "flex",
			flexDirection: "row",
			width: "100%",
			maxWidth: "100%",
			alignContent: "center",
			justifyContent: "space-between",
			margin: "6px 0",
			[theme.breakpoints.down("xs")]: {},
		},
		name: {
			fontSize: "12px",
			color: theme.palette.primary.contrastText,
			textOverflow: "ellipsis",
			whiteSpace: "nowrap",
			paddingRight: "10px",
		},
		data: {
			fontSize: "12px",
			textOverflow: "ellipsis",
			overflow: "hidden",
			whiteSpace: "nowrap",
			color: theme.palette.gray.textLight2,
		},
	}
})
const DefaultMessage = ({ data, name }) => {
	const classes = useStyles()
	let nameDisplay = capitalizeFirstLetter(name.replace("_", " "))

	return (
		<div className={`${classes.rootDefaultMessage}`}>
			<p className={classes.name}>{nameDisplay}</p>
			<p className={classes.data}>{data}</p>
		</div>
	)
}

export default DefaultMessage
