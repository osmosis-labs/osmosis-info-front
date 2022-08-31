import { makeStyles, TableCell } from "@material-ui/core"

import React, { memo, useEffect, useState } from "react"
import TableCustom from "../../../../components/table/tableCustom"
import TableSkeleton from "../../../../components/table/table_skeleton"
import { formateNumberDecimalsAuto } from "../../../../helpers/helpers"
import CellPool from "../../../pools/pool/trxTable/cellPool"
import Cell from "./cell"
import CellSymbol from "./cellSymbol"
import CellTime from "./cellTime"

const useStyles = makeStyles((theme) => {
	return {
		trxTableRoot: {},
		trxTable: {},
		headerValue: {
			minWidth: "115px",
		},
		onClickCell: {
			width: "110px",
			overflow: "hidden",
			textOverflow: "ellipsis",
			color: `${theme.palette.table.link} !important`,
		},

		cellType: {
			width: "75px",
			overflow: "hidden",
			textOverflow: "ellipsis",
			textAlign: "center",
		},
	}
})

const TrxTable = ({ data, className, isLoading, loadmore, defaultPage }) => {
	const classes = useStyles()

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
		defaultOrderBy: "time",
		defautlOrder: "asc",
		textEmpty: "No transactions found",
		rowsPerPage: 10,
		rowsPerPageOptions: [5, 10, 20, 50, 100],
		callBackEndPage: loadmore,
		defaultPage,
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
				cellBody: CellTime,
			},
			{
				label: "Type",
				cellKey: "type",
				sortable: false,
				customClassHeader: null,
				customClassCell: classes.cellType,
				onSort: null,
				align: "center",
				onClickCell: null,
				transform: null,
				cellBody: Cell,
			},
			{
				label: "Pools",
				cellKey: "pools",
				sortable: true,
				customClassHeader: null,
				customClassCell: null,
				onSort: null,
				align: "left",
				onClickCell: null,
				transform: null,
				cellBody: CellPool,
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
				cellKey: "value",
				sortable: true,
				customClassHeader: classes.headerValue,
				customClassCell: null,
				onSort: null,
				align: "right",
				onClickCell: null,
				transform: transformUSD,
				cellBody: Cell,
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
	if (isLoading) {
		const settings = trxTableConfig.cellsConfig.map((conf) => ({ display: conf.cellKey }))
		return <TableSkeleton config={trxTableConfig} settings={settings} />
	}

	return (
		<div className={`${classes.trxTableRoot} ${className}`}>
			<TableCustom config={trxTableConfig} data={data} customClass={classes.trxTable} />
		</div>
	)
}

export default memo(TrxTable)
