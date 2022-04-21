import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useDashboard } from "../../../contexts/dashboard.provider"
import useSize from "../../../hooks/sizeHook"
import Details from "./details"
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
		mainContainer: {
            overflow:"hidden",
			overflowY:"auto",
			backgroundColor: theme.palette.primary.dark2,
		},

		table:{
			margin: "8px",
			padding: "12px 0 24px 0"
		}
	}
})
const Transactions = () => {
	const classes = useStyles()
	const size = useSize()
	const [open, setOpen] = useState(false)
	const { address, getTypeTrx, getTrx } = useDashboard()

	const [trx, setTrx] = useState([])

	useEffect(() => {
		const fetch = async () => {
			let promises = [getTypeTrx({ address }), getTrx({ address })]
			let results = await Promise.all(promises)
			let types = results[0]
			let trx = results[1]
			setTrx(trx)
			console.log("%ctransactions.jsx -> 35 BLUE: trx, type", "background: #2196f3; color:#FFFFFF", trx, types)
			console.log("transactions.jsx -> 36: address", address)
		}

		if (address && address.length > 0) {
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
		console.log("transactions.jsx -> 64: data", data  )
	}
	return (
		<div className={classes.rootTransactions}>
			<div className={classes.mainContainer} onClick={onOpen}>
				<TableTrx data={trx} className={classes.table} onClickRow={onClickRow}/>
			</div>
			{size !== "xs" ? (
				<div className={classes.detailsConatainer}>
					<Details />
				</div>
			) : (
				<DialogDetails open={open} onClose={onClose} />
			)}
		</div>
	)
}

export default Transactions
