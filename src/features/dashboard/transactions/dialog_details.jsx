import { AppBar, IconButton, makeStyles, Toolbar } from "@material-ui/core"

import { Slide, Dialog } from "@mui/material"
import { forwardRef } from "react"
import CloseIcon from "@mui/icons-material/Close"
import Details from "./details/details"
const useStyles = makeStyles((theme) => {
	return {
		detailsDialog: {
			position: "fixed",
			width: "100%",
			left: "0",
			bottom: "0",
			right: "0",
			height: "calc(100% - 124px)",
			display: "flex",
			flexDirection: "column",
			zIndex: "200",
			transition: "all 0.3s ease-in-out",
			[theme.breakpoints.down("xs")]: {
				height: "calc(100% - 108px)",
				maxHeight: "calc(100% - 108px)",
			},
		},
		detailsDialogOpened: {
			zIndex: theme.zIndex.dialog,
			opacity: 1,
			transform: "translateY(0%)",
		},
		detailsDialogClosed: {
			opacity: 0,
			zIndex: -1,
			transform: "translateY(100%)",
		},
		detailsContainer: {
			overflowY: "auto",
			width: "100%",
			display: "flex",
			flexDirection: "column",
			height: "100%",
		},
		appBarDetails: {
			position: "relative",
		},
		title: {
			paddingLeft: theme.spacing(1),
			fontSize: "1.1rem",
		},
	}
})

const DialogDetails = ({ data, open, onClose, openJSON }) => {
	const classes = useStyles()

	return (
		<div
			className={
				open
					? `${classes.detailsDialog} ${classes.detailsDialogOpened}`
					: `${classes.detailsDialog} ${classes.detailsDialogClosed}`
			}
		>
			<AppBar className={classes.appBarDetails}>
				<Toolbar variant="dense">
					<IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
						<CloseIcon />
					</IconButton>
					<p className={classes.title}>
						Transaction details
					</p>
				</Toolbar>
			</AppBar>
			<div className={classes.detailsContainer}>
				<Details data={data} openJSON={openJSON}/>
			</div>
		</div>
	)
}

export default DialogDetails
