import React from "react"
import { makeStyles, TableCell } from "@material-ui/core"

const useStyles = makeStyles((theme) => {
	return {
		cellCustom: {
			textAlign: "left",
			minWidth: "160px",
			overflow: "hidden",
			textOverflow: "ellipsis",
		},
		cellClickable: { cursor: "pointer" },
		cellSell: {
			color: `${theme.palette.error.main} !important`,
		},
		cellBuy: {
			color: `${theme.palette.green.text} !important`,
		},
	}
})

const CellTime = (props) => {
	const classes = useStyles()
	const { cellConfig, data } = props
	const id = props.cellKey
	const { cellKey, align, customClassCell, onClickCell, transform } = cellConfig
	let classesName = onClickCell
		? `${classes.cellClickable} ${classes.cellCustom} ${customClassCell}`
		: `${classes.cellCustom} ${customClassCell}`
	
	return (
		<TableCell
			key={id}
			align={align}
			className={classesName}
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

export default CellTime
