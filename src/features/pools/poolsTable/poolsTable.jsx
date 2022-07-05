import { makeStyles } from "@material-ui/core"

import React, { forwardRef, memo } from "react"
import TableCustom from "../../../components/table/tableCustom"
import TableSkeleton from "../../../components/table/table_skeleton"
import TableSettings from "../../../components/tableSettings/TableSettings"
import { formaterNumber, getInclude, getPercent } from "../../../helpers/helpers"
import CellPoolAPR from "./cellPoolAPR"
import CellPoolAPRTotal from "./cellPoolAPRTotal"
import CellPoolChange from "./cellPoolChange"
import CellPoolName from "./cellPoolName"

const useStyles = makeStyles((theme) => {
	return {
		poolsTableRoot: {},
		poolsTable: {},
		headerCell: {
			[theme.breakpoints.down("xs")]: {
				fontSize: "12px  !important",
			},
		},
		headerValue: {
			minWidth: "115px",
			[theme.breakpoints.down("xs")]: {
				fontSize: "12px  !important",
			},
		},
		onClickCell: { color: `${theme.palette.table.link} !important` },
		cell: {
			fontSize: "16px !important",
			[theme.breakpoints.down("xs")]: {
				fontSize: "12px  !important",
			},
		},
	}
})

const PoolsTable = forwardRef(
	(
		{
			data,
			isLoading,
			className,
			onClickPool,
			hideFooter = false,
			maxRowDisplay = null,
			settings,
			setSettings,
			notifChangeRowPerPage = null,
		},
		ref
	) => {
		const classes = useStyles()

		const sortId = (a, b, orderBy) => {
			let res = 0
			if (parseInt(b[orderBy]) < parseInt(a[orderBy])) {
				res = -1
			}
			if (parseInt(b[orderBy]) > parseInt(a[orderBy])) {
				res = 1
			}
			return res
		}

		const onSortApr = (a, b, orderBy, order) => {
			let res = 0

			let valA = 0
			let valB = 0
			if (a.apr && b.apr) {
				if (orderBy === "internalReturn") {
					valA = a.apr.display.internal
					valB = b.apr.display.internal
				} else if (orderBy === "externalReturn") {
					valA = a.apr.display.external
					valB = b.apr.display.external
				} else {
					valA = a.apr.display.total
					valB = b.apr.display.total
				}

				if (parseFloat(valB) < parseFloat(valA)) {
					res = -1
				}
				if (parseFloat(valB) > parseFloat(valA)) {
					res = 1
				}
			} else if (a.apr && !b.apr) {
				res = order === "asc" ? -1 : 1
			} else if (b.apr & !a.apr) {
				res = order === "asc" ? 1 : -1
			} else {
				res = 0
			}
			return res
		}

		const onSortAprExternal = (a, b, orderBy, order) => {
			let res = 0
			let valA = 0
			let valB = 0
			if (a.apr && a.apr.external && b.apr && b.apr.external) {
				valA = a.apr.display.external
				valB = b.apr.display.external

				if (parseFloat(valB) < parseFloat(valA)) {
					res = -1
				}
				if (parseFloat(valB) > parseFloat(valA)) {
					res = 1
				}
			} else if (a.apr && a.apr.external && (!b.apr || !b.apr.external)) {
				res = order === "asc" ? -1 : 1
			} else if (b.apr && b.apr.external && (!a.apr || !a.apr.external)) {
				res = order === "asc" ? 1 : -1
			} else {
				res = 0
			}
			return res
		}

		const transformPriceMK = (price) => {
			return `$${formaterNumber(price)}`
		}
		const transformFees = (data) => {
			return getPercent(data)
		}

		const cellsConfig = [
			{
				label: "#",
				cellKey: "id",
				sortable: true,
				customClassHeader: classes.headerCell,
				customClassCell: classes.cell,
				onSort: sortId,
				align: "right",
				onClickCell: onClickPool,
				transform: null,
				cellBody: null,
			},
			{
				label: "Pool",
				cellKey: "name",
				sortable: true,
				customClassHeader: classes.headerCell,
				customClassCell: classes.cell,
				onSort: null,
				align: "left",
				onClickCell: onClickPool,
				transform: null,
				cellBody: CellPoolName,
			},
			{
				label: "Liquidity",
				cellKey: "liquidity",
				sortable: true,
				customClassHeader: classes.headerCell,
				customClassCell: classes.cell,
				onSort: sortId,
				align: "right",
				onClickCell: onClickPool,
				transform: transformPriceMK,
				cellBody: null,
			},
			{
				label: "Volume (24h)",
				cellKey: "volume24h",
				sortable: true,
				customClassHeader: classes.headerCell,
				customClassCell: classes.cell,
				onSort: sortId,
				align: "right",
				onClickCell: onClickPool,
				transform: transformPriceMK,
				cellBody: null,
			},
			{
				label: "Volume (24h) change",
				cellKey: "volume24hChange",
				sortable: true,
				customClassHeader: classes.headerCell,
				customClassCell: classes.cell,
				onSort: sortId,
				align: "right",
				onClickCell: onClickPool,
				transform: getPercent,
				cellBody: CellPoolChange,
			},
			{
				label: "Volume (7d)",
				cellKey: "volume7d",
				sortable: true,
				customClassHeader: classes.headerCell,
				customClassCell: classes.cell,
				onSort: sortId,
				align: "right",
				onClickCell: onClickPool,
				transform: transformPriceMK,
				cellBody: null,
			},
			{
				label: "Fees",
				cellKey: "fees",
				sortable: true,
				customClassHeader: classes.headerCell,
				customClassCell: classes.cell,
				onSort: null,
				align: "right",
				onClickCell: onClickPool,
				transform: transformFees,
				cellBody: null,
			},
			{
				label: "Total return",
				cellKey: "totalReturn",
				sortable: true,
				customClassHeader: classes.headerCell,
				customClassCell: classes.cell,
				onSort: onSortApr,
				align: "center",
				onClickCell: null,
				transform: null,
				cellBody: CellPoolAPRTotal,
			},
			{
				label: "Internal return",
				cellKey: "internalReturn",
				sortable: true,
				customClassHeader: classes.headerCell,
				customClassCell: classes.cell,
				onSort: onSortApr,
				align: "left",
				onClickCell: null,
				transform: null,
				cellBody: CellPoolAPR,
			},
			{
				label: "External return",
				cellKey: "externalReturn",
				sortable: true,
				customClassHeader: classes.headerCell,
				customClassCell: classes.cell,
				onSort: onSortAprExternal,
				align: "left",
				onClickCell: null,
				transform: null,
				cellBody: CellPoolAPR,
			},
		]

		let poolsTableConfig = {
			defaultOrderBy: "liquidity",
			defaultOrder: "asc",
			textEmpty: "No pool found",
			rowsPerPage: 10,
			rowsPerPageOptions: [10, 20, 50, 100],
			callBackEndPage: null,
			hideFooter: hideFooter,
			maxRowDisplay: maxRowDisplay,
			cellsConfig: [],
		}
		if (settings && Array.isArray(settings)) {
			settings
				.sort((a, b) => a.order - b.order)
				.forEach((setting) => {
					if (setting.display) {
						let header = cellsConfig.filter((item) => item.cellKey === setting.key)

						if (header.length > 0) {
							poolsTableConfig.cellsConfig.push(header[0])
						}
					}
				})
		} else {
			poolsTableConfig.cellsConfig = [...cellsConfig]
		}

		if (isLoading) {
			return <TableSkeleton config={poolsTableConfig} settings={settings} />
		}
		return (
			<div className={`${classes.poolsTableRoot} ${className}`}>
				<TableSettings settings={settings} setSettings={setSettings} />
				<TableCustom
					ref={ref}
					config={poolsTableConfig}
					data={data}
					customClass={classes.poolsTable}
					notifChangeRowPerPage={notifChangeRowPerPage}
				/>
			</div>
		)
	}
)

export default memo(PoolsTable)
