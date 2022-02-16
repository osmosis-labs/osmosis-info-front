import { makeStyles, Table, TableBody, TableCell, TableRow, Tooltip } from "@material-ui/core"
import { useState } from "react"
import Image from "../../components/image/Image"
import TablePagination from "../../components/tablePagination/TablePagination"
import TableSettings from "../../components/tableSettings/TableSettings"
import { useSettings } from "../../contexts/SettingsProvider"
import { formateNumberPrice, formaterNumber } from "../../helpers/helpers"
import PoolsHeaderTable from "./PoolsHeaderTable"

const useStyles = makeStyles((theme) => {
	return {
		poolsTableRoot: {
			overflowX: "auto",
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
				width: "20px",
				top: "0%",
			},
		},
		images: {
			padding: theme.spacing(1),
			position: "relative",
		},
		cellName: {
			display: "grid",
			gridTemplateColumns: "60px 200px",
			textOverflow: "ellipsis",
			overflow: "hidden",
			whiteSpace: "nowrap",

			alignItems: "center",
			height: "53px",
			[theme.breakpoints.down("xs")]: {
				gridTemplateColumns: "60px 100px",
			},
		},
		name: {
			textOverflow: "ellipsis",
			overflow: "hidden",
			whiteSpace: "nowrap",
		},
		cells: {
			fontSize: theme.fontSize.medium,
			borderColor: theme.palette.primary.main,
			[theme.breakpoints.down("xs")]: {
				fontSize: theme.fontSize.small,
			},
		},
		hCellsLg: {
			fontSize: theme.fontSize.medium,
			borderColor: theme.palette.primary.main,
			color: theme.palette.gray.dark,
			[theme.breakpoints.down("xs")]: {
				fontSize: theme.fontSize.small,
			},
		},
		hCellsSmall: {
			fontSize: theme.fontSize.medium,
			width: " 20px",
			borderColor: theme.palette.primary.main,
			color: theme.palette.gray.dark,
			[theme.breakpoints.down("xs")]: {
				fontSize: theme.fontSize.small,
			},
		},

		hCells: {
			fontSize: theme.fontSize.verySmall,
		},
		hCellsExtraSmall: {
			fontSize: theme.fontSize.verySmall,
			padding: "0 8px 0 0",
			borderColor: theme.palette.primary.main,
		},
		cellsExtraSmall: {
			fontSize: theme.fontSize.verySmall,
			padding: "3px",
			borderColor: theme.palette.primary.main,
		},
		hCellsExtraSmallName: {
			fontSize: theme.fontSize.verySmall,
			padding: "0 8px 0 10px",
			borderColor: theme.palette.primary.main,
		},
		rows: {},
	}
})

