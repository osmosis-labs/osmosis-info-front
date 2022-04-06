import { makeStyles } from "@material-ui/core"

import React, { memo } from "react"
import TableCustom from "../../../components/table/tableCustom"
import TableSettings from "../../../components/tableSettings/TableSettings"
import { useSettings } from "../../../contexts/SettingsProvider"
import { formaterNumber, getInclude, getPercent } from "../../../helpers/helpers"
import CellPoolAPR from "./cellPoolAPR"
import CellPoolAPRTotal from "./cellPoolAPRTotal"
import CellPoolChange from "./cellPoolChange"
import CellPoolName from "./cellPoolName"

const useStyles = makeStyles((theme) => {
	return {
		poolsTableRoot: {},
		poolsTable: {},
		headerValue: {
			minWidth: "115px",
		},
		onClickCell: { color: `${theme.palette.table.link} !important` },
		cell: {
			fontSize: "16px !important",
		},
	}
})

const PoolsTable = ({
	data,
	loadingPools,
	className,
	onClickPool,
	headerClass,
	showFooter = true,
	maxRowDisplay = null,
	settings,
	setSettings,
}) => {
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

	const onSortApr = (a, b, orderBy) => {
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
		}else if(a.apr && !b.apr){
			res = -1
		}else{
			res = 1
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
			customClassHeader: headerClass,
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
			customClassHeader: headerClass,
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
			customClassHeader: headerClass,
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
			customClassHeader: headerClass,
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
			customClassHeader: headerClass,
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
			customClassHeader: headerClass,
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
			customClassHeader: headerClass,
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
			customClassHeader: headerClass,
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
			customClassHeader: headerClass,
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
			customClassHeader: headerClass,
			customClassCell: classes.cell,
			onSort: onSortApr,
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
		rowsPerPageOptions: [5, 10, 20, 50, 100],
		callBackEndPage: null,
		showFooter: showFooter,
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
	return (
		<div className={`${classes.poolsTableRoot} ${className}`}>
			<TableSettings settings={settings} setSettings={setSettings} />
			<TableCustom config={poolsTableConfig} data={data} customClass={classes.poolsTable} />
		</div>
	)
}

export default memo(PoolsTable)
