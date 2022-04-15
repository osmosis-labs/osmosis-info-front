import { makeStyles, TableCell } from "@material-ui/core"
import { getPercent } from "../../../helpers/helpers"
import CalculateIcon from "@mui/icons-material/Calculate"
import { useState } from "react"
import DialogAPR from "./dialogAPR/dialogAPR"
import aprIMG from "./apr_logo.png"
const useStyles = makeStyles((theme) => {
	return {
		rootCellPoolNoAPR: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			[theme.breakpoints.down("xs")]: {
				fontSize: "12px  !important",
			},
		},
		rootCellPoolAPR: {
			display: "grid",
			justifyContent: "center",
			alignItems: "center",
			cursor: "pointer",
			gridTemplateColumns: "1fr 40px ",
			[theme.breakpoints.down("xs")]: {
				fontSize: "12px  !important",
			},
		},
		imageIcon: {
			height: "30px",
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
		<TableCell key={cellKey}>
			<div className={classes.rootCellPoolNoAPR}>-</div>
		</TableCell>
	)

	if (!data.apr) return emptyBody
	return (
		<TableCell key={cellKey}>
			<DialogAPR open={open} onClose={onClose} data={data} />
			<div className={classes.rootCellPoolAPR}>
				{getPercent(data.apr.display.total)}
				<img src={aprIMG} alt="calculator icon" className={classes.imageIcon} onClick={onOpen} />
			</div>
		</TableCell>
	)
}

export default CellPoolAPRTotal
