import { makeStyles } from "@material-ui/core"
import React, { memo } from "react"
import { useChangeLog } from "../../contexts/change_log.provider"
import AppBarChangeLog from "./app_bar_change_log"
import ChangeLog from "./change_log"
const useStyles = makeStyles((theme) => {
	return {
		changeLogContainer: {
			position: "fixed",
			width: "100%",
			left: "0",
			bottom: "0",
			right: "0",
			height: `calc(100vh - ${theme.menuHeight.desktop}px)`,
			display: "flex",
			flexDirection: "column",
			zIndex: 210,
			transition: "all 0.3s ease-in-out",
			[theme.breakpoints.down("xs")]: {
				height: `calc(100% - ${theme.menuHeight.mobile}px)`,
				maxHeight: `calc(100% - ${theme.menuHeight.mobile}px)`,
			},
		},
		changeLogContainerOpened: {
			zIndex: theme.zIndex.dialog,
			zIndex: 210,
			opacity: 1,
			transform: "translateY(0%)",
		},
		changeLogContainerClosed: {
			opacity: 0,
			zIndex: -1,
			transform: "translateY(100%)",
		},
		changeLogContent: {
			overflowY: "auto",
			width: "100%",
			display: "flex",
			flexDirection: "column",
			backgroundColor: theme.palette.primary.light,
			height: "100%",
		},
		expertChart: { minHeight: "100%" },
	}
})

const ChangeLogDialog = () => {
	const classes = useStyles()

	const { open, onClose } = useChangeLog()
	const handleClose = () => {
		onClose()
	}

	console.log("change_log_dialog.jsx (l:53): open:", open)

	return (
		<div
			className={
				open
					? `${classes.changeLogContainer} ${classes.changeLogContainerOpened}`
					: `${classes.changeLogContainer} ${classes.changeLogContainerClosed}`
			}
		>
			<AppBarChangeLog onClose={handleClose} />
			<div className={classes.changeLogContent}>
				<ChangeLog />
			</div>
		</div>
	)
}

export default ChangeLogDialog
