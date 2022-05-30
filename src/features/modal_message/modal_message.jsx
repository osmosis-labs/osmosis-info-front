import { makeStyles } from "@material-ui/core"
import { Checkbox, Dialog } from "@mui/material"
import { useEffect, useState } from "react"
import ThemeButton from "../../components/button/theme_button"
import { useSettings } from "../../contexts/SettingsProvider"
import { useMessage } from "../../hooks/data/message.hook"
import InfoIcon from "@mui/icons-material/Info"
import WarningIcon from "@mui/icons-material/Warning"
import ErrorIcon from "@mui/icons-material/Error"
const useStyles = makeStyles((theme) => {
	return {
		rootModalMessage: {},
		containerModal: {
			display: "flex",
			padding: "16px",
			flexDirection: "column",
			backgroundColor: theme.palette.primary.main,
			border: `2px solid ${theme.palette.yellow.gold}`,
			color: theme.palette.primary.contrastText,
		},
		titleContainer: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			padding: "8px 0 16px 0",
		},
		title: {
			fontSize: "16px",
			fontWeight: "bold",
			marginLeft: "8px",
		},
		message: {
			padding: "0 12px",
			lineHeight: "1.5",
		},
		messageInfo: {},
		messageWarning: {
			color: theme.palette.warning.main,
		},
		messageError: {
			color: theme.palette.error.main,
		},
		messageIcon: {},
		containerCheck: {
			fontSize: "14px",
			marginTop: "16px",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "flex-start",
		},
		checkbox: {
			color: `${theme.palette.gray.main} !important`,
		},
		textCheck: {
			color: `${theme.palette.gray.main}`,
		},
		containerAction: {
			marginTop: "16px",
			display: "flex",
			justifyContent: "center",
		},
		paperPopover: {
			backgroundColor: "transparent",
			borderRadius: "20px",
		},
	}
})

const ModalMessage = ({}) => {
	const classes = useStyles()
	const { settings, updateSettings } = useSettings()
	const { data: message, isLoading, isFetching } = useMessage()
	const [isOpen, setIsOpen] = useState(false)
	const [showAgain, setShowAgain] = useState(!settings.showAgain)

	useEffect(() => {
		if (!isLoading && !isFetching) {
			// we get the message from the server
			const showAgain = settings.message.showAgain
			const storedMessage = settings.message.value
			setShowAgain(!showAgain)

			if (message.value !== storedMessage) {
				updateSettings({ message: { showAgain: true, value: message.value } })
				setShowAgain(false)
				if (message.value) {
					// new message not empty -> show it
					setIsOpen(true)
				}
			} else {
				// message is the same as the stored one
				if (showAgain && message.value) {
					setIsOpen(true)
				}
			}
		}
	}, [settings, message, isLoading, isFetching])

	const handleClose = () => {
		setIsOpen(false)
	}

	const handleChangeShowAgain = (event) => {
		let value = event.target.checked
		setShowAgain(value)
		updateSettings({ message: { ...settings.message, showAgain: !value } })
	}

	let messageClassName = `${classes.message}`
	let messageIconClassName = `${classes.messageIcon}`
	let messageTitle = `${classes.title}`
	let icon = <InfoIcon />
	if (message.level === "info") {
		messageTitle += ` ${classes.messageInfo}`
		messageClassName += ` ${classes.messageInfo}`
		messageIconClassName += ` ${classes.messageInfo}`
		icon = <InfoIcon className={messageIconClassName} />
	}
	if (message.level === "warning") {
		messageTitle += ` ${classes.messageWarning}`
		messageClassName += ` ${classes.messageWarning}`
		messageIconClassName += ` ${classes.messageWarning}`
		icon = <WarningIcon className={messageIconClassName} />
	}
	if (message.level === "error") {
		messageTitle += ` ${classes.messageError}`
		messageClassName += ` ${classes.messageError}`
		messageIconClassName += ` ${classes.messageError}`
		icon = <ErrorIcon className={messageIconClassName} />
	}

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			className={classes.rootModalMessage}
			PaperProps={{ style: { backgroundColor: "transparent", borderRadius: "4px" } }}
		>
			<div className={classes.containerModal}>
				<div className={classes.titleContainer}>
					{icon}
					<p className={messageTitle}>Information</p>
				</div>
				<p className={messageClassName}>{message.value}</p>
				<div className={classes.containerCheck}>
					<Checkbox className={classes.checkbox} value={showAgain} onChange={handleChangeShowAgain} />
					<p className={classes.textCheck}>Don't show again</p>
				</div>
				<div className={classes.containerAction}>
					<ThemeButton onClick={handleClose}>Ok</ThemeButton>
				</div>
			</div>
		</Dialog>
	)
}
export default ModalMessage
