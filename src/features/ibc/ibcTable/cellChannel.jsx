import { makeStyles, TableCell } from "@material-ui/core"
const useStyles = makeStyles((theme) => {
	return {
		rootCellChannel: {
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
	
	}
})
const CellChannel = ({ cellKey, cellConfig, data }) => {
	const classes = useStyles()
	return (
		<TableCell key={cellKey}>
			<div className={classes.rootCellChannel}>
				<div className={classes.row}>
					<p className={classes.channel}>{data[0].channel_id}</p>
				</div>
				<div className={classes.row}>
					<p className={classes.channel}>{data[1].channel_id}</p>
				</div>
			</div>
		</TableCell>
	)
}

export default CellChannel
