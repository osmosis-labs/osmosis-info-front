import React from "react"
import { makeStyles, TableCell } from "@material-ui/core"

const useStyles = makeStyles((theme) => {
	return {
		cellCustom: {},
		cellClickable: { cursor: "pointer" },
	}
})

const CellCustom = (props) => {
	const classes = useStyles()
	const { data, cellConfig } = props
	const { cellKey, align, customClassCell, onClickCell, transform } = cellConfig

	return (
		<TableCell
			key={cellKey}
			align={align}
			style={{maxWidth: "140px"}}
			className={
				onClickCell
					? `${classes.cellClickable} ${classes.cellCustom} ${customClassCell}`
					: `${classes.cellCustom} ${customClassCell}`
			}
			onClick={
				onClickCell
					? () => {
							onClickCell(data)
					  }
					: null
			}
		>
			{transform ? transform(data[cellKey]) : data[cellKey]}
		</TableCell>
	)
}

export default CellCustom
