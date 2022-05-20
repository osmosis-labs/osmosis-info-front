import { makeStyles, TableCell } from "@material-ui/core"

import React, { memo, useEffect, useState } from "react"
import TableCustom from "../../../../components/table/tableCustom"
import { formateNumberDecimalsAuto } from "../../../../helpers/helpers"
import CellPool from "../../../pools/pool/trxTable/cellPool"
import Cell from "./cell"
import CellSymbol from "./cellSymbol"

const useStyles = makeStyles((theme) => {
	return {
		trxTableRoot: {},
		trxTable: {},
		headerValue: {
			minWidth: "115px",
		},
		onClickCell: {
			width: "140px",
			overflow: "hidden",
			textOverflow: "ellipsis",
			color: `${theme.palette.table.link} !important`,
		},
		cellTime: {
			width: "140px",
			overflow: "hidden",
			textOverflow: "ellipsis",
			whiteSpace: "nowrap",
		},
		cellType: {
			width: "75px",
			overflow: "hidden",
			textOverflow: "ellipsis",
			textAlign: "center",
		},
	}
})

const TrxTable = ({ data, className }) => {
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
				customClassCell: classes.cellTime,
				onSort: onSortTime,
				align: "left",
				onClickCell: null,
				transform: transformDisplay,
				cellBody: null,
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

	return (
		<div className={`${classes.trxTableRoot} ${className}`}>
			<TableCustom config={trxTableConfig} data={data} customClass={classes.trxTable} />
		</div>
	)
}

export default memo(TrxTable)
