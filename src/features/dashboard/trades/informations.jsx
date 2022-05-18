import { makeStyles } from "@material-ui/core"
import dayjs from "dayjs"
import { IconButton } from "@mui/material"
import FileCopyIcon from "@mui/icons-material/FileCopy"

import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import { useToast } from "../../../contexts/Toast.provider"
import { formateNumberDecimalsAuto } from "../../../helpers/helpers"
import { usePrices } from "../../../hooks/data/prices.hook"
const useStyles = makeStyles((theme) => {
	return {
		rootInformations: {
			width: "100%",
			[theme.breakpoints.down("xs")]: {},
		},
		title: {
			color: theme.palette.primary.contrastText,
			fontSize: "16px",
			backgroundColor: theme.palette.primary.main2,
			padding: "12px 20px",
			borderRadius: "16px 16px 0 0",
			borderBottom: `1px solid ${theme.palette.primary.light}`,
		},
		row: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			padding: "8px 20px",
			alignItems: "flex-start",
			backgroundColor: theme.palette.primary.light,
		},
		rowMiddle: {
			borderBottom: `1px solid ${theme.palette.primary.main2}`,
		},
		rowEnd: {
			padding: "0 20px 12px 20px",
			borderRadius: "0 0 16px 16px ",
		},
		subTitle: {
			fontSize: "14px",
			color: theme.palette.primary.contrastText,
		},
		info: {
			width: "100%",
			fontSize: "12px",
			padding: "0 0 8px 0",
			marginTop: "4px",
			color: theme.palette.gray.textLight2,
		},
		hashContainer: {
			marginTop: "0",
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			width: "100%",
		},
		hash: {
			cursor: "pointer",
			overflow: "hidden",
			textOverflow: "ellipsis",
			color: `${theme.palette.table.link2} !important`,
		},
		iconContainer: {
			backgroundColor: `${theme.palette.primary.dark} !important`,
			borderRadius: "50% !important",
			padding: "0px",
		},
		iconHash: {
			color: theme.palette.primary.light2,
			backgroundColor: theme.palette.primary.dark,
			fontSize: "14px !important",
		},
		textStatus: {
			marginTop: "4px",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			padding: "0 0 8px 0",
			color: theme.palette.gray.textLight2,
			width: "100%",
			fontSize: "12px",
		},
		iconStatus: {
			fontSize: "16px !important",
			marginRight: "8px",
		},
		success: {
			color: theme.palette.green.text,
		},
		failed: {
			color: theme.palette.error.main,
		},
		token: {
			color: theme.palette.table.cellDark,
		},
	}
})
const Informations = ({ data }) => {
	const classes = useStyles()
	const {
		data: { priceOsmoBrut },
	} = usePrices()
	const { showToast } = useToast()
	const onClickHash = () => {
		window.open(`https://www.mintscan.io/osmosis/txs/${data.hash.value}`, "_blank")
	}

	const copyHash = () => {
		try {
			navigator.clipboard.writeText(data.hash.value)
			showToast({
				severity: "success",
				text: "TxHash copied to clipboard",
			})
		} catch (e) {
			console.log("%cinformations.jsx -> 66 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
			showToast({
				severity: "warning",
				text: "Cannot copy TxHash to clipboard",
			})
		}
	}
	let dateToShow = dayjs(data.time.value.toString()).format("YYYY-MM-DD HH:mm:ss")
	let hashDisplay = data.hash.value.substring(0, 10) + "..." + data.hash.value.substring(data.hash.value.length - 10)
	let usdFees = formateNumberDecimalsAuto({ price: data.fees * priceOsmoBrut })
	return (
		<div className={classes.rootInformations}>
			<p className={classes.title}>Informations</p>
			<div className={`${classes.row}`}>
				<p className={classes.subTitle}>Chain ID</p>
				<p className={`${classes.info}  ${classes.rowMiddle}`}>{data.chainId}</p>
			</div>
			<div className={`${classes.row}`}>
				<p className={classes.subTitle}>TxHash</p>
				<div className={`${classes.info}  ${classes.rowMiddle} ${classes.hashContainer}`}>
					<p className={`${classes.hash}`} onClick={copyHash}>
						{hashDisplay}
					</p>
					<IconButton aria-label="copy" className={classes.iconContainer} onClick={copyHash}>
						<FileCopyIcon className={classes.iconHash} />
					</IconButton>
				</div>
			</div>
			<div className={`${classes.row} `}>
				<p className={classes.subTitle}>Status</p>
				<p className={` ${classes.textStatus} ${classes.rowMiddle}`} onClick={copyHash}>
					{data.status === "success" ? (
						<CheckIcon className={` ${classes.iconStatus} ${classes.success}`} />
					) : (
						<CloseIcon className={` ${classes.iconStatus} ${classes.failed}`} />
					)}
					{data.status === "success" ? "Success" : "Failed"}
				</p>
			</div>
			<div className={`${classes.row}`}>
				<p className={classes.subTitle}>Value</p>
				<p className={`${classes.info} ${classes.rowMiddle}`}>${formateNumberDecimalsAuto({ price: data.usd })} </p>
			</div>
			<div className={`${classes.row}`}>
				<p className={classes.subTitle}>Trade price ({data.tokenIn.symbol})</p>
				<p className={`${classes.info} ${classes.rowMiddle}`}>
					${formateNumberDecimalsAuto({ price: data.tokenIn.usd })}{" "}
				</p>
			</div>
			<div className={`${classes.row}`}>
				<p className={classes.subTitle}>Trade price ({data.tokenOut.symbol})</p>
				<p className={`${classes.info} ${classes.rowMiddle}`}>
					${formateNumberDecimalsAuto({ price: data.tokenOut.usd })}{" "}
				</p>
			</div>
			<div className={`${classes.row}`}>
				<p className={classes.subTitle}>Height</p>
				<p className={`${classes.info} ${classes.rowMiddle}`}>{data.height}</p>
			</div>
			<div className={`${classes.row} ${classes.rowEnd}`}>
				<p className={classes.subTitle}>Time</p>
				<p className={`${classes.info}`}>{`${data.time.display} (${dateToShow})`}</p>
			</div>
		</div>
	)
}

export default Informations
