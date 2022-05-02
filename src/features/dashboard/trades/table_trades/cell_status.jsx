import { makeStyles, TableCell } from "@material-ui/core"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
const useStyles = makeStyles((theme) => {
	return {
		rootCellStatus: {
			textAlign: "center",
			width: "60px",
			overflow: "hidden",
			textOverflow: "ellipsis",
			cursor: "pointer",
		},
		icon: {
			margin: "auto",
		},
		success: {
			color: theme.palette.green.text,
		},
		failed: {
			color: theme.palette.error.main,
		},
	}
})
const CellStatus = ({ cellKey, cellConfig, data }) => {
	const classes = useStyles()
	const onClick = () => {
		cellConfig.onClickCell(data)
	}

	return (
		<TableCell key={cellKey} style={{ maxWidth: "140px" }} onClick={onClick} className={classes.rootCellStatus}>
			<div className={classes.rootCellStatus}>
				{data.status === "success" ? (
					<CheckIcon className={`${classes.icon} ${classes.success}`} />
				) : (
					<CloseIcon className={`${classes.icon} ${classes.failed}`} />
				)}
			</div>
		</TableCell>
	)
}

export default CellStatus
