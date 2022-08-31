import { makeStyles, Snackbar } from "@material-ui/core"
import { useEffect, useRef, useState } from "react"
import ModalJSON from "../transactions/details/modal_json"
import DialogDetails from "../transactions/dialog_details"
import useSize from "../../../hooks/sizeHook"
import ListTrades from "./list_trades/list_trades"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import DetailsTrade from "./details_trade"
import { getTrx, useInfoTrx, useTrades, useTypeTrx } from "../../../hooks/data/dashboard.hook"
import { useKeplr } from "../../../contexts/KeplrProvider"
import ButtonCSV from "../../../components/button/button_csv"
import { useToast } from "../../../contexts/Toast.provider"
import useRequest from "../../../hooks/request.hook"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import { formatTrades } from "../../../formaters/dashboard.formatter"
import { useAssets } from "../../../hooks/data/assets.hook"
import { twoNumber } from "../../../helpers/helpers"

const useStyles = makeStyles((theme) => {
	return {
		rootTrades: {
			width: "100%",
			height: "100%",
			display: "grid",
			backgroundColor: theme.palette.primary.dark2,
			gridTemplateColumns: "2fr 1fr",
			[theme.breakpoints.down("xs")]: {
				gridTemplateColumns: "1fr",
			},
		},
		loading: {
			backgroundColor: theme.palette.primary.dark2,
		},
		mainContainer: {
			position: "relative",
			width: "100%",
			backgroundColor: theme.palette.primary.dark2,
			maxWidth: "1200px",
			padding: "0 20px 20px 20px",
		},
		content: {
			backgroundColor: theme.palette.primary.dark2,
			overflow: "hidden",
			overflowY: "auto",
			display: "flex",
			flexDirection: "column",
			height: "100%",
			alignItems: "center",
		},
		tableContainer: {
			position: "relative",
		},
		table: {
			margin: "8px 0",
			padding: "12px 0 24px 0",
		},

		titleContainer: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			margin: "32px 0 32px 0",
		},
		title: {
			fontSize: "1.6rem",
			color: theme.palette.gray.contrastText,
		},
		detailsContainer: {
			borderLeft: `1px solid ${theme.palette.primary.light}`,
			overflow: "hidden",
		},
		containerNotFound: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
		},
		iconNotFound: {
			width: "110px !important",
			height: "110px !important",
			color: theme.palette.primary.light2,
			padding: "24px",
			borderRadius: "50%",
			backgroundColor: theme.palette.primary.main,
		},
		textNotFound: {
			marginTop: "16px",
			color: theme.palette.primary.light2,
			fontSize: "20px",
		},
		btnCsv: {
			marginLeft: "16px",
		},
		toastRoot: {
			display: "flex",
			alignItems: "center",
			color: "white",
			margin: theme.spacing(2),
			padding: theme.spacing(2),
			borderRadius: "2px",
		},
		icon: {
			margin: "2px 10px 2px 2px",
		},
		text: {
			fontSize: "16px",
			paddingRight: theme.spacing(4),
		},
		info: {
			backgroundColor: theme.palette.info.main,
		},
	}
})
const Trades = () => {
	const classes = useStyles()
	const size = useSize()
	const { showToast } = useToast()
	const request = useRequest()
	const [end, setEnd] = useState(false)
	const [open, setOpen] = useState(false)
	const [openModalJSON, setOpenModalJSON] = useState(false)
	const [currentTrade, setCurrentTrade] = useState({})
	const [textTrades, setTextTrades] = useState("")
	const [nbTrx, setNbTrx] = useState(0)
	const { address, CHAIN_ID: chainId } = useKeplr()
	const [openSnack, setOpenSnack] = useState(false)
	const { data: types, isLoading: isLoadingType } = useTypeTrx({ address }, { exclude: [], chainId, address })
	const { data: assets } = useAssets()

	const { data: trades, isLoading: isLoadingTrx, isFetching, fetchNextPage } = useTrades({ address })
	const { data: trade } = useInfoTrx({ hash: currentTrade?.hash?.value }, { currentTrade, address, chainId })

	const isLoading = isLoadingTrx || isFetching

	useEffect(() => {
		if (types.length > 0) {
			setNbTrx((tp) => types.reduce((pv, cv) => pv + cv.count, 0))
		}
	}, [types])

	const onOpen = () => {
		setOpen(true)
	}
	const onClose = () => {
		setOpen(false)
	}

	const openJSON = () => {
		if (size !== "xs") {
			setOpenModalJSON(true)
		} else {
			onClose()
			setOpenModalJSON(true)
		}
	}

	const closeJSON = () => {
		if (size !== "xs") {
			setOpenModalJSON(false)
		} else {
			onOpen()
			setOpenModalJSON(false)
		}
	}

	const onClickRow = async (data) => {
		setCurrentTrade((d) => data)
		if (size === "xs") {
			onOpen()
		}
	}

	const cbEndPage = async () => {
		fetchNextPage()
		let data = await fetchNextPage()
		setEnd((end) => data.data.pages[data.data.pages.length - 1].length === 0)
	}

	const downloadTrades = async () => {
		try {
			setOpenSnack((op) => true)
			setTextTrades((tt) => `Collecting ${nbTrx} trades...`)
			let tradesDwn = await getAllTrades()

			let formatToCSV = [
				["status", "time", "pool", "value_in", "token_in", "value_out", "token_out", "value_usd"],
				...tradesDwn.map((d) => {
					let date = `${d.time.value.getFullYear()}/${twoNumber(d.time.value.getMonth() + 1)}/${twoNumber(
						d.time.value.getDate()
					)} ${twoNumber(d.time.value.getHours())}:${twoNumber(d.time.value.getMinutes())}:${twoNumber(
						d.time.value.getSeconds()
					)}`

					return [
						d.status,
						date,
						d.pools.name,
						d.tokenIn.value,
						d.tokenIn.symbol,
						d.tokenOut.value,
						d.tokenOut.symbol,
						d.usd,
					]
				}),
			]
			let csv = formatToCSV.map((row) => row.join(",")).join("\n")

			let a = document.createElement("a")
			a.href = `data:attachment/csv,${encodeURIComponent(csv)}`
			a.target = "_blank"
			a.download = `swap_${address}.csv`
			document.body.appendChild(a)
			a.click()
			document.body.removeChild(a)
			setOpenSnack((op) => false)
			showToast({ text: "Trade downloaded", severity: "success" })
		} catch (e) {
			console.log("%ctrades.jsx -> 147 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
			showToast({ text: "An error has occurred", severity: "error" })
			setOpenSnack((op) => false)
		}
	}

	const getAllTrades = async () => {
		if (nbTrx > 0) {
			let promises = []
			for (let offset = 0; offset <= nbTrx; offset += 100) {
				promises.push(getTrx({ request, address, offset }))
			}

			let results = await Promise.all(promises)
			let res = formatTrades(results.map((r) => r.data).flat(), assets)
			console.log("trades.jsx (l:211): res:", res)
			return res
		}
	}
	if (!address || address.length === 0) {
		return (
			<div className={classes.rootTrades}>
				<div className={classes.content}>
					<div className={classes.mainContainer}>
						<div className={classes.titleContainer}>
							<p className={classes.title}>Trading History</p>
							<ButtonCSV className={classes.btnCsv} onClick={downloadTrades} disabled={true}>
								.CSV
							</ButtonCSV>
						</div>
						<div className={classes.containerNotFound}>
							<AccountBalanceWalletIcon className={classes.iconNotFound} />
							<p className={classes.textNotFound}>Connect your wallet.</p>
						</div>
					</div>
				</div>
				{size !== "xs" ? (
					<div className={classes.detailsContainer}>
						<DetailsTrade data={{}} openJSON={openJSON} />
					</div>
				) : (
					<DialogDetails open={open} onClose={onClose}>
						<DetailsTrade data={{}} openJSON={openJSON} />
					</DialogDetails>
				)}
			</div>
		)
	}
	return (
		<div className={classes.rootTrades}>
			<Snackbar
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={openSnack}
			>
				<div className={`${classes.toastRoot} ${classes.info}`}>
					<FileDownloadIcon />
					<p className={classes.text}>{textTrades}</p>
				</div>
			</Snackbar>
			<div className={classes.content}>
				<div className={classes.mainContainer}>
					<div className={classes.titleContainer}>
						<p className={classes.title}>Trading History</p>
						<ButtonCSV
							className={classes.btnCsv}
							onClick={downloadTrades}
							disabled={trades.length === 0 || isLoading || nbTrx <= 0}
						>
							.CSV
						</ButtonCSV>
					</div>
					<div className={classes.listContainer}>
						<ListTrades
							data={trades}
							className={classes.list}
							onClickRow={onClickRow}
							loadMore={!end ? cbEndPage : null}
							isLoading={isLoading}
						/>
					</div>
				</div>
			</div>
			{size !== "xs" ? (
				<div className={classes.detailsContainer}>
					<DetailsTrade data={trade} openJSON={openJSON} />
				</div>
			) : (
				<DialogDetails open={open} onClose={onClose}>
					<DetailsTrade data={trade} openJSON={openJSON} />
				</DialogDetails>
			)}
			<ModalJSON open={openModalJSON} onClose={closeJSON} data={trade} />
		</div>
	)
}

export default Trades
