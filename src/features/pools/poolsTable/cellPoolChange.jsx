import { makeStyles, TableCell } from "@material-ui/core"
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"

const useStyles = makeStyles((theme) => {
	return {
		rootCellPoolChange: {
			display: "flex",
			justifyContent: "flex-end",
			alignItems: "center",
			fontSize: "16px !important",
			[theme.breakpoints.down("xs")]: {
				fontSize: "12px  !important",
			},
		},
		cellUpDown: {
			display: "flex",
			justifyContent: "flex-end",
			alignItems: "center",
		},
		cellUp: { color: theme.palette.green.text },
		cellDown: { color: theme.palette.error.main },
	}
})
const CellPoolChange = ({ cellKey, cellConfig, data }) => {
	const classes = useStyles()
	let currentData = data[cellConfig.cellKey]
	let valueDisplay = cellConfig.transform ? cellConfig.transform(currentData) : currentData
	let body = currentData
	if (currentData > 0) {
		let className = `${classes.cellUpDown} ${classes.cellUp}`
		body = (
			<div className={className}>
				↑{valueDisplay}
			</div>
		)
	} else if (currentData < 0) {
		let className = `${classes.cellUpDown} ${classes.cellDown}`
		body = (
			<div className={className}>
				↓{valueDisplay}
			</div>
		)
	}
	return (
		<TableCell
			key={cellKey}
			onClick={() => {
				cellConfig.onClickCell(data)
			}}
		>
			<div className={classes.rootCellPoolChange}>{body}</div>
		</TableCell>
	)
}

export default CellPoolChange
