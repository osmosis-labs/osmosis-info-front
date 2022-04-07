import { makeStyles, TableCell } from "@material-ui/core"
import { getPercent } from "../../../helpers/helpers"
import { useState } from "react"
const useStyles = makeStyles((theme) => {
	return {
		rootCellPoolNoAPR: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		rootCellPoolAPR: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
	}
})
const CellPoolAPR = ({ cellKey, cellConfig, data }) => {
	const classes = useStyles()
	const [open, setOpen] = useState(false)

	const onOpen = () => {
		setOpen(true)
	}

	const onClose = () => {
		setOpen(false)
	}

	const emptyBody = (
		<TableCell
			key={cellKey}
			onClick={() => {
				cellConfig.onClickCell(data)
			}}
		>
			<div className={classes.rootCellPoolNoAPR}>-</div>
		</TableCell>
	)

	if (!data.apr) return emptyBody
	let currentData = null
	if (cellConfig.cellKey === "internalReturn") {
		currentData = getPercent(data.apr.display.internal)
	} else if (data.apr.external) {
		currentData = getPercent(data.apr.display.external)
	}
	if (!currentData) return emptyBody

	return (
		<TableCell key={cellKey}>
			<div className={classes.rootCellPoolAPR}>
				{currentData}
			</div>
		</TableCell>
	)
}

export default CellPoolAPR
