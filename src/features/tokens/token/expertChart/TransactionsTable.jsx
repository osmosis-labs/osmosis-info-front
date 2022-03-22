import { makeStyles, useMediaQuery } from "@material-ui/core"

import React, { useEffect, useState } from "react"
import TableTrx from "./TableTrx"

const useStyles = makeStyles((theme) => {
	return {
		transactionTableRoot: {
			padding: theme.spacing(1),
			display: "flex",
			flexGrow: "1",
		},
		table: {
			display: "flex",
			flexGrow: "1",
		},
	}
})

const TransactionTable = ({ getTrxToken, loadingTrx, token, className }) => {
	const classes = useStyles()
	const [trx, setTrx] = useState([])
	const [size, setSize] = useState("xl")
	const matchXS = useMediaQuery((theme) => theme.breakpoints.down("xs"))
	const matchSM = useMediaQuery((theme) => theme.breakpoints.down("sm"))
	const matchMD = useMediaQuery((theme) => theme.breakpoints.down("md"))
	const matchLD = useMediaQuery((theme) => theme.breakpoints.down("ld"))
	const [limit, setLimit] = useState(100)
	useEffect(() => {
		if (matchXS) {
			setSize("xs")
		} else if (matchSM) {
			setSize("sm")
		} else if (matchMD) {
			setSize("md")
		} else if (matchLD) {
			setSize("ld")
		} else {
			setSize("xl")
		}
	}, [matchXS, matchSM, matchMD, matchLD])
	useEffect(() => {
		const fetch = async () => {
			let data = await getTrxToken({ symbol: token.symbol, limit: limit, offset: 0 })
			setTrx(data)
			console.log("%cTransactionsTable.jsx -> 25 ORANGE: data", "background: #607d8b; color:#FFFFFF", data)
		}
		if (token.symbol) {
			fetch()
		}
	}, [token])

	const cbMax = async () => {
		let newLimit= limit+100
		console.log("TransactionsTable.jsx -> 54: bc", newLimit )
		let data = await getTrxToken({ symbol: token.symbol, limit: newLimit, offset: 0 })
		setTrx(data)
		setLimit(newLimit)
		console.log("TransactionsTable.jsx -> 58: data", data  )
	}
	return (
		<div className={`${classes.transactionTableRoot} ${className}`}>
			<div className={classes.table}>
				{trx.length === 0 ? (
					<p>No transaction</p>
				) : (
					<TableTrx data={trx} textEmpty={"Any rows"} size={size} onClickToken={null} sortable={true} />
				)}
			</div>
		</div>
	)
}

export default TransactionTable
