import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import BlocLoaderOsmosis from "../../../components/loader/BlocLoaderOsmosis"
import { useDashboard } from "../../../contexts/dashboard.provider"
import useSize from "../../../hooks/sizeHook"
import Details from "./details/details"
import DialogDetails from "./dialog_details"
import TableTrx from "./tableTrx/table_trx"
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
		loading:{
			backgroundColor: theme.palette.primary.dark2,
		},
		mainContainer: {
			position: "relative",
			overflow: "hidden",
			overflowY: "auto",
			backgroundColor: theme.palette.primary.dark2,
		},

		table: {
			margin: "8px",
			padding: "12px 0 24px 0",
		},
		detailsConatainer:{
			borderLeft: `1px solid ${theme.palette.primary.light}`,
		}
	}
})
const Transactions = () => {
	const classes = useStyles()
	const size = useSize()
	const [open, setOpen] = useState(false)
	const {  getTypeTrx, getTrx } = useDashboard()
	const [currentTrx, setCurrentTrx] = useState({})
	const address = "osmo1nzutmw5hqat76csr6qggnplemvqf5hczserhuv"
	/*
	osmo1nzutmw5hqat76csr6qggnplemvqf5hczserhuv
	osmo1ukzgv8ctsvsmwn6z7lhfqfs0cncy6d6f2kvl2vn
	*/
	const [loadingTrx, setLoadingTrx] = useState(true)

	const [trx, setTrx] = useState([])

	useEffect(() => {
		const fetch = async () => {
			try {
				let promises = [getTypeTrx({ address }), getTrx({ address })]
				let results = await Promise.all(promises)
				let types = results[0]
				let trx = results[1]
				setCurrentTrx(trx[0])
				setTrx(trx)
				setLoadingTrx(false)
				console.log("%ctransactions.jsx -> 35 BLUE: trx, type", "background: #2196f3; color:#FFFFFF", trx, types)
				console.log("transactions.jsx -> 36: address", address)
			} catch (e) {
				console.log("%ctransactions.jsx -> 53 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
				setLoadingTrx(false)
			}
		}

		if (address && address.length > 0) {
			console.log("transactions.jsx -> 61: address", address  )
			fetch()
		}
	}, [address])

	const onOpen = () => {
		setOpen(true)
	}
	const onClose = () => {
		setOpen(false)
	}

	const onClickRow = (data) => {
		setCurrentTrx(data)
		console.log("transactions.jsx -> 64: data", data)
	}
	return (
		<div className={classes.rootTransactions}>
			<div className={classes.mainContainer} onClick={onOpen}>
				<BlocLoaderOsmosis open={loadingTrx} classNameLoading={classes.loading} />
				<TableTrx data={trx} className={classes.table} onClickRow={onClickRow} />
			</div>
			{size !== "xs" ? (
				<div className={classes.detailsConatainer}>
					<Details data={currentTrx}/>
				</div>
			) : (
				<DialogDetails open={open} onClose={onClose} data={currentTrx} />
			)}
		</div>
	)
}

export default Transactions
