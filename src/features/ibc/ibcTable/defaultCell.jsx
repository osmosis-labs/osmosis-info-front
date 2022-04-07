import { makeStyles, TableCell } from "@material-ui/core"
const useStyles = makeStyles((theme) => {
	return {
		rootDefaultCell: {
			textAlign: "right",
		},
		
	}
})
const DefaultCell = ({ cellKey, cellConfig, data }) => {
	const classes = useStyles()
	return (
		<TableCell key={cellKey}>
			<div className={classes.rootDefaultCell}>
				-
			</div>
		</TableCell>
	)
}

export default DefaultCell
