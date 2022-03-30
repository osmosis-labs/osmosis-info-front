import React from "react"
import { makeStyles, TableHead, TableRow } from "@material-ui/core"
import HeaderCellCustom from "./headerCellCustom"

const useStyles = makeStyles((theme) => {
	return {
		tableHeader: {
			backgroundColor: theme.palette.primary.light,
			"& th:first-child": {
				borderRadius: "20px 0 0 0",
				paddingLeft: "25px",
			},
			"& th:last-child": {
				borderRadius: "0 20px 0 0",
				paddingRight: "25px",
			},
			"& th": {
				color: theme.palette.table.cellDark,
				fontSize: "15px",
				lineHeight: "23px",
				borderBottom: `1px solid ${theme.palette.table.border}`,
			}
		},
	}
})

const HeaderTableCustom = ({ cellsHeader = [], onSort, order, orderBy }) => {
	const classes = useStyles()
	return (
		<TableHead classes={{ root: classes.tableHeader }}>
			<TableRow>
				{cellsHeader.map((cellHead, index) => {
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
