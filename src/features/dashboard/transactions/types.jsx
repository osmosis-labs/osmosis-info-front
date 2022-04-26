import { makeStyles } from "@material-ui/core"
import Brightness1Icon from "@mui/icons-material/Brightness1"
import HubIcon from "@mui/icons-material/Hub"
import SwapHoriz from "@mui/icons-material/SwapHoriz"
import CurrencyExchange from "@mui/icons-material/CurrencyExchange"
import Start from "@mui/icons-material/Start"
import Lock from "@mui/icons-material/Lock"
import HowToVote from "@mui/icons-material/HowToVote"
import JoinLeft from "@mui/icons-material/JoinLeft"
import AddCircle from "@mui/icons-material/AddCircle"
import SwapVerticalCircle from "@mui/icons-material/SwapVerticalCircle"
import LockClock from "@mui/icons-material/LockClock"
import ExitToApp from "@mui/icons-material/ExitToApp"
import MoveDown from "@mui/icons-material/MoveDown"
import RemoveCircle from "@mui/icons-material/RemoveCircle"
import AddCircleOutline from "@mui/icons-material/AddCircleOutline"
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline"
import LockOpen from "@mui/icons-material/LockOpen"
import { getTypeDashboard } from "../../../helpers/helpers"

const useStyles = makeStyles((theme) => {
	return {
		rootTypes: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			overflow: "hidden",
			overflowX:"auto",
			width: "100%",
			marginBottom: "20px",
			padding: "16px 8px",
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
const Types = ({ types, onChangeType, currentType }) => {
	const classes = useStyles()
	const getIcon = (type) => {
		type = getTypeDashboard(type, true)
		if (type.includes("ibc.core.")) return <HubIcon className={classes.icon} />
		if (type === "osmosis.gamm.v1beta1.MsgSwapExactAmountI") return <SwapVerticalCircle className={classes.icon} />
		if (type === "cosmos.bank.v1beta1.MsgSend") return <SwapHoriz className={classes.icon} />
		if (type === "cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward")
			return <CurrencyExchange className={classes.icon} />
		if (type === "ibc.applications.transfer.v1.MsgTransfer") return <Start className={classes.icon} />
		if (type === "osmosis.lockup.MsgLockTokens") return <Lock className={classes.icon} />
		if (type === "cosmos.gov.v1beta1.MsgVote") return <HowToVote className={classes.icon} />
		if (type === "osmosis.gamm.v1beta1.MsgJoinPool") return <JoinLeft className={classes.icon} />
		if (type === "cosmos.staking.v1beta1.MsgDelegate") return <AddCircle className={classes.icon} />
		if (type === "osmosis.gamm.v1beta1.MsgJoinSwapExternAmountIn") return <SwapVerticalCircle className={classes.icon} />
		if (type === "osmosis.lockup.MsgBeginUnlocking") return <LockClock className={classes.icon} />
		if (type === "osmosis.gamm.v1beta1.MsgExitPool") return <ExitToApp className={classes.icon} />
		if (type === "cosmos.staking.v1beta1.MsgBeginRedelegate") return <MoveDown className={classes.icon} />
		if (type === "osmosis.gamm.v1beta1.MsgSwapExactAmountOut") return <SwapVerticalCircle className={classes.icon} />
		if (type === "osmosis.superfluid.MsgLockAndSuperfluidDelegate") return <Lock className={classes.icon} />
		if (type === "cosmos.staking.v1beta1.MsgUndelegate") return <RemoveCircle className={classes.icon} />
		if (type === "osmosis.superfluid.MsgSuperfluidDelegate") return <AddCircleOutline className={classes.icon} />
		if (type === "osmosis.superfluid.MsgSuperfluidUndelegate") return <RemoveCircleOutline className={classes.icon} />
		if (type === "osmosis.superfluid.MsgSuperfluidUnbondLock") return <LockOpen className={classes.icon} />
		if (type === "cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission")
			return <MergeType className={classes.icon} />
		if (type === "osmosis.gamm.v1beta1.MsgCreatePool") return <Pool className={classes.icon} />
		return null
	}
	return (
		<div className={classes.rootTypes}>
			{types.map((type, index) => {
				return (
					<div
						className={currentType === type.type ? `${classes.type} ${classes.typeSelected}` : classes.type}
						key={type.type}
						onClick={() => {
							onChangeType(type.type)
						}}
					>
						{getIcon(type.type)}
						{type.type} ({type.count})
					</div>
				)
			})}
		</div>
	)
}

export default Types
