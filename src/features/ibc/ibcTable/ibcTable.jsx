import { makeStyles } from "@material-ui/core"

import React, { memo } from "react"
import Paper from "../../../components/paper/Paper"
import TableCustom from "../../../components/table/tableCustom"
import { MIN_BLOCKED, MIN_CONGESTED } from "../../../contexts/IBCProvier"
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
		headerValue: {
			minWidth: "115px",
		},
		onClickCell: { color: `${theme.palette.table.link} !important` },
	}
})

const IBCTable = ({ data, loadingIBC, className, updateWatchlistIBC, isInWatchlist }) => {
	const classes = useStyles()

	const sortPendingTrx = (a, b, orderBy) => {
		let aValue = a[0].size_queue + a[1].size_queue
		let bValue = b[0].size_queue + b[1].size_queue
		return bValue - aValue
	}
	const sortChains = (a, b, orderBy) => {
		let aValue = a[0].token_name.toLowerCase()
		let bValue = b[0].token_name.toLowerCase()
		if (aValue < bValue) {
			return -1
		}
		if (aValue > bValue) {
			return 1
		}
		return 0
	}
	const sortStatus = (a, b, orderBy) => {
		let aStatus = 0
		if (a[0].duration_minutes < MIN_CONGESTED) {
			aStatus += 0
		} else if (a[0].duration_minutes < MIN_BLOCKED) {
			aStatus += 2
		} else {
			aStatus += 5
		}
		if (a[1].duration_minutes < MIN_CONGESTED) {
			aStatus += 0
		} else if (a[1].duration_minutes < MIN_BLOCKED) {
			aStatus += 2
		} else {
			aStatus += 5
		}
		let bStatus = 0
		if (b[0].duration_minutes < MIN_CONGESTED) {
			bStatus += 0
		} else if (b[0].duration_minutes < MIN_BLOCKED) {
			bStatus += 2
		} else {
			bStatus += 5
		}
		if (b[1].duration_minutes < MIN_CONGESTED) {
			bStatus += 0
		} else if (b[1].duration_minutes < MIN_BLOCKED) {
			bStatus += 2
		} else {
			bStatus += 5
		}
		return aStatus - bStatus
	}

	const configIBCTable = {
		defaultOrderBy: "status",
		defaultOrder: "desc",
		textEmpty: "No status find",
		rowsPerPage: 10,
		rowsPerPageOptions: [5, 10, 20, 50, 100],
		callBackEndPage: null,
		showFooter: true,
		cellsConfig: [
			{
				label: "Chains",
				cellKey: "chains",
				sortable: true,
				customClassHeader: null,
				customClassCell: null,
				onSort: sortChains,
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
				sortable: false,
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
				onSort: sortPendingTrx,
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
				onSort: sortStatus,
				align: "center",
				onClickCell: null,
				transform: null,
				cellBody: CellStatus,
			},
		], //CellSource
	}
	return (
		<Paper className={`${classes.rootIBCTable} ${className}`}>
			<TableCustom config={configIBCTable} data={data} customClassTable={classes.table} />
		</Paper>
	)
}

export default memo(IBCTable)
