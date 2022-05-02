import { makeStyles } from "@material-ui/core"

import React from "react"
import Paper from "../../../../components/paper/Paper"
import TableCustom from "../../../../components/table/tableCustom"
import { formateNumberDecimalsAuto } from "../../../../helpers/helpers"
import CellSymbol from "../../../pools/pool/trxTable/cellSymbol"
import CellStatus from "./cell_status"
import CellPools from "../../../pools/pool/trxTable/cellPool"

const useStyles = makeStyles((theme) => {
	return {
		rootTableTrades: {
			overflow: "hidden",
			overflowX: "auto",
		},
		TableTrades: {},
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
		},
	}
})

const TableTrades = ({ data, className, onClickRow, cbEndPage }) => {
	const classes = useStyles()

	const transformDisplay = (data) => data.display

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

	const transformUSD = (data) => {
		if (data) {
			return `$${formateNumberDecimalsAuto({ price: data })}`
		} else return "-"
	}

	const TableTradesConfig = {
		defaultSort: "time",
		defaultOrderBy: "desc",
		textEmpty: "No transactions found",
		rowsPerPage: 10,
		rowsPerPageOptions: [5, 10, 20, 50, 100],
		callBackEndPage: cbEndPage,
		cellsConfig: [
			{
				label: "Status",
				cellKey: "status",
				sortable: false,
				customClassHeader: null,
				customClassCell: null,
				onSort: null,
				align: "center",
				onClickCell: onClickRow,
				transform: null,
				cellBody: CellStatus,
			},
			{
				label: "Time",
				cellKey: "time",
				sortable: true,
				customClassHeader: null,
				customClassCell: classes.cellTime,
				onSort: onSortTime,
				align: "left",
				onClickCell: onClickRow,
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
				onClickCell: onClickRow,
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
				onClickCell: onClickRow,
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
				onClickCell: onClickRow,
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
				onClickCell: onClickRow,
				transform: transformUSD,
				cellBody: null,
			},
		],
	}

	return (
		<div className={`${classes.rootTableTrades} ${className}`}>
			<TableCustom config={TableTradesConfig} data={data} customClass={classes.TableTrades} />
		</div>
	)
}

export default TableTrades
