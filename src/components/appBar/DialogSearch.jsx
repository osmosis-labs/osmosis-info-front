import { makeStyles } from "@material-ui/core"
const useStyles = makeStyles((theme) => {
	return {
		dialogSearchRoot: {
			position: "absolute",
			height: "100vh",
			width: "100vw",
			top: "0",
			left: "0",
			bottom: "0",
			right: "0",
			zIndex: "-1",

			overflowY: "auto",
		},
		content: {
			position: "absolute",
			top: "100px",
			right: "50px",
			backgroundColor: theme.palette.primary.dark,
			zIndex: "1",
			border: `1px solid ${theme.palette.primary.main}`,
			maxHeight: "600px",
			width: "800px",
			overflowY: "auto",
			padding: theme.spacing(2),
			borderRadius: theme.spacing(1),
			[theme.breakpoints.down("sm")]: {
				width: "calc(100% - 100px)",
				top: "150px",
				maxHeight: "440px",
			},
		},
		overlay: {
			opacity: "0.7",
			backgroundColor: "#000000",
			height: "100vh",
			width: "100vw",
			top: "0",
			left: "0",
			bottom: "0",
			right: "0",
			zIndex: "-1",
		},
		opened: {
			display: "block",
			opacity: "1",
			zIndex: "-1",
		},
		closed: {
			opacity: "0",
			transform: "translateX(100%)",
		},
		overlayClosed: {
			display: "none",
			transform: "translateX(100%)",
		},
		overlayOpened: {
			display: "block",
		},
	}
})

const DialogSearch = ({ children, open, handleClose }) => {
	const classes = useStyles()

	return (
		<div
			className={
				open ? `${classes.dialogSearchRoot} ${classes.opened}` : `${classes.dialogSearchRoot} ${classes.closed}`
			}
		>
			<div className={classes.content}>{children}</div>
			<div
				onClick={() => {
					handleClose()
				}}
				className={open ? `${classes.overlay} ${classes.overlayOpened}` : `${classes.overlay} ${classes.overlayClosed}`}
			></div>
		</div>
	)
}

export default DialogSearch
