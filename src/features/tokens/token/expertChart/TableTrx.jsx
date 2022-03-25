import { makeStyles, Table, TableBody, TableCell, TableRow, Tooltip } from "@material-ui/core"
import { useState } from "react"
import TablePagination from "../../../../components/tablePagination/TablePagination"
import { formateNumberDecimalsAuto, formaterNumber } from "../../../../helpers/helpers"
import TableHeaderTrx from "./TableHeaderTrx"
import LaunchIcon from "@material-ui/icons/Launch"
const useStyles = makeStyles((theme) => {
	return {
		tableTrxRoot: {
			width: "100%",
		},
		visuallyHidden: {
			border: 0,
			clip: "rect(0 0 0 0)",
			height: 1,
			margin: -1,
			overflow: "hidden",
			padding: 0,
			position: "absolute",
			top: 20,
			width: 1,
		},
		textEmpty: {
			padding: theme.spacing(2),
		},
		clickable: {
			cursor: "pointer",
		},
		image: {
			width: "30px",
			marginRight: theme.spacing(1),
			marginLeft: theme.spacing(1),
			position: "absolute",
			top: "-50%",
			[theme.breakpoints.down("xs")]: {
				width: "30px",
				top: "-50%",
			},
		},
		images: {
			padding: theme.spacing(1),
			position: "relative",
		},
		cell: {
			fontSize: theme.fontSize.small,
			padding: "2px 8px 2px 10px",
			borderColor: theme.palette.primary.main,
		},
		iconRow: {
			paddingRight: "4px",
			justifySelf: "end",
		},
		rowIcon: {
			display: "grid",
			gridTemplateColumns: "1fr 100px",
			alignItems: "center",
			justifyItems: "start",
		},
		cellH: {
			fontSize: theme.fontSize.small,
		},
		rows: {},
		cellBuy: { color: theme.palette.green.text },
		cellSell: { color: theme.palette.error.main },
		// rowBuy: {
		// 	backgroundColor: `${theme.palette.green.background} !important`,
		// },
		// rowSell: {
		// 	backgroundColor: `${theme.palette.red.background} !important`,
		// },
		headerClickable: {
			cursor: "pointer",
		},
		cellToken: {},
		cellHash: {
			fontSize: theme.fontSize.small,
			borderColor: theme.palette.primary.main,
			textOverflow: "ellipsis",
			overflow: "hidden",
			maxWidth: "200px",
			color: theme.palette.primary.contrastText,
			transition: "all 0.2s ease",
			"&:hover": {
				textDecoration: "underline",
			},
		},
	}
})

