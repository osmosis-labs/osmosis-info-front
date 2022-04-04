import { makeStyles, TableCell } from "@material-ui/core"
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"

const useStyles = makeStyles((theme) => {
	return {
		rootCellPoolChange: {},
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
				<>
					<ArrowDropUpIcon className={classes.cellUp} />
					{valueDisplay}
				</>
			</div>
		)
	} else if (currentData < 0) {
		let className = `${classes.cellUpDown} ${classes.cellDown}`
		body = (
			<div className={className}>
				<>
					<ArrowDropDownIcon className={classes.cellDown} />
					{valueDisplay}
				</>
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

/*
let value = row[headCell.id]
		let className = `${headCell.cellClasses}`
		let body = headCell.transform ? headCell.transform(value) : value
		if (value > 0) {
			className = `${headCell.cellClasses} ${classes.cellUpDown} ${classes.cellUp}`
			body = (
				<div className={className}>
					<>
						<ArrowDropUpIcon className={classes.cellUp} />
						{headCell.transform ? headCell.transform(value) : value}
					</>
				</div>
			)
		} else if (value < 0) {
			className = `${headCell.cellClasses} ${classes.cellUpDown} ${classes.cellDown}`
			body = (
				<div className={className}>
					<>
						<ArrowDropDownIcon className={classes.cellDown} />
						{headCell.transform ? headCell.transform(value) : value}
					</>
				</div>
			)
		}
		return (
			<TableCell
				key={headCell.id + row.id}
				className={headCell.cellClasses}
				component={headCell.component}
				align={headCell.align}
				padding={headCell.padding}
			>
				{body}
			</TableCell>
		)
		/*/
