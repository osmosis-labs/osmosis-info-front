import { makeStyles, Table } from "@material-ui/core"

import React, { forwardRef, memo, useEffect } from "react"
import TableCustom from "../../../components/table/tableCustom"
import TableSettings from "../../../components/tableSettings/TableSettings"
import { formateNumberDecimalsAuto, formaterNumber, getInclude, getPercent } from "../../../helpers/helpers"
import CellTokenName from "./cellTokenName"
import CellTokenChange from "./cellTokenChange"
import { useSettings } from "../../../contexts/SettingsProvider"
import TableSkeleton from "../../../components/table/table_skeleton"
import HeaderTableCustom from "../../../components/table/header/headerTableCustom"
import FooterTableCustom from "../../../components/table/footer/footerTableCustom"

const useStyles = makeStyles((theme) => {
	return {
		tokensTableRoot: {},
		tokensTable: {},
		headerCell: {
			[theme.breakpoints.down("xs")]: {
				fontSize: "12px  !important",
			},
		},
		headerValue: {
			minWidth: "115px",
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

const TokensTable = forwardRef(
	(
		{
			data,
			isLoading,
			className,
			onClickToken,
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

		const transformPriceMK = (price) => {
			return `$${formaterNumber(price)}`
		}

		const transformMCap = (price) => {
			if (price) {
				return `$${formaterNumber(price)}`
			}
			return "-"
		}

		const formatTokenPrice = (value) => {
			return "$" + formateNumberDecimalsAuto({ price: value })
		}

		const onSortPercent = (a, b, orderBy, order) => {
			let res = 0
			if (a.volume24hChange && b.volume24hChange) {
				if (parseFloat(b.volume24hChange) < parseFloat(a.volume24hChange)) {
					res = -1
				}
				if (parseFloat(b.volume24hChange) > parseFloat(a.volume24hChange)) {
					res = 1
				}
			} else if (a.volume24hChange && !b.volume24hChange) {
				res = -1
			} else if (!a.volume24hChange && b.volume24hChange) {
				res = 1
			} else {
				res = 0
			}
			return res
		}

		const onSortMCap = (a, b, orderBy, order) => {
			let res = 0
			if (a.mcap && b.mcap) {
				if (b.mcap < a.mcap) {
					res = -1
				}
				if (b.mcap > a.mcap) {
					res = 1
				}
			} else if (a.mcap && !b.mcap) {
				res = order === "asc" ? -1 : 1
			} else if (b.mcap && !a.mcap) {
				res = order === "asc" ? 1 : -1
			} else {
				res = 0
			}
			return res
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
				onClickCell: onClickToken,
				transform: null,
				cellBody: null,
			},
			{
				label: "Token",
				cellKey: "name",
				sortable: true,
				customClassHeader: classes.headerCell,
				customClassCell: classes.cell,
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
				customClassHeader: classes.headerCell,
				customClassCell: classes.cell,
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
				customClassHeader: classes.headerCell,
				customClassCell: classes.cell,
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
				customClassHeader: classes.headerCell,
				customClassCell: classes.cell,
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
				customClassHeader: classes.headerCell,
				customClassCell: classes.cell,
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
				customClassHeader: classes.headerCell,
				customClassCell: classes.cell,
				onSort: onSortPercent,
				align: "right",
				onClickCell: onClickToken,
				transform: getPercent,
				cellBody: CellTokenChange,
			},
			{
				label: "Market cap",
				cellKey: "mcap",
				sortable: true,
				customClassHeader: classes.headerCell,
				customClassCell: classes.cell,
				onSort: onSortMCap,
				align: "right",
				onClickCell: onClickToken,
				transform: transformMCap,
				cellBody: null,
			},
		]

		let tokensTableConfig = {
			defaultOrderBy: "liquidity",
			defaultOrder: "asc",
			textEmpty: "No token found",
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
							tokensTableConfig.cellsConfig.push(header[0])
						}
					}
				})
		} else {
			tokensTableConfig.cellsConfig = [...cellsConfig]
		}
		if (isLoading) {
			return <TableSkeleton config={tokensTableConfig} settings={settings} />
		}
		return (
			<div className={`${classes.tokensTableRoot} ${className}`}>
				<TableSettings settings={settings} setSettings={setSettings} />

				<TableCustom
					ref={ref}
					config={tokensTableConfig}
					data={data}
					customClass={classes.tokensTable}
					notifChangeRowPerPage={notifChangeRowPerPage}
				/>
			</div>
		)
	}
)

export default memo(TokensTable)
