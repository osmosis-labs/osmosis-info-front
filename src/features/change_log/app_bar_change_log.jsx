import { AppBar, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core"

import CloseIcon from "@material-ui/icons/Close"
import React from "react"

const useStyles = makeStyles((theme) => {
	return {
		AppBarChangeLogRoot: {
			position: "relative",
		},
		title: {
			paddingLeft: theme.spacing(1),
			fontSize: "1.1rem",
		},
	}
})

const AppBarChangeLog = ({ onClose }) => {
	const classes = useStyles()
	return (
		<AppBar className={classes.AppBarChangeLogRoot}>
			<Toolbar variant="dense">
				<IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
					<CloseIcon />
				</IconButton>
				<p className={classes.title}>Changlog</p>
			</Toolbar>
		</AppBar>
	)
}

export default AppBarChangeLog
