import React from "react"
import { makeStyles, TableRow } from "@material-ui/core"
import CellCustom from "./cellCustom"

const useStyles = makeStyles((theme) => {
	return {
		rowTableCustom: {
			"& td:first-child": {
				paddingLeft: "25px",
			},
			"& td:last-child": {
				paddingRight: "25px",
			},
			"& td": {
				color: theme.palette.table.cell,
				fontFamily: "'Inter' !important",
				fontSize: "12px",
				lineHeight: "19px",
			}
		},
	}
})

const RowTableCustom = (props) => {
	const classes = useStyles()
	const { data, config, indexRow } = props

	return (
		<TableRow classes={{ root: classes.rowTableCustom }}>
			{config.cellsConfig.map((cellConfig, index) => {
				if (cellConfig.cellBody) {
					return (
						<cellConfig.cellBody
							key={`${indexRow}-${index}-${cellConfig.cellKey}`}
							cellKey={`${indexRow}-${index}-${cellConfig.cellKey}`}
							cellConfig={cellConfig}
							data={data}
						/>
					)
				}
				return <CellCustom key={`${indexRow}-${index}-${cellConfig.cellKey}`} cellConfig={cellConfig} data={data} />
			})}
		</TableRow>
	)
}

export default RowTableCustom