// Component used for display Tokens table
const TableTrx = ({ data, textEmpty, size = "ld", sortable = true, onClickToken, cbMax = null }) => {
	const classes = useStyles()
	const [order, setOrder] = useState("asc")
	const [orderBy, setOrderBy] = useState("time")
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(5)

	const handleChangeRowsPerPage = (event, value) => {
		setRowsPerPage(event.target.value)
		setPage(0)
	}

	const handleChangePage = (newPage) => {
		setPage(newPage)
	}

	const handleRequestSort = (property) => {
		const isAsc = orderBy === property && order === "asc"
		setOrder(isAsc ? "desc" : "asc")
		setOrderBy(property)
	}

	const orderNumber = (a, b, orderBy) => {
		let res = 0
		if (b[orderBy] < a[orderBy]) {
			res = 1
		}
		if (b[orderBy] > a[orderBy]) {
			res = -1
		}
		return res
	}
	const orderString = (a, b, orderBy) => {
		let res = 0
		// check if a string is empty or not
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

	const orderNumberInt = (a, b, orderBy) => {
		let res = 0
		if (parseInt(b[orderBy]) < parseInt(a[orderBy])) {
			res = 1
		}
		if (parseInt(b[orderBy]) > parseInt(a[orderBy])) {
			res = -1
		}
		return res
	}

	const orderTime = (a, b, orderBy) => {
		let res = 0
		if (b[orderBy].value < a[orderBy].value) {
			res = 1
		}
		if (b[orderBy].value > a[orderBy].value) {
			res = -1
		}
		return res
	}

	const descendingComparator = (a, b, orderBy) => {
		if (orderBy === "name") return orderString(a, b, orderBy)
		if (orderBy === "id") return orderNumberInt(a, b, orderBy)
		if (orderBy === "time") return orderTime(a, b, orderBy)
		return orderNumber(a, b, orderBy)
	}

	const getComparator = () => {
		return order === "desc"
			? (a, b) => descendingComparator(a, b, orderBy)
			: (a, b) => -descendingComparator(a, b, orderBy)
	}

	const getHeadCells = () => {
		const transformTime = (time) => {
			return `${time.display}`
		}
		const transformHash = (hash) => {
			return `${hash.display}`
		}
		const transformAddress = (address) => {
			return `${address.display}`
		}
		const transformToken = (token) => {
			return `${formaterNumber(token.value)} ${token.symbol}`
		}
		const onClickAddress = (row) => {
			window.open(`https://www.mintscan.io/osmosis/account/${row.address.value}`, "_blank")
		}
		const onClickHash = (row) => {
			window.open(`https://www.mintscan.io/osmosis/txs/${row.hash.value}`, "_blank")
		}
		let head = [
			{
				id: "type",
				cellClasses: `${classes.cell} ${classes.cellType}`,
				classes: `${classes.cellH} ${classes.cellTypeH}`,
				sortable: sortable,
				disablePadding: false,
				label: "Type",
				component: "th",
				align: "center",
				padding: "none",
			},
			{
				id: "time",
				cellClasses: `${classes.cell} ${classes.cellType}`,
				classes: `${classes.cellH} ${classes.cellTypeH}`,
				sortable: sortable,
				transform: transformTime,
				disablePadding: false,
				label: "Time",
				align: "right",
			},
			{
				id: "hash",
				cellClasses: `${classes.cell} ${classes.cellHash}`,
				classes: `${classes.cellH} ${classes.cellHashH}`,
				sortable: false,
				transform: transformHash,
				disablePadding: false,
				label: "TX Hash",
				align: "right",
				onClick: onClickHash,
			},
			{
				id: "address",
				cellClasses: `${classes.cell} ${classes.cellHash}`,
				classes: `${classes.cellH} ${classes.cellHashH}`,
				sortable: false,
				transform: transformAddress,
				disablePadding: false,
				label: "Address",
				align: "right",
				onClick: onClickAddress,
			},
			{
				id: "tokenIn",
				cellClasses: `${classes.cell} ${classes.cellToken}`,
				classes: `${classes.cellH} ${classes.cellTokenH}`,
				sortable: false,
				transform: transformToken,
				disablePadding: false,
				label: "Token In",
				align: "right",
			},
			{
				id: "tokenOut",
				cellClasses: `${classes.cell} ${classes.cellToken}`,
				classes: `${classes.cellH} ${classes.cellTokenH}`,
				sortable: false,
				transform: transformToken,
				disablePadding: false,
				label: "Token out",
				align: "right",
			},
		]

		let headToDisplay = [...head]
		return headToDisplay
	}

	const sortData = (data) => {
		if (!sortable) return data
		const stabilizedThis = data.map((el, index) => [el, index])
		const comparator = getComparator()
		stabilizedThis.sort((a, b) => {
			const order = comparator(a[0], b[0])
			if (order !== 0) return order
			return a[1] - b[1]
		})
		return stabilizedThis.map((el) => el[0])
	}

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)
	const headCells = getHeadCells()

	if (data.length === 0)
		return (
			<div className={classes.tableTrxRoot}>
				<Table>
					<TableHeaderTrx
						headCells={getHeadCells()}
						size={size}
						order={order}
						orderBy={orderBy}
						handleRequestSort={handleRequestSort}
						sortable={sortable}
					/>
				</Table>
				<p className={classes.textEmpty}>{textEmpty}</p>
			</div>
		)

	const getCell = (headCell, row, id) => {
		if (headCell.id === "address" || headCell.id === "hash") {
			return (
				<TableCell
					size={headCell.size}
					key={headCell.id + row.hash.value}
					className={`${headCell.cellClasses} ${headCell.onClick ? classes.headerClickable : ""} ${
						row.type === "Sell" ? classes.cellSell : classes.cellBuy
					}`}
					component={headCell.component}
					align={headCell.align}
					padding={headCell.padding}
					onClick={headCell.onClick ? () => headCell.onClick(row) : null}
				>
					<div className={classes.rowIcon}>
						<LaunchIcon className={classes.iconRow} />
						{headCell.transform ? headCell.transform(row[headCell.id]) : row[headCell.id]}
					</div>
				</TableCell>
			)
		}
		return (
			<TableCell
				size={headCell.size}
				key={headCell.id + row.hash.value}
				className={`${headCell.cellClasses} ${headCell.onClick ? classes.headerClickable : ""} ${
					row.type === "Sell" ? classes.cellSell : classes.cellBuy
				}`}
				component={headCell.component}
				align={headCell.align}
				padding={headCell.padding}
				onClick={headCell.onClick ? () => headCell.onClick(row) : null}
			>
				{headCell.transform ? headCell.transform(row[headCell.id]) : row[headCell.id]}
			</TableCell>
		)
	}

	return (
		<div className={classes.tableTrxRoot}>
			<Table>
				<TableHeaderTrx
					headCells={getHeadCells()}
					size={size}
					order={order}
					orderBy={orderBy}
					handleRequestSort={handleRequestSort}
					sortable={sortable}
				/>
				<TableBody>
					{sortData(data)
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						.map((row, index) => {
							let cells = []
							headCells.forEach((headCell, index) => {
								let cell = {}

								cell = getCell(headCell, row, index)
								cells.push(cell)
							})
							return (
								<TableRow
									hover
									tabIndex={-1}
									key={row.hash.value}
									onClick={(event) => {
										if (onClickToken) onClickToken(row, event)
									}}
									className={`${!!onClickToken ? classes.clickable : ""} ${
										row.type === "Sell" ? classes.rowSell : classes.rowBuy
									}`}
								>
									{cells}
								</TableRow>
							)
						})}
					{data.length > rowsPerPage && emptyRows > 0 && (
						<TableRow style={{ height: 53 * emptyRows }}>
							<TableCell colSpan={headCells.length} />
						</TableRow>
					)}
				</TableBody>
			</Table>
			{data.length > rowsPerPage && (
				<TablePagination
					rowsPerPageOptions={[5, 10, 25, 50]}
					component="div"
					count={data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					cbMax={cbMax}
				/>
			)}
		</div>
	)
}

export default TableTrx
