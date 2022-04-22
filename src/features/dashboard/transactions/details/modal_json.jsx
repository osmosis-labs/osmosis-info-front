import { AppBar, IconButton, makeStyles, Toolbar } from "@material-ui/core"
import { useTheme } from "@material-ui/core"
import ReactJson from "react-json-view"

import CloseIcon from "@mui/icons-material/Close"
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
			backgroundColor: theme.palette.primary.main,
			overflowY: "auto",
			width: "100%",
			display: "flex",
			flexDirection: "column",
			height: "100%",
			padding: "8px",
		},
		appBarDetails: {
			zIndex: theme.zIndex.drawer + 1,
			position: "relative",
		},
		title: {
			paddingLeft: theme.spacing(1),
			fontSize: "1.1rem",
		},
	}
})

const ModalJSON = ({ data, open, onClose }) => {
	const classes = useStyles()
	const theme = useTheme()

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
					<p className={classes.title}>Transaction json</p>
				</Toolbar>
			</AppBar>
			<div className={classes.detailsContainer}>
				<ReactJson src={data} theme="paraiso" style={{ backgroundColor: theme.palette.primary.main }} />
			</div>
		</div>
	)
}

export default ModalJSON
