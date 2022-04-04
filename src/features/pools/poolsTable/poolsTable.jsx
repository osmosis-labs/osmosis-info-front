import { makeStyles } from "@material-ui/core"

import React, { memo } from "react"
import TableCustom from "../../../components/table/tableCustom"
import TableSettings from "../../../components/tableSettings/TableSettings"
import { useSettings } from "../../../contexts/SettingsProvider"
import { formaterNumber, getInclude, getPercent } from "../../../helpers/helpers"
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
	columnsToDisplay = null,
}) => {
	const classes = useStyles()
	const { settings, updateSettings } = useSettings()

	const setSettings = (settings) => {
		updateSettings({ poolTable: settings })
	}

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

	const sortName = (a, b, orderBy) => {
		console.log("poolsTable.jsx -> 42: a", a)
		let res = 0
		if (parseInt(b[orderBy]) < parseInt(a[orderBy])) {
			res = -1
		}
		if (parseInt(b[orderBy]) > parseInt(a[orderBy])) {
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
			customClassCell: null,
			onSort: sortId,
			align: "right",
			onClickCell: onClickPool,
			transform: null,
			cellBody: null,
		},
		{
			label: "Name",
			cellKey: "name",
			sortable: true,
			customClassHeader: headerClass,
			customClassCell: null,
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
			customClassCell: null,
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
			customClassCell: null,
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
			customClassCell: null,
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
			customClassCell: null,
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
			customClassCell: null,
			onSort: null,
			align: "right",
			onClickCell: onClickPool,
			transform: transformFees,
			cellBody: null,
		},
	]

	let poolsTableConfig = {
		defaultSort: "liquidity",
		defaultOrderBy: "desc",
		textEmpty: "No pool found",
		rowsPerPage: 10,
		rowsPerPageOptions: [5, 10, 20, 50, 100],
		callBackEndPage: null,
		showFooter: showFooter,
		maxRowDisplay: maxRowDisplay,
		cellsConfig: [],
	}
	if (settings && settings.poolTable && Array.isArray(settings.poolTable)) {
		settings.poolTable
			.sort((a, b) => a.order - b.order)
			.forEach((setting) => {
				if (setting.display) {
					let header = cellsConfig.filter((item) => item.cellKey === setting.key)

					if (header.length > 0) {
						let display = false
						if (columnsToDisplay && columnsToDisplay.length > 0) {
							let index = getInclude(columnsToDisplay, (column) => {
								return column === setting.key
							})
							display = index !== -1
						} else {
							display = true
						}
						if (display) {
							poolsTableConfig.cellsConfig.push(header[0])
						}
					}
				}
			})
	} else {
		poolsTableConfig.cellsConfig = [...cellsConfig]
	}

	return (
		<div className={`${classes.poolsTableRoot} ${className}`}>
			<TableSettings settings={settings.poolTable} setSettings={setSettings} />
			<TableCustom config={poolsTableConfig} data={data} customClass={classes.poolsTable} />
		</div>
	)
}

export default memo(PoolsTable)
