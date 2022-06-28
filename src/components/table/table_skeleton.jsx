import { makeStyles, Table, TableCell, TableRow } from "@material-ui/core"
import { Skeleton } from "@mui/material"
import { random } from "../../helpers/helpers"
import CellCustom from "./body/cellCustom"
import RowTableCustom from "./body/rowTableCustom"
import FooterTableCustom from "./footer/footerTableCustom"
import HeaderTableCustom from "./header/headerTableCustom"

const TableSkeleton = ({ config, settings }) => {
	const classes = useStyles()
	const cellsToDisplay = settings.filter((setting) => setting.display)

	const cells = []
	const rows = []
	config.cellsConfig.forEach((config, index) => {
		cells.push(
			<td
				key={index + "-"}
				className={`${classes.skeleton} ${
					index === 0 ? classes.first : index === cellsToDisplay.length - 1 ? classes.last : ""
				}`}
			>
				<div
					style={{
						display: "flex",
						justifyContent: config.align === "left" ? "flex-start" : config.align === "right" ? "flex-end" : "center",
						width: "100%",
					}}
				>
					<Skeleton animation="wave" variant="rectangular" width={"80%"} height={25} />
				</div>
			</td>
		)
	})
	for (let i = 0; i < 5; i++) {
		rows.push(
			<tr key={"sk" + "-" + i} className={classes.row}>
				{cells}
			</tr>
		)
	}
	return (
		<div className={classes.rootTableSkeleton}>
			<table className={classes.tableRoot}>
				<HeaderTableCustom onSort={() => null} cellsHeader={config.cellsConfig} orderBy={null} order={null} />
				<tbody>{rows}</tbody>
			</table>

			{!config.hideFooter && (
				<FooterTableCustom
					rowsPerPageOptions={config.rowsPerPageOptions}
					count={0}
					rowsPerPage={-1}
					page={-1}
					onChangePage={() => null}
					onChangeRowsPerPage={() => null}
					callBackEndPage={() => null}
				/>
			)}
		</div>
	)
}

const useStyles = makeStyles((theme) => {
	return {
		rootTableSkeleton: {
			overflow: "auto",
			width: "100%",
			borderRadius: "4px",
		},
		tableRoot: { width: "100%" },
		cells: {
			display: "flex",
		},
		skeleton: {
			padding: "4px 8px",
			margin: "auto",
			textAlign: "center",
			borderBottom: `1px solid ${theme.palette.table.border}`,
		},
		first: {
			paddingLeft: "25px",
		},
		last: {
			paddingRight: "25px",
		},
		row: {
			borderBottom: `1px solid ${theme.palette.table.border}`,
			padding: "8px 12px",
			width: "100%",
			lineHeight: "23px",
		},
	}
})

export default TableSkeleton
