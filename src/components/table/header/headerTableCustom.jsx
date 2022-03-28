import React from "react"
import { makeStyles, TableHead, TableRow } from "@material-ui/core"
import HeaderCellCustom from "./headerCellCustom"

const useStyles = makeStyles((theme) => {
	return {
		tableHeader: {},
	}
})

const HeaderTableCustom = ({ cellsHeader = [], onSort, order, orderBy }) => {
	const classes = useStyles()
	return (
		<TableHead>
			<TableRow>
				{cellsHeader.map((cellHead) => {
					const { sortable, customClassHeader, label, cellKey, align } = cellHead
					return (
						<HeaderCellCustom
							sortable={sortable}
							order={order}
							orderBy={orderBy}
							customClass={customClassHeader}
							label={label}
							key={cellKey}
							align={align}
							onSort={onSort}
							cellKey={cellKey}
						/>
					)
				})}
			</TableRow>
		</TableHead>
	)
}

export default HeaderTableCustom
