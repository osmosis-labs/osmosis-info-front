import { makeStyles } from "@material-ui/core"
import { useEffect, useRef, useState } from "react"
import BlocLoaderOsmosis from "../../../components/loader/BlocLoaderOsmosis"
import { useDashboard } from "../../../contexts/dashboard.provider"
import useSize from "../../../hooks/sizeHook"
import Details from "./details/details"
import DialogDetails from "./dialog_details"
import TableTrx from "./tableTrx/table_trx"
import ModalJSON from "./details/modal_json"
import Types from "./types"
import { getTypeDashboard } from "../../../helpers/helpers"

const useStyles = makeStyles((theme) => {
	return {
		rootTransactions: {
			width: "100%",
			height: "100%",
			display: "grid",

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
			overflow: "hidden",
			overflowY: "auto",
			backgroundColor: theme.palette.primary.dark2,
			maxWidth: "1200px",
			padding: "0 20px 20px 20px",
		},
		tableContainer: {
			position: "relative",
		},
		table: {
			margin: "8px 0",
			padding: "12px 0 24px 0",
		},
		detailsConatainer: {
			borderLeft: `1px solid ${theme.palette.primary.light}`,
			overflow: "hidden",
		},
		select: {
			flexWrap: "wrap",
			overflow: "hidden",
			whiteSpace: "nowrap",
			textOverflow: "ellipsis",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			padding: "8px",
			margin: "12px 8px",
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

	const [loadingTrx, setLoadingTrx] = useState(true)

	const [trx, setTrx] = useState([])
	const [types, setTypes] = useState([])
	const [typeTrx, setTypeTrx] = useState("all")

	useEffect(() => {
		const fetch = async () => {
			try {
				setLoadingTrx(true)
				let promises = [getTypeTrx({ address }), getTrx({ address })]
				let results = await Promise.all(promises)
				let types = results[0]
				let trx = results[1]
				setTypes(types)
				setCurrentTrx(trx[4])
				setTrx(trx)
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
			clogb
			setLoadingTrx(true)
			offset.current += 10
			let results = await getTrx({
				address,
				offset: offset.current,
				type: typeTrx === "all" ? null : getTypeDashboard(typeTrx, true),
			})
			setTrx([...trx, ...results])
			setLoadingTrx(false)
		} catch (e) {
			setLoadingTrx(false)
			console.log("%ctransactions.jsx -> 53 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
		}
	}

	const onChangeTypeTrx = async (value) => {
		try {
			setLoadingTrx(true)
			let type = value
			if (type === typeTrx) {
				type = "all"
			}
			setTypeTrx(value)
			let results = await getTrx({ address, offset: 0, type: type === "all" ? null : getTypeDashboard(type, true) })
			setTrx(results)
			setLoadingTrx(false)
		} catch (e) {
			console.log("%ctransactions.jsx -> 165 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
			setLoadingTrx(false)
		}
	}

	
	return (
		<div className={classes.rootTransactions}>
			<div className={classes.mainContainer}>
				<div className={classes.titleContainer}>
					<p className={classes.title}>Transactions</p>
				</div>
				<Types onChangeType={onChangeTypeTrx} types={types} currentType={typeTrx} />
				<div className={classes.tableContainer}>
					<BlocLoaderOsmosis open={loadingTrx} classNameLoading={classes.loading} />
					<TableTrx data={trx} className={classes.table} onClickRow={onClickRow} cbEndPage={cbEndPage} />
				</div>
			</div>
			{size !== "xs" ? (
				<div className={classes.detailsConatainer}>
					<Details data={currentTrx} openJSON={openJSON} />
				</div>
			) : (
				<DialogDetails open={open} onClose={onClose} data={currentTrx} openJSON={openJSON} />
			)}
			<ModalJSON open={openModalJSON} onClose={closeJSON} data={currentTrx} />
		</div>
	)
}

export default Transactions
