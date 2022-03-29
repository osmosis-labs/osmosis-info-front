import React, { useState } from "react"
import { makeStyles, Table, TableBody, TableCell, TableRow } from "@material-ui/core"
import HeaderTableCustom from "./header/headerTableCustom"
import RowTableCustom from "./body/rowTableCustom"
import FooterTableCustom from "./footer/footerTableCustom"

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

const TableCustom = ({ config, data, customClass }) => {
	const classes = useStyles()
	const [order, setOrder] = useState(config.defaultOrder)
	const [orderBy, setOrderBy] = useState(config.defaultOrderBy)
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(config.rowsPerPage)

	const onChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value)
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
			if (a[orderBy].length <= 0) res = -1
			if (b[orderBy].length <= 0) res = 1
		} else {
			if (b[orderBy] < a[orderBy]) {
				res = -1
			}
			if (b[orderBy] > a[orderBy]) {
				res = 1
			}
		}
		return res
	}

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
			let sortMethod = currentConfig.onSort
			if (!sortMethod) {
				if (typeof data[0][currentConfig.cellKey] === "string") {
					sortMethod = sortString
				} else {
					sortMethod = sortNumber
				}
			}
			res.sort((a, b) => {
				if (order === "asc") {
					return sortMethod(a, b, orderBy)
				} else {
					return -sortMethod(a, b, orderBy)
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

	return (
		<div className={`${classes.tableCustom} ${customClass}`}>
			<Table>
				<HeaderTableCustom onSort={onSort} cellsHeader={config.cellsConfig} orderBy={orderBy} order={order} />
				<TableBody>
					{displayData(data)
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
			<FooterTableCustom
				rowsPerPageOptions={config.rowsPerPageOptions}
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={onChangePage}
				onChangeRowsPerPage={onChangeRowsPerPage}
				callBackEndPage={config.callBackEndPage}
			/>
		</div>
	)
}

export default TableCustom
