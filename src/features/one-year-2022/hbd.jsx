import React, { useEffect, useRef, useState } from "react"
import { makeStyles } from "@material-ui/core"

const HBD = () => {
	const classes = useStyles()
	const [poped, setPoped] = useState(false)
	const ref = useRef(null)

	useEffect(() => {
		if (ref.current) {
			ref.current.classList.add(classes.pop)
			window.setTimeout(() => {
				setPoped((p) => true)
			}, 4000)
		}
	}, [ref])

	if (poped) {
		return null
	}
	return (
		<div className={classes.rootHBD} ref={ref}>
			<p className={classes.txt}>Happy birthday Osmosis!</p>
		</div>
	)
}

const useStyles = makeStyles((theme) => {
	return {
		rootHBD: () => ({
			top: "50%",
			left: "50%",
			position: "fixed",
			zIndex: "999",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			opacity: "0%",
			transform: "translate(-50%, -50%)",
			[theme.breakpoints.down("xs")]: {
				top: "60%",
			},
		}),

		txt: {
			color: "#a189bc",
			fontSize: "3rem",
			textAlign: "center",
			textStroke: "0.5px rgba(255,255,255,1)",
		},

		pop: {
			animation: "$pop 4s",
		},

		"@keyframes pop": {
			"0%": { opacity: "0%" },
			"20%": { opacity: "0%" },
			"60%": { opacity: "90%" },
			"80%": { opacity: "90%" },
			"100%": { opacity: "0%" },
		},
	}
})

export default HBD
