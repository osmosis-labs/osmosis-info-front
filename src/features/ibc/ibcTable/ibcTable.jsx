import { makeStyles } from "@material-ui/core"

import React, { memo } from "react"
import Paper from "../../../components/paper/Paper"
import TableCustom from "../../../components/table/tableCustom"
import TableSkeleton from "../../../components/table/table_skeleton"
import { MIN_BLOCKED, MIN_CONGESTED } from "../../../formaters/ibc.formatter"
import CellChain from "./cellChain"
import CellChannel from "./cellChannel"
import CellStatus from "./cellStatus"
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
		headChains: { width: "100px !important" },
		headChannels: { width: "100px !important" },
		headTrx: { width: "100px !important" },
		headStatus: { width: "100px !important" },
	}
})

const IBCTable = ({ data, isLoading, className, updateWatchlistIBC, isInWatchlist }) => {
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
		textEmpty: "No status found",
		rowsPerPage: 10,
		rowsPerPageOptions: [5, 10, 20, 50, 100],
		callBackEndPage: null,
		cellsConfig: [
			{
				label: "Chains",
				cellKey: "chains",
				sortable: true,
				customClassHeader: classes.headChains,
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
				customClassHeader: classes.headChannels,
				customClassCell: null,
				onSort: null,
				align: "left",
				onClickCell: null,
				transform: null,
				cellBody: CellChannel,
				width: "140px",
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
				customClassHeader: classes.headTrx,
				customClassCell: null,
				onSort: sortPendingTrx,
				align: "left",
				onClickCell: null,
				transform: null,
				cellBody: PendingTrx,
				width: "140px",
			},
			{
				label: "Status",
				cellKey: "status",
				sortable: true,
				customClassHeader: classes.headStatus,
				customClassCell: null,
				onSort: sortStatus,
				align: "center",
				onClickCell: null,
				transform: null,
				cellBody: CellStatus,
				width: "140px",
			},
		], //CellSource
	}
	if (isLoading) {
		const settings = configIBCTable.cellsConfig.map((conf) => ({ display: conf.cellKey }))
		return (
			<Paper className={`${classes.rootIBCTable} ${className}`}>
				<TableSkeleton config={configIBCTable} settings={settings} />
			</Paper>
		)
	}
	return (
		<Paper className={`${classes.rootIBCTable} ${className}`}>
			<TableCustom config={configIBCTable} data={data} customClassTable={classes.table} />
		</Paper>
	)
}

export default memo(IBCTable)
