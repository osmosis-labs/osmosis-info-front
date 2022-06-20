import React, { useEffect, useState } from "react"
import { makeStyles, Table, TableBody, TableCell, TableRow } from "@material-ui/core"
import HeaderTableCustom from "./header/headerTableCustom"
import RowTableCustom from "./body/rowTableCustom"
import FooterTableCustom from "./footer/footerTableCustom"
import { useSettings } from "../../contexts/SettingsProvider"

const useStyles = makeStyles((theme) => {
	return {
		tableCustom: {
			overflowX: "auto",
		},
		tableCustomTextEmpty: {
			padding: "25px",
			color: theme.palette.table.cellDark,
			fontFamily: "'Poppins' !important",
			fontSize: "15px",
			lineHeight: "23px",
		},
	}
})

const TableCustom = ({ config, data, customClass, customClassTable, notifChangeRowPerPage = null }) => {
	const classes = useStyles()
	const [order, setOrder] = useState(config.defaultOrder)
	const [orderBy, setOrderBy] = useState(config.defaultOrderBy)
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(config.rowsPerPage)
	const { settings } = useSettings()

	useEffect(() => {
		setOrder(config.defaultOrder)
		setOrderBy(config.defaultOrderBy)
		setPage(0)
	}, [settings.type])

	const onChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value)
		if (notifChangeRowPerPage) notifChangeRowPerPage(event.target.value)
		setPage(0)
	}

	const onChangePage = (newPage) => {
		setPage(newPage)
	}

	const getCellConfigByKey = (cellKey) => {
		return config.cellsConfig.find((cell) => cell.cellKey === cellKey)
	}

	const sortString = (a, b, orderBy) => {
		let res = 0
		if (b[orderBy].length === 0 || a[orderBy].length === 0) {
			if (a[orderBy].length <= 0) res = 1
			if (b[orderBy].length <= 0) res = -1
		} else {
			if (b[orderBy] < a[orderBy]) {
				res = 1
			}
			if (b[orderBy] > a[orderBy]) {
				res = -1
			}
		}
		return res
	}

	useEffect(() => {
		if (config.defaultOrderBy) {
			setOrderBy(config.defaultOrderBy)
		}
	}, [config.defaultOrderBy])

	useEffect(() => {
		if (config.defaultOrder) {
			setOrder(config.defaultOrder)
		}
	}, [config.defaultOrder])

	const sortNumber = (a, b, orderBy) => {
		let res = 0
		if (b[orderBy] < a[orderBy]) {
			res = -1
		}
		if (b[orderBy] > a[orderBy]) {
			res = 1
		}
		return res
	}

	const onSort = (configCell) => {
		const isAsc = orderBy === configCell.cellKey && order === "asc"
		setOrder(isAsc ? "desc" : "asc")
		setOrderBy(configCell.cellKey)
	}

	const displayData = (data) => {
		if (!order) {
			return data
		} else {
			let res = [...data]
			let currentConfig = getCellConfigByKey(orderBy)
			let sortMethod = currentConfig ? currentConfig.onSort : () => {}
			if (!sortMethod) {
				if (typeof data[0][currentConfig.cellKey] === "string") {
					sortMethod = sortString
				} else {
					sortMethod = sortNumber
				}
			}
			res.sort((a, b) => {
				if (order === "asc") {
					return sortMethod(a, b, orderBy, order)
				} else {
					return -sortMethod(a, b, orderBy, order)
				}
			})
			return res
		}
	}

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0

	if (data.length === 0) {
		return (
			<div className={`${classes.tableCustom} ${customClass}`}>
				<Table classes={{ root: classes.tableRoot }}>
					<HeaderTableCustom onSort={onSort} cellsHeader={config.cellsConfig} orderBy={orderBy} order={order} />
				</Table>
				<p className={classes.tableCustomTextEmpty}>{config.textEmpty}</p>
			</div>
		)
	}

	let cutRowStart = page * rowsPerPage
	let cutRowEnd = page * rowsPerPage + rowsPerPage
	if (config.maxRowDisplay && rowsPerPage > config.maxRowDisplay) {
		cutRowEnd = page * rowsPerPage + config.maxRowDisplay
	}

	return (
		<div className={`${classes.tableCustom} ${customClass}`}>
			<Table className={customClassTable}>
				<HeaderTableCustom onSort={onSort} cellsHeader={config.cellsConfig} orderBy={orderBy} order={order} />
				<TableBody>
					{displayData(data)
						.slice(cutRowStart, cutRowEnd)
						.map((row, index) => {
							return <RowTableCustom key={index} config={config} data={row} indexRow={index} />
						})}
					{emptyRows > 0 && (
						<TableRow style={{ height: 53 * emptyRows }}>
							<TableCell colSpan={config.cellsConfig.length} />
						</TableRow>
					)}
				</TableBody>
			</Table>
			{!config.hideFooter && (
				<FooterTableCustom
					rowsPerPageOptions={config.rowsPerPageOptions}
					count={data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={onChangePage}
					onChangeRowsPerPage={onChangeRowsPerPage}
					callBackEndPage={config.callBackEndPage}
				/>
			)}
		</div>
	)
}

export default TableCustom
