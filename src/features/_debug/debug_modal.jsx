import { AppBar, IconButton, makeStyles, TextField, Toolbar } from "@material-ui/core"
import { useTheme } from "@material-ui/core"
import ReactJson from "react-json-view"

import CloseIcon from "@mui/icons-material/Close"
import { useDebug } from "../../contexts/debug.provider"
import { useKeplr } from "../../contexts/KeplrProvider"
import { Button, MenuItem, Select } from "@mui/material"
import { isOsmoAddress } from "../../helpers/helpers"
import { useEffect, useState } from "react"
import Switch from "@mui/material/Switch"
const useStyles = makeStyles((theme) => {
	return {
		debugDialog: {
			position: "fixed",
			width: "100%",
			left: "0",
			bottom: "0",
			right: "0",
			height: `calc(100% - ${theme.menuHeight.desktop}px)`,
			display: "flex",
			flexDirection: "column",
			zIndex: "200",
			transition: "all 0.3s ease-in-out",
			[theme.breakpoints.down("xs")]: {
				height: `calc(100% - ${theme.menuHeight.mobile}px)`,
				maxHeight: `calc(100% - ${theme.menuHeight.mobile}px)`,
			},
		},
		debugDialogOpened: {
			zIndex: theme.zIndex.dialog,
			opacity: 1,
			transform: "translateY(0%)",
		},
		debugDialogClosed: {
			opacity: 0,
			zIndex: -1,
			transform: "translateY(100%)",
		},
		debugContainer: {
			backgroundColor: theme.palette.primary.main,
			overflowY: "auto",
			width: "100%",
			display: "flex",
			flexDirection: "column",
			height: "100%",
			padding: "8px",
		},
		title: {
			paddingLeft: theme.spacing(1),
			fontSize: "1.1rem",
		},
		appBardebug: {
			zIndex: theme.zIndex.drawer + 1,
			position: "relative",
		},
		row: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			margin: "8px",
			padding: "8px",
			color: theme.palette.text.primary,
		},
		space: {
			color: `${theme.palette.text.primary} !important`,
			margin: "8px",
		},
		select: {
			margin: "8px 0",
			"& .MuiInputBase-input": {
				color: `${theme.palette.text.primary} !important`,
				border: `1px solid ${theme.palette.text.primary} !important`,
			},
			"& .MuiSelect-icon": {
				color: `${theme.palette.text.primary} !important`,
			},
		},
	}
})

const DebugModal = ({}) => {
	const classes = useStyles()

	const {
		open,
		onClose,
		isAccumulated,
		setIsAccumulated,
		isStakingAccumulated,
		setIsStakingAccumulated,
		message,
		setMessage,
		messageLevel,
		setMessageLevel,
	} = useDebug()
	const { address, setAddress } = useKeplr()
	const [addressInput, setAddressInput] = useState(address)

	const onChangeAddress = (e) => {
		setAddressInput(e.target.value)
	}

	const valideAddress = () => {
		if (isOsmoAddress(addressInput)) {
			setAddress(addressInput)
			onClose()
		}
	} //osmo14ffaevheszrca8g3qyflx7qglakwl5h2d0fka4

	useEffect(() => {
		setAddressInput(address)
	}, [address])

	const onChangeAccumulated = (e) => {
		setIsAccumulated(e.target.checked)
	}

	const onChangeStakingAccumulated = (e) => {
		setIsStakingAccumulated(e.target.checked)
	}



	return (
		<div
			className={
				open
					? `${classes.debugDialog} ${classes.debugDialogOpened}`
					: `${classes.debugDialog} ${classes.debugDialogClosed}`
			}
		>
			<AppBar className={classes.appBardebug}>
				<Toolbar variant="dense">
					<IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
						<CloseIcon />
					</IconButton>
					<p className={classes.title}>Debug</p>
				</Toolbar>
			</AppBar>
			<div className={classes.debugContainer}>
				<div className={classes.row}>
					<TextField label="Wallet address" fullWidth onChange={onChangeAddress} value={addressInput} />
					<div className={classes.space}>
						<Button onClick={valideAddress} fullWidth variant="outlined">
							Update address
						</Button>
					</div>
				</div>
				<div className={classes.row}>
					<div>
						<span>Accumulation for liquidity reward: </span>
						<Switch
							label={"Accumulation for liquidity reward"}
							checked={isAccumulated}
							onChange={onChangeAccumulated}
						/>
					</div>
				</div>
				<div className={classes.row}>
					<div>
						<span>Accumulation for staking reward: </span>
						<Switch
							label={"Accumulation for staking reward"}
							checked={isStakingAccumulated}
							onChange={onChangeStakingAccumulated}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DebugModal
