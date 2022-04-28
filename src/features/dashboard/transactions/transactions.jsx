import { makeStyles } from "@material-ui/core"
import { memo, useEffect, useRef, useState } from "react"
import BlocLoaderOsmosis from "../../../components/loader/BlocLoaderOsmosis"
import { useDashboard } from "../../../contexts/dashboard.provider"
import useSize from "../../../hooks/sizeHook"
import Details from "./details/details"
import DialogDetails from "./dialog_details"
import TableTrx from "./tableTrx/table_trx"
import ModalJSON from "./details/modal_json"
import Types from "./types"
import { getTypeDashboard } from "../../../helpers/helpers"
import ListTrx from "./list_trx/list_trx"

const useStyles = makeStyles((theme) => {
	return {
		rootTransactions: {
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
		detailsContainer: {
			borderLeft: `1px solid ${theme.palette.primary.light}`,
			overflow: "hidden",
		},
		icon: {
			color: theme.palette.green.text,
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
		listContainer: {},
		list: {},
	}
})
const Transactions = () => {
	const classes = useStyles()
	const size = useSize()
	const [open, setOpen] = useState(false)
	const { getTypeTrx, getTrx, getAdresses, ...other } = useDashboard()
	const [currentTrx, setCurrentTrx] = useState({})
	const [address, setAddress] = useState("")
	const [openModalJSON, setOpenModalJSON] = useState(false)
	const offset = useRef(0)

	const [loadingTrx, setLoadingTrx] = useState(false)

	const trxRef = useRef([])
	const [types, setTypes] = useState([])
	const typeTrx = useRef("all")

	useEffect(() => {
		const fetch = async () => {
			try {
				setLoadingTrx(true)
				let promises = [getTypeTrx({ address }), getTrx({ address })]
				let results = await Promise.all(promises)
				let types = results[0]
				const type = getTypeDashboard("osmosis.gamm.v1beta1.MsgSwapExactAmountIn")
				types = types.filter((t) => t.type !== type)
				let trx = results[1]
				setTypes(types)
				trxRef.current = trx
				setLoadingTrx(false)
			} catch (e) {
				console.log("%ctransactions.jsx -> 53 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
				setLoadingTrx(false)
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

	const onClickRow = (data) => {
		setCurrentTrx({ ...data })
		if (size === "xs") {
			onOpen()
		}
	}

	const cbEndPage = async () => {
		try {
			setLoadingTrx(true)
			offset.current += 10
			let results = await getTrx({
				address,
				offset: offset.current,
				type: typeTrx === "all" ? null : getTypeDashboard(typeTrx, true),
			})
			trxRef.current = [...trx, ...results]
			setLoadingTrx(false)
		} catch (e) {
			setLoadingTrx(false)
			console.log("%ctransactions.jsx -> 53 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
		}
	}

	const onChangeTypeTrx = async (type) => {
		try {
			setLoadingTrx(true)
			typeTrx.current = type
			let results = await getTrx({ address, offset: 0, type: type === "all" ? null : getTypeDashboard(type, true) })
			trxRef.current = results
			setLoadingTrx(false)
		} catch (e) {
			console.log("%ctransactions.jsx -> 165 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
			setLoadingTrx(false)
		}
	}

	if (!address || address.length === 0) {
		return (
			<div className={classes.rootTransactions}>
				<div className={classes.content}>
					<div className={classes.mainContainer}>
						<div className={classes.titleContainer}>
							<p className={classes.title}>Transactions</p>
						</div>
						<p>Wallet not found.</p>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className={classes.rootTransactions}>
			<div className={classes.content}>
				<div className={classes.mainContainer}>
					<div className={classes.titleContainer}>
						<p className={classes.title}>Transactions</p>
					</div>
					<Types onChangeType={onChangeTypeTrx} types={types} />
					{/* <div className={classes.tableContainer}>
						<BlocLoaderOsmosis open={loadingTrx} classNameLoading={classes.loading} />
						<TableTrx data={trx} className={classes.table} onClickRow={onClickRow} cbEndPage={cbEndPage} /> 
					</div> */}
					<div className={classes.listContainer}>
						<ListTrx
							data={trxRef.current}
							className={classes.list}
							onClickRow={onClickRow}
							loadMore={cbEndPage}
							isLoading={loadingTrx}
						/>
					</div>
				</div>
			</div>
			{size !== "xs" ? (
				<div className={classes.detailsContainer}>
					<Details data={currentTrx} openJSON={openJSON} />
				</div>
			) : (
				<DialogDetails open={open} onClose={onClose} data={currentTrx} openJSON={openJSON} />
			)}
			<ModalJSON open={openModalJSON} onClose={closeJSON} data={currentTrx} />
		</div>
	)
}

export default memo(Transactions)