// Component used for display pools table
const PoolsTable = ({ data, textEmpty, size = "ld", sortable = true, onClickPool }) => {
	const classes = useStyles()
	const [order, setOrder] = useState("asc")
	const [orderBy, setOrderBy] = useState("liquidity")
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const { settings, updateSettings } = useSettings()

	const setSettings = (settings) => {
		updateSettings({ poolTable: settings })
	}

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
		if (parseInt(b[orderBy]) < parseInt(a[orderBy])) {
			res = 1
		}
		if (parseInt(b[orderBy]) > parseInt(a[orderBy])) {
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

	const descendingComparator = (a, b, orderBy) => {
		if (orderBy === "name") return orderString(a, b, orderBy)
		return orderNumber(a, b, orderBy)
	}

	const getComparator = () => {
		return order === "desc"
			? (a, b) => descendingComparator(a, b, orderBy)
			: (a, b) => -descendingComparator(a, b, orderBy)
	}

	const getHeadCells = () => {
		let head = [
			{
				id: "id",
				cellClasses: size === "xs" ? classes.cellsExtraSmall : classes.cells,
				classes: size === "xs" ? classes.hCellsExtraSmall : classes.hCellsSmall,
				sortable: sortable,
				disablePadding: false,
				label: "#",
				align: "right",
			},
			{
				id: "name",
				cellClasses: size === "xs" ? classes.cellsExtraSmall : classes.cells,
				classes: size === "xs" ? classes.hCellsExtraSmallName : classes.hCellsLg,
				sortable: sortable,
				disablePadding: false,
				label: "Pools",
				component: "th",
				align: "left",
				padding: "none",
			},
			{
				id: "liquidity",
				cellClasses: size === "xs" ? classes.cellsExtraSmall : classes.cells,
				classes: size === "xs" ? classes.hCellsExtraSmall : classes.hCellsLg,
				sortable: sortable,
				transform: formateNumberPrice,
				disablePadding: false,
				label: "Liquidity",
				align: "right",
			},
			{
				id: "volume_7d",
				cellClasses: size === "xs" ? classes.cellsExtraSmall : classes.cells,
				classes: size === "xs" ? classes.hCellsExtraSmall : classes.hCellsLg,
				sortable: sortable,
				transform: formateNumberPrice,
				disablePadding: false,
				label: "Volume (7d)",
				align: "right",
			},
			{
				id: "volume_24h",
				cellClasses: size === "xs" ? classes.cellsExtraSmall : classes.cells,
				classes: size === "xs" ? classes.hCellsExtraSmall : classes.hCellsLg,
				sortable: sortable,
				transform: formateNumberPrice,
				disablePadding: false,
				label: "Volume (24h)",
				align: "right",
			},
		]
		if (size === "xs") {
			head[2].transform = (price) => {
				return `$${formaterNumber(price)}`
			}
		}

		let headToDisplay = []

		if (settings.poolTable.id) {
			headToDisplay.push(head[0])
		}
		if (settings.poolTable.name) {
			headToDisplay.push(head[1])
		}
		if (settings.poolTable.liquidity) {
			headToDisplay.push(head[2])
		}
		if (settings.poolTable.volume7d) {
			headToDisplay.push(head[3])
		}
		if (settings.poolTable.volume24h) {
			headToDisplay.push(head[4])
		}
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
			<div className={classes.poolsTableRoot}>
				<Table>
					<PoolsHeaderTable
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

	return (
		<div>
			<TableSettings settings={settings.poolTable} setSettings={setSettings} 
				match={{ id: "Id", name: "Name", liquidity: "Liquidity", volume7d: "Volume (7d)", volume24h: "Volume (24h)" }}
			
			/>
			<div className={classes.poolsTableRoot}>
				<Table>
					<PoolsHeaderTable
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
									if (headCell.id === "name") {
										cell = (
											<TableCell
												key={headCell.id + row.id}
												className={headCell.cellClasses}
												component={headCell.component}
												align={headCell.align}
												padding={headCell.padding}
											>
												<Tooltip title={row.name}>
													<div className={classes.cellName}>
														<div className={classes.images}>
															{row.name
																.split("-")
																.slice(0, 2)
																.map((name, index) => {
																	return (
																		<Image
																			style={{ left: index * 18 + "px" }}
																			key={headCell.id + row.id + name}
																			className={classes.image}
																			assets={true}
																			alt={`${name}`}
																			src={`https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/${name.toLowerCase()}.png`}
																			srcFallback="../assets/default.png"
																			pathAssets=""
																		/>
																	)
																})}
														</div>
														<p className={classes.name}>{row.name}</p>
													</div>
												</Tooltip>
											</TableCell>
										)
									} else {
										cell = (
											<TableCell
												size={headCell.size}
												key={headCell.id + row.id}
												className={headCell.cellClasses}
												component={headCell.component}
												align={headCell.align}
												padding={headCell.padding}
											>
												{headCell.transform ? headCell.transform(row[headCell.id]) : row[headCell.id]}
											</TableCell>
										)
									}
									cells.push(cell)
								})
								return (
									<TableRow
										hover
										tabIndex={-1}
										key={row.id}
										onClick={(event) => {
											if (onClickPool) onClickPool(row, event)
										}}
										className={!!onClickPool ? `${classes.clickable}` : ""}
									>
										{cells}
									</TableRow>
								)
							})}
						{data.length > rowsPerPage && emptyRows > 0 && (
							<TableRow style={{ height: 53 * emptyRows }}>
								<TableCell colSpan={6} />
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
					/>
				)}
			</div>
		</div>
	)
}

export default PoolsTable
