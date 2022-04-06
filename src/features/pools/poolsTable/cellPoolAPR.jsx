import { makeStyles, TableCell } from "@material-ui/core"
import { getPercent } from "../../../helpers/helpers"
import CalculateIcon from '@mui/icons-material/Calculate';
import { useState } from "react"
import DialogAPR from "./dialogAPR/dialogAPR"
const useStyles = makeStyles((theme) => {
	return {
		rootCellPoolNoAPR: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		rootCellPoolAPR: {
			display: "grid",
			justifyContent: "center",
			alignItems: "center",
			cursor: "pointer",
            gridTemplateColumns: "2fr 1fr",
		},
		icon: {
            paddingLeft: "4px",
        },
	}
})
const CellPoolAPR = ({ cellKey, cellConfig, data }) => {
	const classes = useStyles()
	const [open, setOpen] = useState(false)
	let isInternal = cellConfig.cellKey === "internalReturn"

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
	if (!data.apr || (!isInternal && !data.apr.external)) return emptyBody

	let aprToDisplay = ""
	if (isInternal) {
		aprToDisplay = getPercent(data.apr.internal.apr14d * 100)
	} else {
		aprToDisplay = getPercent(data.apr.external.apr14d * 100)
	}

	return (
		<TableCell key={cellKey} >
			<DialogAPR open={open} onClose={onClose} data={data} />
			<div className={classes.rootCellPoolAPR}>
				{aprToDisplay}
				<CalculateIcon className={classes.icon} onClick={onOpen}/>
			</div>
		</TableCell>
	)
}

export default CellPoolAPR
