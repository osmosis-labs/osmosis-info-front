import { makeStyles } from "@material-ui/core"
import { useEffect, useRef, useState } from "react"
import { useDashboard } from "../../../contexts/dashboard.provider"
import ModalJSON from "../transactions/details/modal_json"
import DialogDetails from "../transactions/dialog_details"
import TableTrades from "./table_trades/table_trades"
import useSize from "../../../hooks/sizeHook"
import BlocLoaderOsmosis from "../../../components/loader/BlocLoaderOsmosis"
import Details from "../transactions/details/details"

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
			margin: "20px 0 12px 0",
		},
		title: {
			fontSize: "1.6rem",
			color: theme.palette.gray.contrastText,
		},
		detailsContainer: {
			borderLeft: `1px solid ${theme.palette.primary.light}`,
			overflow: "hidden",
		},
	}
})
const Trades = () => {
	const classes = useStyles()
	const size = useSize()
	const [open, setOpen] = useState(false)
	const { getTrades, getInfoTrx, ...other } = useDashboard()
	const [currentTrade, setCurrentTrade] = useState({})
	const [trades, setTrades] = useState([])
	const [address, setAddress] = useState("")
	const [openModalJSON, setOpenModalJSON] = useState(false)
	const offset = useRef(0)
	const [loadingTrades, setLoadingTrades] = useState(false)

	useEffect(() => {
		const fetch = async () => {
			try {
				setLoadingTrades(true)
				let trades = await getTrades({ address })
				setTrades(trades)
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
		let detailsTrx = await getInfoTrx({hashTRX: data.hash.value})
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
				type: typeTrades === "all" ? null : getTypeDashboard(typeTrades, true),
			})
			setTrades([...Trades, ...results])
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
							<p className={classes.title}>History Trading</p>
						</div>
						<p>Wallet not found.</p>
					</div>
				</div>
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
					<div className={classes.tableContainer}>
						<BlocLoaderOsmosis open={loadingTrades} classNameLoading={classes.loading} />
						<TableTrades data={trades} className={classes.table} onClickRow={onClickRow} cbEndPage={cbEndPage} />
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
