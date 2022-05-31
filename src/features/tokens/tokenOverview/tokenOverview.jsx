import { makeStyles } from "@material-ui/core"
import { forwardRef, useEffect, useRef, useState } from "react"
import Paper from "../../../components/paper/Paper"
import Bar from "./bar"

const useStyles = makeStyles((theme) => {
	return {
		rootTokenOverview: {
			display: "flex",
			alignItems: "center",
			overflow: "hidden",
		},
		bar: {
			animation: "$defil 120s linear infinite",
		},
		barOne: {},
		barTwo: {},

		"@keyframes defil": {
			"0%": {
				transform: "translate(0%, 0)",
			},
			"100%": {
				transform: "translate(-100%, 0)",
			},
		},
	}
})

const TokenOverview = () => {
	const classes = useStyles()
	const [stop, setStop] = useState(false)
	const refBar = useRef(null)
	const refBar2 = useRef(null)

	const onEnter = (e) => {
		setStop(true)
	}

	const onLeave = (e) => {
		setStop(false)
	}

	useEffect(() => {
		if (stop) {
			refBar.current.style.animationPlayState = "paused"
			refBar2.current.style.animationPlayState = "paused"
		} else {
			refBar.current.style.animationPlayState = "running"
			refBar2.current.style.animationPlayState = "running"
		}
	}, [stop, refBar, refBar2])


	return (
		<div className={classes.rootTokenOverview} onMouseLeave={onLeave} onMouseEnter={onEnter}>
			<Paper className={classes.rootTokenOverview}>
				<Bar ref={refBar} className={`${classes.bar} ${classes.barOne}`} stop={stop} />
				<Bar ref={refBar2} className={`${classes.bar} ${classes.barTwo}`} stop={stop} />
			</Paper>
		</div>
	)
}

export default TokenOverview
