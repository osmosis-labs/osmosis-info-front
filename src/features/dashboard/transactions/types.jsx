import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import HubIcon from "@mui/icons-material/Hub"
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import { getTypeDashboard } from "../../../helpers/helpers"
import MergeTypeIcon from "@mui/icons-material/MergeType"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import PoolIcon from "@mui/icons-material/Pool"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import LockIcon from "@mui/icons-material/Lock"
import LockClockIcon from "@mui/icons-material/LockClock"
import MoveDownIcon from "@mui/icons-material/MoveDown"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import JoinLeftIcon from "@mui/icons-material/JoinLeft"
import HowToVoteIcon from "@mui/icons-material/HowToVote"
import StartIcon from "@mui/icons-material/Start"
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange"
import SwapHorizIcon from "@mui/icons-material/SwapHoriz"
import InputScroll from "../../../components/input_scroll/input_scroll"
import FileUploadIcon from "@mui/icons-material/FileUpload"
import DownloadIcon from "@mui/icons-material/Download"

const useStyles = makeStyles((theme) => {
	return {
		rootTypes: {
			margin: "0 0 16px 0",
			[theme.breakpoints.down("xs")]: {},
		},
		type: {
			width: "100%",
			whiteSpace: "nowrap",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			padding: "4px 8px",
			margin: "4px 8px",
			backgroundColor: theme.palette.primary.main,
			borderRadius: "20px",
			cursor: "pointer",
			transition: "all 0.3s ease",
			border: "1px solid transparent",
		},
		typeSelected: {
			backgroundColor: theme.palette.primary.light,
			border: `1px solid ${theme.palette.yellow.gold}`,
		},
		icon: {
			marginRight: "8px",
		},
		iconIn: {
			color: theme.palette.green.text,
		},
		iconOut: {
			color: theme.palette.error.main,
		},
	}
})
const Types = ({ types, onChangeType }) => {
	const classes = useStyles()
	const [currentType, setCurrentType] = useState("all")

	const onChange = (value) => {
		let type = value
		if (type === currentType) {
			type = "all"
		}
		setCurrentType(type)
		onChangeType(type)
	}

	const getIcon = (type) => {
		type = getTypeDashboard(type, true)
		if (type.includes("ibc.core.")) return <HubIcon className={classes.icon} />
		if (type === "osmosis.gamm.v1beta1.MsgSwapExactAmountI") return <SwapVerticalCircleIcon className={classes.icon} />
		if (type === "cosmos.bank.v1beta1.MsgSend") return <SwapHorizIcon className={classes.icon} />
		if (type === "cosmos.bank.v1beta1.MsgSend.send") return <FileUploadIcon className={classes.icon} />
		if (type === "cosmos.bank.v1beta1.MsgSend.receive") return <DownloadIcon className={classes.icon} />
		if (type === "cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward")
			return <CurrencyExchangeIcon className={classes.icon} />
		if (type === "ibc.applications.transfer.v1.MsgTransfer") return <StartIcon className={classes.icon} />
		if (type === "osmosis.lockup.MsgLockTokens") return <LockIcon className={classes.icon} />
		if (type === "cosmos.gov.v1beta1.MsgVote") return <HowToVoteIcon className={classes.icon} />
		if (type === "osmosis.gamm.v1beta1.MsgJoinPool") return <JoinLeftIcon className={classes.icon} />
		if (type === "cosmos.staking.v1beta1.MsgDelegate") return <AddCircleIcon className={classes.icon} />
		if (type === "osmosis.gamm.v1beta1.MsgJoinSwapExternAmountIn")
			return <SwapVerticalCircleIcon className={classes.icon} />
		if (type === "osmosis.lockup.MsgBeginUnlocking") return <LockClockIcon className={classes.icon} />
		if (type === "osmosis.gamm.v1beta1.MsgExitPool") return <ExitToAppIcon className={classes.icon} />
		if (type === "cosmos.staking.v1beta1.MsgBeginRedelegate") return <MoveDownIcon className={classes.icon} />
		if (type === "osmosis.gamm.v1beta1.MsgSwapExactAmountOut")
			return <SwapVerticalCircleIcon className={classes.icon} />
		if (type === "osmosis.superfluid.MsgLockAndSuperfluidDelegate") return <LockIcon className={classes.icon} />
		if (type === "cosmos.staking.v1beta1.MsgUndelegate") return <RemoveCircleOutlineIcon className={classes.icon} />
		if (type === "osmosis.superfluid.MsgSuperfluidDelegate") return <AddCircleOutlineIcon className={classes.icon} />
		if (type === "osmosis.superfluid.MsgSuperfluidUndelegate")
			return <RemoveCircleOutlineIcon className={classes.icon} />
		if (type === "osmosis.superfluid.MsgSuperfluidUnbondLock") return <LockOpenIcon className={classes.icon} />
		if (type === "cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission")
			return <MergeTypeIcon className={classes.icon} />
		if (type === "osmosis.gamm.v1beta1.MsgCreatePool") return <PoolIcon className={classes.icon} />
		return null
	}
	return (
		<div className={classes.rootTypes}>
			<InputScroll>
				{types.map((type, index) => {
					return (
						<div
							className={currentType === type.type ? `${classes.type} ${classes.typeSelected}` : classes.type}
							key={type.type}
							onClick={() => {
								onChange(type.type)
							}}
						>
							{getIcon(type.type)}
							{type.type} {type.count > 99 ? "99+" : type.count}
						</div>
					)
				})}
			</InputScroll>
		</div>
	)
}
export default Types
