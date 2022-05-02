import { makeStyles } from "@material-ui/core"
import { useEffect, useRef, useState } from "react"
import { useDashboard } from "../../../contexts/dashboard.provider"
import ModalJSON from "../transactions/details/modal_json"
import DialogDetails from "../transactions/dialog_details"
import useSize from "../../../hooks/sizeHook"
import Details from "../transactions/details/details"
import ListTrades from "./list_trades/list_trades"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"

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
	}
})
const Trades = () => {
	const classes = useStyles()
	const size = useSize()
	const [open, setOpen] = useState(false)
	const { getTrades, getInfoTrx, ...other } = useDashboard()
	const [currentTrade, setCurrentTrade] = useState({})
	const tradesRef = useRef([])
	const [address, setAddress] = useState("")
	const [openModalJSON, setOpenModalJSON] = useState(false)
	const offset = useRef(0)
	const [loadingTrades, setLoadingTrades] = useState(false)

	useEffect(() => {
		const fetch = async () => {
			try {
				setLoadingTrades(true)
				let trades = await getTrades({ address })
				console.log("trades.jsx -> 84: trades", trades)
				tradesRef.current = trades
				setLoadingTrades(false)
			} catch (e) {
				console.log("%cTrades.jsx -> 53 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
				setLoadingTrades(false)
			}
		}

		if (address && address.length > 0) {
			fetch()
		}
	}, [address])

	useEffect(() => {
		setAddress(other.address)
	}, [other.address])

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
		let detailsTrx = await getInfoTrx({ hashTRX: data.hash.value })
		setCurrentTrade({ ...detailsTrx, ...data })
		if (size === "xs") {
			onOpen()
		}
	}

	const cbEndPage = async () => {
		try {
			setLoadingTrades(true)
			offset.current += 10
			let results = await getTrades({
				address,
				offset: offset.current,
			})
			tradesRef.current = [...tradesRef.current, ...results]
			setLoadingTrades(false)
		} catch (e) {
			setLoadingTrades(false)
			console.log("%ctransactions.jsx -> 53 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
		}
	}

	if (!address || address.length === 0) {
		return (
			<div className={classes.rootTrades}>
				<div className={classes.content}>
					<div className={classes.mainContainer}>
						<div className={classes.titleContainer}>
							<p className={classes.title}>Transactions</p>
						</div>
						<div className={classes.containerNotFound}>
							<AccountBalanceWalletIcon className={classes.iconNotFound} />
							<p className={classes.textNotFound}>Connect your wallet.</p>
						</div>
					</div>
				</div>
				{size !== "xs" ? (
					<div className={classes.detailsContainer}>
						<Details data={{}} openJSON={openJSON} />
					</div>
				) : (
					<DialogDetails open={open} onClose={onClose} data={{}} openJSON={openJSON} />
				)}
			</div>
		)
	}
	return (
		<div className={classes.rootTrades}>
			<div className={classes.content}>
				<div className={classes.mainContainer}>
					<div className={classes.titleContainer}>
						<p className={classes.title}>History Trading</p>
					</div>
					<div className={classes.listContainer}>
						<ListTrades
							data={tradesRef.current}
							className={classes.list}
							onClickRow={onClickRow}
							loadMore={cbEndPage}
							isLoading={loadingTrades}
						/>
					</div>
				</div>
			</div>
			{size !== "xs" ? (
				<div className={classes.detailsContainer}>
					<Details data={currentTrade} openJSON={openJSON} />
				</div>
			) : (
				<DialogDetails open={open} onClose={onClose} data={currentTrade} openJSON={openJSON} />
			)}
			<ModalJSON open={openModalJSON} onClose={closeJSON} data={currentTrade} />
		</div>
	)
}

export default Trades
