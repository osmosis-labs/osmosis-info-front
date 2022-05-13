import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import { Link, useHistory, useLocation } from "react-router-dom"
import ButtonConnection from "./button_connection"
import logo from "./logo.png"
import Search from "./Search"
import Toggle from "../toggle/Toggle"
import ToggleItem from "../toggle/ToggleItem"
import SelectDashboard from "./selectDashboard/select_dashboard"
import { useDashboard } from "../../contexts/dashboard.provider"
import ButtonOsmo from "../../features/dashboard/button_osmo"
import { formaterNumber } from "../../helpers/helpers"
import WarningIcon from "@mui/icons-material/Warning"
const useStyles = makeStyles((theme) => {
	return {
		appBarDesktopRoot: {
			position: "fixed",
			marginTop: "40px",
			zIndex: theme.zIndex.appBar - 2,
		},
		appBarDesktopContent: {
			position: "relative",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			backgroundColor: theme.palette.primary.dark,
			width: "100vw",
			[theme.breakpoints.down("sm")]: {
				flexDirection: "column",
			},
		},
		logo: {
			height: "25px",
			width: "25px",
			cursor: "pointer",
			margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
			zIndex: theme.zIndex.appBar,
			transition: "all 0.3s",
			"&:hover": {
				transform: "rotate(-20deg)",
			},
			[theme.breakpoints.down("sm")]: {
				margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(4)}px`,
			},
		},
		left: {
			display: "flex",
			flexDirection: "row",
			flexGrow: "2",
			alignItems: "center",
			[theme.breakpoints.down("sm")]: {
				justifyContent: "space-between",
				width: "100%",
			},
		},
		right: {
			zIndex: theme.zIndex.appBar,
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			[theme.breakpoints.down("sm")]: {
				width: "100%",
			},
		},

		menu: {
			margin: `${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(2)}px`,
			display: "flex",
			flexDirection: "row",
			alignItems: "center",

			flexWrap: "wrap",
			[theme.breakpoints.down("sm")]: {
				margin: `${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(4)}px`,
			},
		},
		menuItem: {
			color: theme.palette.gray.dark,
			padding: "4px 8px",
			margin: "0px 4px",
			verticalAlign: "middle",
			textDecoration: "none",
			transition: "all 0.2s",
			zIndex: theme.zIndex.appBar,
			"&:hover": {
				color: theme.palette.gray.contrastText,
			},
		},
		menuItemActive: {
			color: theme.palette.gray.contrastText,
			backgroundColor: theme.palette.primary.light,
			borderRadius: theme.spacing(1),
		},
		toggle: { marginLeft: "12px" },
		message: {
			display: "flex",
			alignItems: "center",
			backgroundColor: theme.palette.primary.dark,
			padding: "16px 24px 0 26px",
			color: theme.palette.error.main,
		},
		messageIcon: {
			marginRight: "8px",
		},
		messageText: {},
	}
})

const AppBarDesktop = ({ type, onChangeType, message, diplayMessage }) => {
	const classes = useStyles()
	const history = useHistory()
	let location = useLocation()
	const [currentPath, setCurrentPath] = useState("/")
	const { address, getWalletInfo } = useDashboard()
	const [osmo, setOsmo] = useState(0)

	useEffect(() => {
		setCurrentPath(location.pathname)
	}, [location.pathname, setCurrentPath])

	useEffect(() => {
		const fetch = async () => {
			let { balance } = await getWalletInfo({ address })
			let osmos = 0
			let walletOsmo = balance.wallet.find((item) => item.symbol === "OSMO")
			if (walletOsmo) {
				osmos = walletOsmo.amount
			}
			setOsmo(formaterNumber(osmos))
		}
		if (address && address.length > 0) {
			fetch()
		}
	}, [address])

	return (
		<div className={classes.appBarDesktopRoot}>
			{diplayMessage && (
				<div className={classes.message}>
					<WarningIcon className={classes.messageIcon} />
					<p className={classes.messageText}>{message}</p>
				</div>
			)}
			<div className={classes.appBarDesktopContent}>
				<div className={classes.left}>
					<img
						className={classes.logo}
						src={logo}
						alt="Osmosis logo"
						onClick={() => {
							history.push("/")
						}}
					/>
					<div className={classes.menu}>
						<Link
							to="/"
							className={currentPath === "/" ? `${classes.menuItem} ${classes.menuItemActive}` : classes.menuItem}
						>
							Overview
						</Link>
						<Link
							to="/pools"
							className={currentPath === "/pools" ? `${classes.menuItem} ${classes.menuItemActive}` : classes.menuItem}
						>
							Pools
						</Link>
						<Link
							to="/tokens"
							className={currentPath === "/tokens" ? `${classes.menuItem} ${classes.menuItemActive}` : classes.menuItem}
						>
							Tokens
						</Link>
						<Link
							to="/ibc"
							className={currentPath === "/ibc" ? `${classes.menuItem} ${classes.menuItemActive}` : classes.menuItem}
						>
							IBC Status
						</Link>
						<SelectDashboard />
					</div>
				</div>
				<div className={classes.right}>
					{address && address.length > 0 && <ButtonOsmo address={address} osmo={osmo} />}
					<Toggle color="primary" value={type} exclusive onChange={onChangeType}>
						<ToggleItem value="app">App</ToggleItem>
						<ToggleItem value="frontier">Frontier</ToggleItem>
					</Toggle>
					<ButtonConnection />
					<Search />
				</div>
			</div>
		</div>
	)
}

export default AppBarDesktop
