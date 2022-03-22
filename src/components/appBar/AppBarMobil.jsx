import { Dialog, IconButton, List, ListItem, ListItemText, makeStyles, Menu, MenuItem, Slide } from "@material-ui/core"
import { forwardRef, useEffect, useState } from "react"
import { p, useHistory, useLocation } from "react-router-dom"
import logo from "./logo.png"
import Search from "./Search"
import MenuIcon from "@material-ui/icons/Menu"
import CloseIcon from "@material-ui/icons/Close"
import Paper from "../paper/Paper"
import PaperDialog from "./PaperDialog"

const useStyles = makeStyles((theme) => {
	return {
		appBarMobileRoot: {
			position: "fixed",
			zIndex: theme.zIndex.appBar,
			marginTop: "40px",
			zIndex: theme.zIndex.appBar - 2,
		},
		appBarMobileContent: {
			position: "relative",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			backgroundColor: theme.palette.primary.dark,
			width: "100vw",
		},
		logo: {
			height: "25px",
			width: "25px",
			cursor: "pointer",
			transition: "all 0.3s",
			zIndex: theme.zIndex.appBar,
			"&:hover": {
				transform: "rotate(-20deg)",
			},

			marginLeft: "10px",
		},
		dialog: {},
		contentDialog: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			height: "100vh",
		},
		menuItem: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			color: theme.palette.gray.contrastText,
			margin: theme.spacing(1),
			padding: theme.spacing(1),
			textDecoration: "none",
			transition: "all 0.2s",
		},
		menuItemActive: {
			backgroundColor: theme.palette.primary.dark,
			margin: theme.spacing(1),
			padding: theme.spacing(1),
			borderRadius: theme.spacing(1),
		},
		menuItemClose: {},
		iconMenu: {
			zIndex: theme.zIndex.appBar,
		},
	}
})

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />
})

const AppBarMobile = () => {
	const classes = useStyles()
	const history = useHistory()
	let location = useLocation()
	const [currentPath, setCurrentPath] = useState("/")
	const [open, setOpen] = useState(false)

	const handleClick = (event) => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}

	useEffect(() => {
		setCurrentPath(location.pathname)
	}, [location.pathname, setCurrentPath])

	const clickItem = (path) => {
		history.push(path)
		handleClose()
	}
	return (
		<div className={classes.appBarMobileRoot}>
			<div className={classes.appBarMobileContent}>
				<img
					className={classes.logo}
					src={logo}
					alt="Osmosis logo"
					onClick={() => {
						history.push("/")
					}}
				/>
				<Dialog
					fullScreen
					open={open}
					onClose={handleClose}
					className={classes.dialog}
					TransitionComponent={Transition}
					PaperComponent={PaperDialog}
				>
					<div className={classes.contentDialog}>
						<div
							onClick={() => {
								clickItem("/")
							}}
							className={currentPath === "/" ? `${classes.menuItem} ${classes.menuItemActive}` : classes.menuItem}
						>
							<p className={currentPath === "/" ? `${classes.menuItem} ${classes.menuItemActive}` : classes.menuItem}>
								Overview
							</p>
						</div>
						<div
							onClick={() => {
								clickItem("/pools")
							}}
							className={currentPath === "/pools" ? `${classes.menuItem} ${classes.menuItemActive}` : classes.menuItem}
						>
							<p
								className={
									currentPath === "/pools" ? `${classes.menuItem} ${classes.menuItemActive}` : classes.menuItem
								}
							>
								Pools
							</p>
						</div>
						<div
							onClick={() => {
								clickItem("/tokens")
							}}
							className={currentPath === "/tokens" ? `${classes.menuItem} ${classes.menuItemActive}` : classes.menuItem}
						>
							<p
								className={
									currentPath === "/tokens" ? `${classes.menuItem} ${classes.menuItemActive}` : classes.menuItem
								}
							>
								Tokens
							</p>
						</div>
						<div
							className={currentPath === "/ibc" ? `${classes.menuItem} ${classes.menuItemActive}` : classes.menuItem}
							onClick={() => {
								clickItem("/ibc")
							}}
						>
							<p
								className={currentPath === "/ibc" ? `${classes.menuItem} ${classes.menuItemActive}` : classes.menuItem}
							>
								IBC Status
							</p>
						</div>
						<div className={`${classes.menuItem} ${classes.menuItemClose}`}>
							<IconButton aria-label="Close menu" onClick={handleClose}>
								<CloseIcon />
							</IconButton>
						</div>
					</div>
				</Dialog>

				<Search />

				<IconButton aria-label="Open menu" onClick={handleClick} className={classes.iconMenu}>
					<MenuIcon />
				</IconButton>
			</div>
		</div>
	)
}

export default AppBarMobile
