import React from "react"
import { makeStyles } from "@material-ui/core"
import Paper from "../../components/paper/Paper"
import greenArrow from "./greenDownArrow.svg"
import orangeArrow from "./orangeDownArrow.svg"
import redArrow from "./redDownArrow.svg"
import Network from "./Network"
import { MIN_BLOCKED, MIN_CONGESTED } from "../../contexts/IBCProvier"
const useStyles = makeStyles((theme) => {
	return {
		IBCItem: {
			display: "flex",
			flexDirection: "row",
			justifySelf: "center",
			justifyContent: "center",
			alignItems: "center",
		},
		arrowUp: {
			transform: "rotate(180deg)",
		},
		networks: {
			display: "flex",
			flexDirection: "column",
			height: "100%",
			justifyContent: "space-between",
		},
		arrow: {
			height: "260px",
			margin: "0px 8px",
		},
		network: {
			marginBottom: "60px",
		},
	}
})

const IBCItem = ({ item }) => {
	const classes = useStyles()
	let arrowFirstSrc = greenArrow
	let arrowSecondSrc = greenArrow
	if (item.length > 1) {
		if (item[0].duration_minutes < MIN_CONGESTED) {
			arrowFirstSrc = greenArrow
		} else if (item[0].duration_minutes < MIN_BLOCKED) {
			arrowFirstSrc = orangeArrow
		} else {
			arrowFirstSrc = redArrow
		}
		if (item[1].duration_minutes < MIN_CONGESTED) {
			arrowSecondSrc = greenArrow
		} else if (item[1].duration_minutes < MIN_BLOCKED) {
			arrowSecondSrc = orangeArrow
		} else {
			arrowSecondSrc = redArrow
		}
	}
	return (
		<Paper className={classes.IBCItem}>
			<img src={arrowFirstSrc} alt="blocked" className={`${classes.arrow} ${classes.arrowUp}`} />
			<div className={classes.networks}>
				<Network network={item[0]} className={classes.network} />
				<Network network={item[1]} />
			</div>
			<img src={arrowSecondSrc} alt="blocked" className={`${classes.arrow}`} />
		</Paper>
	)
}

export default IBCItem
