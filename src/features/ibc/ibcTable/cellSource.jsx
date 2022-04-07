import { makeStyles, TableCell } from "@material-ui/core"
const useStyles = makeStyles((theme) => {
	return {
		rootCellSource: {
			display: "flex",
			justifyContent: "center",
			alignItems: "flex-start",
			flexDirection: "column",
		},
		row: {
			margin: "2px 0",
			display: "grid",
			gridTemplateColumns: "1fr",
			alignItems: "center",
			justifyContent: "flex-start",
		},
		source: {
			fontSize: "0.9rem",
			color: theme.palette.gray.dark,
			textOverflow: "ellipsis",
			overflow: "hidden",
			whiteSpace: "nowrap",
			maxWidth: "130px",
		},
	
	}
})
const CellSource = ({ cellKey, cellConfig, data }) => {
	const classes = useStyles()
	return (
		<TableCell key={cellKey}>
			<div className={classes.rootCellSource}>
				<div className={classes.row}>
					<p className={classes.source}>{data[0].source}</p>
				</div>
				<div className={classes.row}>
					<p className={classes.source}>{data[1].source}</p>
				</div>
			</div>
		</TableCell>
	)
}

export default CellSource
