import { makeStyles } from "@material-ui/core"

import React, { memo } from "react"
import TableCustom from "../../../components/table/tableCustom"
import CellChain from "./cellChain"
import CellChannel from "./cellChannel"
import CellSource from "./cellSource"
import CellStatus from "./cellStatus"
import DefaultCell from "./defaultCell"
import PendingTrx from "./pendingTrx"

const useStyles = makeStyles((theme) => {
	return {
		rootIBCTable: {
            width: "100%",
            maxWidth: "1200px",
        },
		table: {  },
		headerValue: {
			minWidth: "115px",
		},
		onClickCell: { color: `${theme.palette.table.link} !important` },
	}
})

const IBCTable = ({ data, loadingIBC, className, updateWatchlistIBC, isInWatchlist }) => {
	const classes = useStyles()

	const configIBCTable = {
		defaultSort: "time",
		defaultOrderBy: "desc",
		textEmpty: "No status find",
		rowsPerPage: 10,
		rowsPerPageOptions: [5, 10, 20, 50, 100],
		callBackEndPage: null,
		cellsConfig: [
			{
				label: "Chains",
				cellKey: "chains",
				sortable: true,
				customClassHeader: null,
				customClassCell: null,
				onSort: null,
				align: "left",
				onClickCell: null,
				transform: null,
				cellBody: CellChain,
				updateWatchlistIBC,
				isInWatchlist,
			},
			{
				label: "Channels",
				cellKey: "channels",
				sortable: true,
				customClassHeader: null,
				customClassCell: null,
				onSort: null,
				align: "left",
				onClickCell: null,
				transform: null,
				cellBody: CellChannel,
			},
            // {
			// 	label: "Source",
			// 	cellKey: "source",
			// 	sortable: true,
			// 	customClassHeader: null,
			// 	customClassCell: null,
			// 	onSort: null,
			// 	align: "left",
			// 	onClickCell: null,
			// 	transform: null,
			// 	cellBody: CellSource,
			// },
			{
				label: "Pending Trx",
				cellKey: "pendingTransactions",
				sortable: true,
				customClassHeader: null,
				customClassCell: null,
				onSort: null,
				align: "left",
				onClickCell: null,
				transform: null,
				cellBody: PendingTrx,
			},
			{
				label: "Status",
				cellKey: "status",
				sortable: true,
				customClassHeader: null,
				customClassCell: null,
				onSort: null,
				align: "center",
				onClickCell: null,
				transform: null,
				cellBody: CellStatus,
			},
		],//CellSource
	}
	return (
		<div className={`${classes.rootIBCTable} ${className}`}>
			<TableCustom config={configIBCTable} data={data} customClassTable={classes.table} />
		</div>
	)
}

export default memo(IBCTable)
