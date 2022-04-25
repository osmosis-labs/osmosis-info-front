import { makeStyles} from "@material-ui/core"

import React from "react"
import Paper from "../../../../components/paper/Paper"
import TableCustom from "../../../../components/table/tableCustom"
import CellFees from "./cell_fees"
import CellStatus from "./cell_status"
import cellType from "./cell_type"

const useStyles = makeStyles((theme) => {
	return {
		rootTableTrx: {
            overflow:"hidden",
            overflowX: "auto",

        },
		TableTrx: {},
		headerValue: {
			minWidth: "115px",
		},
		onClickCell: {
			width: "140px",
			overflow: "hidden",
			textOverflow: "ellipsis",
			color: `${theme.palette.table.link} !important`,
		},
		cellTime: {
			width: "140px",
			overflow: "hidden",
			textOverflow: "ellipsis",
		},
	}
})

const TableTrx = ({ data, className, onClickRow, cbEndPage }) => {
	const classes = useStyles()

	const transformDisplay = (data) => data.display

	const onSortTime = (a, b, orderBy) => {
		let res = 0
		if (b[orderBy].value < a[orderBy].value) {
			res = 1
		}
		if (b[orderBy].value > a[orderBy].value) {
			res = -1
		}
		return res
	}

    const onSortFees = (a, b, orderBy, order) => {
        let res = 0
		if (a.fees && b.fees ) {

			if (parseFloat(b.fees) < parseFloat(a.fees)) {
				res = -1
			}
			if (parseFloat(b.fees) > parseFloat(a.fees)) {
				res = 1
			}
		} else if (a.fees && !b.fees) {
			res = order === "asc" ? -1 : 1
		} else if (!a.fees && b.fees) {
			res = order === "asc" ? 1 : -1
		} else {
			res = 0
		}
		return res
    }

	const TableTrxConfig = {
		defaultSort: "time",
		defaultOrderBy: "desc",
		textEmpty: "No transactions found",
		rowsPerPage: 10,
		rowsPerPageOptions: [5, 10, 20, 50, 100],
		callBackEndPage: cbEndPage,
		cellsConfig: [
            {
				label: "Status",
				cellKey: "status",
				sortable: false,
				customClassHeader: null,
				customClassCell: null,
				onSort: null,
				align: "center",
				onClickCell: onClickRow,
				transform: null,
				cellBody: CellStatus,
			},
			
			{
				label: "Time",
				cellKey: "time",
				sortable: true,
				customClassHeader: null,
				customClassCell: classes.cellTime,
				onSort: onSortTime,
				align: "left",
				onClickCell: onClickRow,
				transform: transformDisplay,
				cellBody: null,
			},
            {
				label: "Type",
				cellKey: "type",
				sortable: true,
				customClassHeader: null,
				customClassCell: null,
				onSort: null,
				align: "left",
				onClickCell: onClickRow,
				transform: null,
				cellBody: cellType,
			},
            {
				label: "Hash",
				cellKey: "hash",
				sortable: false,
				customClassHeader: null,
				customClassCell: null,
				onSort: null,
				align: "left",
				onClickCell: onClickRow,
				transform: transformDisplay,
				cellBody: null,
			},
            {
				label: "Fees",
				cellKey: "fees",
				sortable: true,
				customClassHeader: null,
				customClassCell: null,
				onSort: onSortFees,
				align: "right",
				onClickCell: onClickRow,
				transform: null,
				cellBody: CellFees,
			},
            {
				label: "Height",
				cellKey: "height",
				sortable: true,
				customClassHeader: null,
				customClassCell: null,
				onSort: null,
				align: "left",
				onClickCell: onClickRow,
				transform: null,
				cellBody: null,
			},
		],
	}

	return (
		<Paper className={`${classes.rootTableTrx} ${className}`}>
			<TableCustom config={TableTrxConfig} data={data} customClass={classes.TableTrx} />
		</Paper>
	)
}

export default TableTrx
