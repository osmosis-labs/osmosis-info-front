import { makeStyles, TableCell } from "@material-ui/core"
import { MIN_BLOCKED, MIN_CONGESTED } from "../../../contexts/IBCProvier"
const useStyles = makeStyles((theme) => {
	return {
		rootPendingTrx: {
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
		buble: {
			borderRadius: "50px",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			fontSize: "0.7rem",
		},
		bubleGreen: {
			color: "#52EB7D",
		},
		bubleOrange: {
			color: "#FF8200",
		},
		bubleRed: {
			color: "#EF3456",
		},
	}
})
const PendingTrx = ({ cellKey, cellConfig, data }) => {
	const classes = useStyles()

	let classOne = classes.buble
	if (data[0].duration_minutes < MIN_CONGESTED) {
		classOne += " " + classes.bubleGreen
	} else if (data[0].duration_minutes < MIN_BLOCKED) {
		classOne += " " + classes.bubleOrange
	} else {
		classOne += " " + classes.bubleRed
	}
	let classTwo = classes.buble
	if (data[1].duration_minutes < MIN_CONGESTED) {
		classTwo += " " + classes.bubleGreen
	} else if (data[1].duration_minutes < MIN_BLOCKED) {
		classTwo += " " + classes.bubleOrange
	} else {
		classTwo += " " + classes.bubleRed
	}
	return (
		<TableCell key={cellKey}>
			<div className={classes.rootPendingTrx}>
				<div className={classes.row}>
					<span className={`${classOne}`}>
						<span>{`${data[0].size_queue} Pending Tx`}</span>
					</span>
				</div>
				<div className={classes.row}>
					<span className={`${classTwo}`}>
						<span>{`${data[1].size_queue} Pending Tx`}</span>
					</span>
				</div>
			</div>
		</TableCell>
	)
}

export default PendingTrx
