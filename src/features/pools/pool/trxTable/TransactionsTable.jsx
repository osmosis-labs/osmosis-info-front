import { makeStyles } from "@material-ui/core"

import React, { useEffect, useState } from "react"
import useSize from "../../../../hooks/sizeHook"
import TableTrx from "./TableTrx"

const useStyles = makeStyles((theme) => {
	return {
		transactionTableRoot: {
			padding: theme.spacing(1),
		},
		table: {
			overflowX: "auto",
		},
	}
})

const TransactionTable = ({ getTrxPool, loadingTrx, pool, className }) => {
	const classes = useStyles()
	const [trx, setTrx] = useState([])
	const size = useSize()
	const [limit, setLimit] = useState(100)
	useEffect(() => {
		const fetch = async () => {
			let data = await getTrxPool({ poolId: pool.id, limit: limit, offset: 0 })
			setTrx(data)
		}
		if (pool.id) {
			fetch()
		}
	}, [pool])

	const cbMax = async () => {}
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
