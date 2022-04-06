import { makeStyles, TableCell } from "@material-ui/core"
import { getPercent } from "../../../helpers/helpers"
import CalculateIcon from "@mui/icons-material/Calculate"
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
			gridTemplateColumns: "1fr 1fr",
		},
		icon: {
			fontSize: "1.5rem !important",
		},
	}
})
const CellPoolAPRTotal = ({ cellKey, cellConfig, data }) => {
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
	return (
		<TableCell key={cellKey}>
			<DialogAPR open={open} onClose={onClose} data={data} />
			<div className={classes.rootCellPoolAPR}>
				{getPercent(data.apr.display.total)}
				<CalculateIcon className={classes.icon} onClick={onOpen} />
			</div>
		</TableCell>
	)
}

export default CellPoolAPRTotal
