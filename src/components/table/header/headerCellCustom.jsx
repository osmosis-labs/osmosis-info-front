import React from "react"
import { makeStyles, TableCell, TableSortLabel } from "@material-ui/core"

const useStyles = makeStyles((theme) => {
	return {
		headerCellCustom: {},
	}
})

const HeaderCellCustom = (props) => {
	const classes = useStyles()
	const { sortable, order, orderBy, customClass, label, onSort, align, cellKey, first, last } = props
	let className = `${classes.headerCellCustom} ${customClass}`
	if (sortable) {
		return (
			<TableCell key={cellKey} align={align} sortDirection={orderBy === cellKey ? order : false} className={className}>
				<TableSortLabel
					active={orderBy === cellKey}
					direction={orderBy === cellKey ? order : "asc"}
					onClick={() => {
						onSort(props)
					}}
				>
					{label}
				</TableSortLabel>
			</TableCell>
		)
	} else {
		return (
			<TableCell key={cellKey} align={align} className={`${classes.headerCellCustom} ${customClass}`}>
				{label}
			</TableCell>
		)
	}
}

export default HeaderCellCustom
