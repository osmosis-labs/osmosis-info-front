import { AppBar, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core"

import CloseIcon from "@material-ui/icons/Close"
import React from "react"

const useStyles = makeStyles((theme) => {
	return {
		appBarExpertChartRoot: {
            position: 'relative'
        },
		title: {
            paddingLeft: theme.spacing(1),
			fontSize: "1.1rem",
		},
	}
})

const AppBarExpertChart = ({ onClose, token }) => {
	const classes = useStyles()
	return (
		<AppBar className={classes.appBarExpertChartRoot}>
			<Toolbar variant="dense">
				<IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
					<CloseIcon />
				</IconButton>
				<p className={classes.title}>
					Expert Chart of {token.name} ({token.symbolDisplay})
				</p>
			</Toolbar>
		</AppBar>
	)
}

export default AppBarExpertChart
