import { makeStyles } from "@material-ui/core"
import ItemSelectDashboard from "./item_select_dashboard"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useEffect, useState } from "react"
import { Popover } from "@mui/material"
import { useHistory } from "react-router-dom"
import { useLocation } from "react-router-dom"
const useStyles = makeStyles((theme) => {
	return {
		rootSelectDashboard: {
			cursor: "pointer",
			color: theme.palette.gray.dark,
			width: "125px",

			margin: "0px 4px",
			transition: "all 0.2s",
			"&:hover": {
				color: theme.palette.gray.contrastText,
			},
			[theme.breakpoints.down("xs")]: {},
		},
		mainItem: {
			display: "flex",
			alignItems: "center",
			padding: "4px 8px",
			justifyContent: "space-between",
			transition: "all 0.2s",
		},
		mainItemActived: {
			color: theme.palette.gray.contrastText,
			backgroundColor: theme.palette.primary.light,
			borderRadius: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px`,
		},
		mainItemOpened: {
			color: theme.palette.gray.contrastText,
			backgroundColor: theme.palette.primary.light,
			borderRadius: `${theme.spacing(1)}px ${theme.spacing(1)}px 0 0`,
		},

		mainItemText: {},
		mainItemIcon: {},
		itemsContainer: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: theme.palette.primary.light,
			borderRadius: 0,
		},
		popRoot: {},
		popPaper: {
			backgroundColor: `${theme.palette.primary.light} !important`,

			borderRadius: ` 0 0 ${theme.spacing(1)}px ${theme.spacing(1)}px !important`,
		},
	}
})
const SelectMenu = ({ callback }) => {
	const classes = useStyles()
	const [anchorEl, setAnchorEl] = useState(null)
	const history = useHistory()
	const location = useLocation()
	const [actived, setActived] = useState(false)

	useEffect(() => {
		if (location.pathname.includes("dashboard")) {
			setActived(true)
		} else {
			setActived(false)
		}
	}, [location.pathname])

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const onClickItem = (path) => {
		history.push(path)
		handleClose()
		if (callback) callback()
	}

	const open = Boolean(anchorEl)
	const id = open ? "simple-popover" : undefined

	let classMain = classes.mainItem
	if (actived) classMain += ` ${classes.mainItemActived}`
	if (open) classMain += ` ${classes.mainItemOpened}`

	return (
		<div className={classes.rootSelectDashboard}>
			<div className={classMain} onClick={handleClick}>
				<p className={classes.mainItemText}>Menu</p>
				<ExpandMoreIcon className={classes.mainItemIcon} />
			</div>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				classes={{ paper: classes.popPaper }}
			>
				<div className={classes.itemsContainer}>
					<ItemSelectDashboard exact={true} name="Overview" path="/" onClickItem={onClickItem} />
					<ItemSelectDashboard exact={true} name="Pools" path="/pools" onClickItem={onClickItem} />
					<ItemSelectDashboard exact={true} name="Tokens" path="/tokens" onClickItem={onClickItem} />
					<ItemSelectDashboard exact={true} name="IBC Status" path="/ibc" onClickItem={onClickItem} />
				</div>
			</Popover>
		</div>
	)
}

export default SelectMenu
