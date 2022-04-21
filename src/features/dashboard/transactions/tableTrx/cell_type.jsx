import { makeStyles, TableCell } from "@material-ui/core"
const useStyles = makeStyles((theme) => {
	return {
		rootcellType: {
			display: "flex",
			alignItems: "center",
			pointerEvents: "none",
			width: "200px",
			overflow: "hidden",
			textOverflow: "ellipsis",
			cursor: "pointer",
		},

		type: {
			paddingLeft: "5px",
			pointerEvents: "none",
			backgroundColor: theme.palette.table.badgeBackground,
			color: theme.palette.table.badgeText,
			borderRadius: "16px",
			fontSize: "14px",
			padding: "1px 6px",
			marginLeft: "5px",
		},
	}
})
const cellType = ({ cellKey, cellConfig, data }) => {
	const classes = useStyles()

	const onClick = () => {
		cellConfig.onClickCell(data)
	}

	return (
		<TableCell key={cellKey} onClick={onClick}>
			<div className={classes.rootcellType} onClick={onClick}>
				<span className={classes.type} onClick={onClick}>
					{data.type}
				</span>
			</div>
		</TableCell>
	)
}

export default cellType
