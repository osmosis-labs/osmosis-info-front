import { makeStyles, TableCell } from "@material-ui/core"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
const useStyles = makeStyles((theme) => {
	return {
		rootAttributStatus: {
			textAlign: "center",
			overflow: "hidden",
			textOverflow: "ellipsis",
			cursor: "pointer",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
		},
		icon: {
			margin: "auto",
		},
		success: {
			color: theme.palette.green.text,
		},
		failed: {
			color: theme.palette.error.main,
		},
	}
})
const AttributStatus = ({ data, config, itemConfig, itemKey }) => {
	const classes = useStyles()

	return (
		<div className={classes.rootAttributStatus}>
			{data.status === "success" ? (
				<CheckIcon className={`${classes.icon} ${classes.success}`} />
			) : (
				<CloseIcon className={`${classes.icon} ${classes.failed}`} />
			)}
		</div>
	)
}

export default AttributStatus
