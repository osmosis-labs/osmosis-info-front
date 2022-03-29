import React from "react"
import { makeStyles, TableCell } from "@material-ui/core"

const useStyles = makeStyles((theme) => {
	return {
		cellCustom: {},
		cellClickable: { cursor: "pointer" },
		cellSell: {
			color: `${theme.palette.error.main} !important`,
		},
		cellBuy: {
			color: `${theme.palette.green.text} !important`,
		},
	}
})

const Cell = (props) => {
	const classes = useStyles()
	const { cellConfig, data } = props
	const id = props.cellKey
	const { cellKey, align, customClassCell, onClickCell, transform } = cellConfig
	let classesName = onClickCell
		? `${classes.cellClickable} ${classes.cellCustom} ${customClassCell}`
		: `${classes.cellCustom} ${customClassCell}`
	if (data.type === "Sell") {
		classesName += ` ${classes.cellSell}`
	} else {
		classesName += ` ${classes.cellBuy}`
	}
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

export default Cell
