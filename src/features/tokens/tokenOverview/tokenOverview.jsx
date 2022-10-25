import { makeStyles } from "@material-ui/core"
import { forwardRef, useEffect, useRef, useState } from "react"
import Paper from "../../../components/paper/Paper"
import { useDebug } from "../../../contexts/debug.provider"
import { useGainers, useLosers } from "../../../hooks/data/metrics.hook"
import Bar from "./bar"

const useStyles = makeStyles((theme) => {
	return {
		rootTokenOverview: {
			display: "flex",
			alignItems: "center",
			overflow: "hidden",
			zIndex: 1,
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
	const { isLoading: isLoadingLosers } = useLosers()
	const { isLoading: isLoadingGainers } = useGainers()
	const refBar = useRef(null)
	const refBar2 = useRef(null)

	const { isLoadingDebug } = useDebug()

	const isLoading = isLoadingLosers || isLoadingGainers || isLoadingDebug

	const onEnter = (e) => {
		setStop((s) => true)
	}

	const onLeave = (e) => {
		setStop((s) => false)
	}

	useEffect(() => {
		if (refBar.current && refBar2.current && !isLoadingLosers && !isLoadingGainers) {
			window.setTimeout(() => {
				setStop((s) => true)
				setStop((s) => false)
			}, 333)
		}
	}, [refBar, refBar2, isLoadingLosers, isLoadingGainers])

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
				<Bar ref={refBar} className={`${classes.bar} ${classes.barOne}`} stop={stop} isLoading={isLoading} />
				<Bar ref={refBar2} className={`${classes.bar} ${classes.barTwo}`} stop={stop} isLoading={isLoading} />
			</Paper>
		</div>
	)
}

export default TokenOverview
