import { makeStyles, TableCell } from "@material-ui/core"

import React, { memo, useEffect, useState } from "react"
import TableCustom from "../../../../components/table/tableCustom"
import { formateNumberDecimalsAuto, formateNumberPriceDecimals } from "../../../../helpers/helpers"
import CellPools from "./cellPool"
import CellSymbol from "./cellSymbol"

const useStyles = makeStyles((theme) => {
	return {
		trxTableRoot: {},
		trxTable: {},
		headerValue: {
			minWidth: "115px",
		},
		onClickCell: { color: `${theme.palette.table.link} !important`  },
	}
})

const TrxTable = ({ getTrxPool, loadingTrx, pool, className }) => {
	const classes = useStyles()
	const [trx, setTrx] = useState([])
	useEffect(() => {
		const fetch = async () => {
			let data = await getTrxPool({ poolId: pool.id, limit: 100, offset: 0 })
			setTrx(data)
		}
		if (pool.id) {
			fetch()
		}
	}, [pool])
	const onClickAddress = (row) => {
		window.open(`https://www.mintscan.io/osmosis/account/${row.address.value}`, "_blank")
	}
	const onClickHash = (row) => {
		window.open(`https://www.mintscan.io/osmosis/txs/${row.hash.value}`, "_blank")
	}
	const transformDisplay = (data) => data.display
	const transformUSD = (data) => {
		return `$${formateNumberDecimalsAuto({ price: data })}`
	}
	const onSortTime = (a, b, orderBy) => {
		let res = 0
		if (b[orderBy].value < a[orderBy].value) {
			res = 1
		}
		if (b[orderBy].value > a[orderBy].value) {
			res = -1
		}
		return res
	}
	const trxTableConfig = {
		defaultSort: "time",
		defautlOrder: "desc",
		textEmpty: "No transactions found",
		rowsPerPage: 10,
		rowsPerPageOptions: [5, 10, 20, 50, 100],
		callBackEndPage: null,
		cellsConfig: [
			{
				label: "Hash",
				cellKey: "hash",
				sortable: false,
				customClassHeader: null,
				customClassCell: classes.onClickCell,
				onSort: null,
				align: "left",
				onClickCell: onClickHash,
				transform: transformDisplay,
				cellBody: null,
			},
			{
				label: "Time",
				cellKey: "time",
				sortable: true,
				customClassHeader: null,
				customClassCell: null,
				onSort: onSortTime,
				align: "left",
				onClickCell: null,
				transform: transformDisplay,
				cellBody: null,
			},
			{
				label: "Pools",
				cellKey: "pools",
				sortable: true,
				customClassHeader: null,
				customClassCell: null,
				onSort: (a, b, orderBy) => {
					return 0
				},
				align: "left",
				onClickCell: null,
				transform: null,
				cellBody: CellPools,
			},
			{
				label: "Token in",
				cellKey: "tokenIn",
				sortable: false,
				customClassHeader: null,
				customClassCell: null,
				onSort: null,
				align: "right",
				onClickCell: null,
				transform: null,
				cellBody: CellSymbol,
			},
			{
				label: "Token out",
				cellKey: "tokenOut",
				sortable: false,
				customClassHeader: null,
				customClassCell: null,
				onSort: null,
				align: "right",
				onClickCell: null,
				transform: null,
				cellBody: CellSymbol,
			},
			{
				label: "$ Value",
				cellKey: "usd",
				sortable: true,
				customClassHeader: classes.headerValue,
				customClassCell: null,
				onSort: null,
				align: "right",
				onClickCell: null,
				transform: transformUSD,
				cellBody: null,
			},
			{
				label: "Address",
				cellKey: "address",
				sortable: false,
				customClassHeader: null,
				customClassCell: classes.onClickCell,
				onSort: null,
				align: "left",
				onClickCell: onClickAddress,
				transform: transformDisplay,
				cellBody: null,
			},
		],
	}

	return (
		<div className={`${classes.trxTableRoot} ${className}`}>
			<TableCustom config={trxTableConfig} data={trx} customClass={classes.trxTable} />
		</div>
	)
}

export default memo(TrxTable)
