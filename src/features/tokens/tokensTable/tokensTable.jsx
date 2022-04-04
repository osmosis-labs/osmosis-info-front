import { makeStyles } from "@material-ui/core"

import React, { memo } from "react"
import TableCustom from "../../../components/table/tableCustom"
import TableSettings from "../../../components/tableSettings/TableSettings"
import { useSettings } from "../../../contexts/SettingsProvider"
import { formateNumberDecimalsAuto, formaterNumber, getInclude, getPercent } from "../../../helpers/helpers"
import CellTokenName from "./cellTokenName"
import CellTokenChange from "./cellTokenChange"

const useStyles = makeStyles((theme) => {
	return {
		tokensTableRoot: {},
		tokensTable: {},
		headerValue: {
			minWidth: "115px",
		},
		onClickCell: { color: `${theme.palette.table.link} !important` },
	}
})

const TokensTable = ({
	data,
	loadingtokens,
	className,
	onClickToken,
	headerClass,
	showFooter = true,
	maxRowDisplay = null,
	columnsToDisplay = null,
}) => {
	const classes = useStyles()
	const { settings, updateSettings } = useSettings()

	const setSettings = (settings) => {
		updateSettings({ tokenTable: settings })
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

	const transformPriceMK = (price) => {
		return `$${formaterNumber(price)}`
	}

	const formatTokenPrice = (value) => {
		return "$" + formateNumberDecimalsAuto({ price: value })
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
			onClickCell: onClickToken,
			transform: null,
			cellBody: null,
		},
		{
			label: "Token",
			cellKey: "name",
			sortable: true,
			customClassHeader: headerClass,
			customClassCell: null,
			onSort: null,
			align: "left",
			onClickCell: onClickToken,
			transform: null,
			cellBody: CellTokenName,
		},
		{
			label: "Liquidity",
			cellKey: "liquidity",
			sortable: true,
			customClassHeader: headerClass,
			customClassCell: null,
			onSort: null,
			align: "right",
			onClickCell: onClickToken,
			transform: transformPriceMK,
			cellBody: null,
		},
		{
			label: "Price",
			cellKey: "price",
			sortable: true,
			customClassHeader: headerClass,
			customClassCell: null,
			onSort: null,
			align: "right",
			onClickCell: onClickToken,
			transform: formatTokenPrice,
			cellBody: null,
		},

		{
			label: "Price (24h) change",
			cellKey: "price24hChange",
			sortable: true,
			customClassHeader: headerClass,
			customClassCell: null,
			onSort: null,
			align: "right",
			onClickCell: onClickToken,
			transform: getPercent,
			cellBody: CellTokenChange,
		},
		{
			label: "Volume (24h)",
			cellKey: "volume24h",
			sortable: true,
			customClassHeader: headerClass,
			customClassCell: null,
			onSort: null,
			align: "right",
			onClickCell: onClickToken,
			transform: transformPriceMK,
			cellBody: null,
		},
		{
			label: "Volume (24h) change",
			cellKey: "volume24hChange",
			sortable: true,
			customClassHeader: headerClass,
			customClassCell: null,
			onSort: null,
			align: "right",
			onClickCell: onClickToken,
			transform: getPercent,
			cellBody: CellTokenChange,
		},
	]

	let tokensTableConfig = {
		defaultOrderBy: "liquidity",
		defaultOrder: "asc",
		textEmpty: "No token found",
		rowsPerPage: 10,
		rowsPerPageOptions: [5, 10, 20, 50, 100],
		callBackEndPage: null,
		showFooter: showFooter,
		maxRowDisplay: maxRowDisplay,
		cellsConfig: [],
	}
	if (settings && settings.tokenTable && Array.isArray(settings.tokenTable)) {
		settings.tokenTable
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
							tokensTableConfig.cellsConfig.push(header[0])
						}
					}
				}
			})
	} else {
		tokensTableConfig.cellsConfig = [...cellsConfig]
	}
	return (
		<div className={`${classes.tokensTableRoot} ${className}`}>
			<TableSettings settings={settings.tokenTable} setSettings={setSettings} />

			<TableCustom config={tokensTableConfig} data={data} customClass={classes.tokensTable} />
		</div>
	)
}

export default memo(TokensTable)
