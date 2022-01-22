import React from "react"
import { Snackbar, makeStyles } from "@material-ui/core"
import ErrorIcon from "@material-ui/icons/Error"
import WarningIcon from "@material-ui/icons/Warning"
import CheckIcon from "@material-ui/icons/Check"
import InfoIcon from "@material-ui/icons/Info"

const useStyles = makeStyles((theme) => {
	return {
		toastRoot: {
			display: "flex",
			alignItems: "center",
			color: "white",
			margin: theme.spacing(2),
			padding: theme.spacing(2),
			borderRadius: "2px",
		},
		icon: {
			margin: "2px 10px 2px 2px",
		},
		text: {
			fontSize: "16px",
			paddingRight: theme.spacing(4),
		},
		success: {
			backgroundColor: theme.palette.success.main,
		},

		info: {
			backgroundColor: theme.palette.info.main,
		},

		warning: {
			backgroundColor: theme.palette.warning.main,
		},

		error: {
			backgroundColor: theme.palette.error.main,
		},
	}
})

// Component used for displaying a short info to the user, like success of his action
const Toast = ({ open, severity, message, handleClose }) => {
	const classes = useStyles()
	const icons = {
		error: <ErrorIcon className={classes.icon} />,
		warning: <WarningIcon className={classes.icon} />,
		success: <CheckIcon className={classes.icon} />,
		info: <InfoIcon className={classes.icon} />,
	}
	return (
		<Snackbar
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={open}
			autoHideDuration={2000}
			onClose={handleClose}
		>
			<div className={`${classes.toastRoot} ${classes[severity]}`}>
				{icons[severity]}
				<p className={classes.text}>{message}</p>
			</div>
		</Snackbar>
	)
}

export default Toast
