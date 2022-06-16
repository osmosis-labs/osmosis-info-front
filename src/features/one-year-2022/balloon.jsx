import React, { useRef, useState } from "react"
import { makeStyles } from "@material-ui/core"

const Balloon = ({ onPopBalloon, color, pos, colorHandle, move = "one" }) => {
	const classes = useStyles({ color, pos, colorHandle })
	const [poped, setPoped] = useState(false)
	const refBalloon = useRef(null)
	const refHandle = useRef(null)

	const pop = (e) => {
		onPopBalloon(e)
		refHandle.current.classList.add(classes.popHandle)
		refBalloon.current.classList.add(classes.pop)
		window.setTimeout(() => {
			setPoped((p) => true)
		}, 300)
	}

	const cut = (e) => {
		refHandle.current.classList.add(classes.popHandle)
		refBalloon.current.classList.add(classes.cut)
		window.setTimeout(() => {
			setPoped((p) => true)
		}, 1000)
	}

	if (poped) {
		return null
	}

	let classesName = `${classes.rootBalloon}`
	if (move === "one") {
		classesName += ` ${classes.moveOne}`
	} else if (move === "two") {
		classesName += ` ${classes.moveTwo}`
	} else if (move === "three") {
		classesName += ` ${classes.moveThree}`
	}
	return (
		<div className={classesName}>
			<div className={classes.balloon} onClick={pop} ref={refBalloon} />
			<div className={classes.handle} ref={refHandle} onClick={cut}>
				<div className={classes.handleString} />
				<div className={classes.handleNode} />
				<div className={classes.handleNodeBalloon} />
			</div>
		</div>
	)
}

const useStyles = makeStyles((theme) => {
	return {
		rootBalloon: ({ color, pos, colorHandle }) => ({
			position: "fixed",
			zIndex: "999",
			...pos,
		}),
		balloon: ({ color, pos, colorHandle }) => {
			return {
				position: "relative",
				top: "50%",
				height: "100px",
				width: "80px",
				backgroundColor: color,
				zIndex: "999",
				borderRadius: "50% 50% 50% 50% / 45% 45% 55% 55%",
				cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>📌</text></svg>")
			14 0,
		auto;`,
				"&:before": {
					content: "''",
					position: "absolute",
					width: "20%",
					height: "30%",
					background: "rgba(255,255,255,0.25)",
					top: "8%",
					left: "16%",
					borderRadius: "50%",
					transform: "rotate(40deg)",
				},
			}
		},
		handle: ({ color, pos, colorHandle }) => {
			return {
				position: "relative",
				height: "100px",
				cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>✂️</text></svg>")
			14 0,
		auto;`,
			}
		},
		handleNode: ({ color, pos, colorHandle }) => {
			return {
				background: colorHandle,
				position: "absolute",
				left: "calc(50% - 5px)",
				width: "10px",
				height: "3px",
				borderRadius: "25% / 50%",
			}
		},
		handleNodeBalloon: ({ color, pos, colorHandle }) => {
			return {
				background: color,
				position: "absolute",
				top: "3px",
				left: "calc(50% - 5px)",
				height: "5px",
				width: "10px",
				borderRadius: "25% / 50%",
			}
		},
		handleString: ({ color, pos, colorHandle }) => {
			return {
				background: colorHandle,
				position: "absolute",
				left: "calc(50% - 1px)",
				height: "100px",
				width: "2px",
			}
		},

		popHandle: {
			animation: "$popHandle 1s",
		},
		pop: {
			animation: "$pop 0.3s",
		},
		cut: {
			animation: "$cut 1s ease-in-out",
		},
		moveOne: {
			animation: "$moveOne 10s infinite linear",
			position: "fixed",
			transformOrigin: "bottom center",
			transform: "rotate(0deg)",
		},
		moveTwo: {
			animation: "$moveTwo 8s infinite linear",
			position: "fixed",
			transformOrigin: "bottom center",
			transform: "rotate(0deg)",
		},
		moveThree: {
			animation: "$moveThree 12s infinite linear",
			position: "fixed",
			transformOrigin: "bottom center",
			transform: "rotate(0deg)",
		},
		"@keyframes moveOne": {
			"0%": { transform: "rotate(0deg)" },
			"25%": { transform: "rotate(5deg)" },
			"75%": { transform: "rotate(-5deg)" },
			"100%": { transform: "rotate(0deg)" },
		},
		"@keyframes moveTwo": {
			"0%": { transform: "rotate(0deg)" },
			"25%": { transform: "rotate(-2deg)" },
			"75%": { transform: "rotate(2deg)" },
			"100%": { transform: "rotate(0deg)" },
		},
		"@keyframes moveThree": {
			"0%": { transform: "rotate(0deg)" },
			"25%": { transform: "rotate(7deg)" },
			"75%": { transform: "rotate(-7deg)" },
			"100%": { transform: "rotate(0deg)" },
		},

		"@keyframes cut": {
			from: { transform: "translate(0, 0)" },
			"100%": { transform: "translate(0, -500%)", opacity: "0%" },
		},

		"@keyframes pop": {
			from: { transform: "scale(1)" },
			"100%": { transform: "scale(10)", opacity: "0%" },
		},
		"@keyframes popHandle": {
			from: { transform: "translate(0, 0)" },
			"30%, 100%": { transform: "translate(0, 100px)", opacity: "0%" },
		},
	}
})

export default Balloon
