import React, { useEffect, useRef, useState } from "react"
import { makeStyles } from "@material-ui/core"
import bPNG from "./b.png"
import iPNG from "./i.png"
import rPNG from "./r.png"
import tPNG from "./t.png"
import hPNG from "./h.png"
import dPNG from "./d.png"
import aPNG from "./a.png"
import yPNG from "./y.png"

const BalloonBirthday = ({ onPop, letter }) => {
	const classes = useStyles()
	const [poped, setPoped] = useState(false)
	const refBalloon = useRef(null)

	const pop = (e) => {
		onPop(e)
		refBalloon.current.classList.add(classes.pop)
		window.setTimeout(() => {
			setPoped((p) => true)
		}, 300)
	}

	useEffect(() => {
		if (refBalloon.current) {
			refBalloon.current.classList.add(classes.pop)
			let time = 0
			if (letter === "i") {
				time = 7
			} else if (letter === "r") {
				time = 8
			} else if (letter === "t") {
				time = 5
			} else if (letter === "h") {
				time = 7
			} else if (letter === "d") {
				time = 9
			} else if (letter === "a") {
				time = 6
			} else if (letter === "y") {
				time = 5
			} else if (letter === "b") {
				time = 6
			}
			window.setTimeout(() => {
				setPoped((p) => true)
			}, time * 1000 - 100)
		}
	}, [refBalloon])

	if (poped) {
		return null
	}

	let classesName = `${classes.rootBalloon}`
	let src = ""
	if (letter === "i") {
		src = iPNG
		classesName += ` ${classes.i}`
	} else if (letter === "r") {
		src = rPNG
		classesName += ` ${classes.r}`
	} else if (letter === "t") {
		src = tPNG
		classesName += ` ${classes.t}`
	} else if (letter === "h") {
		src = hPNG
		classesName += ` ${classes.h}`
	} else if (letter === "d") {
		src = dPNG
		classesName += ` ${classes.d}`
	} else if (letter === "a") {
		src = aPNG
		classesName += ` ${classes.a}`
	} else if (letter === "y") {
		src = yPNG
		classesName += ` ${classes.y}`
	} else if (letter === "b") {
		src = bPNG
		classesName += ` ${classes.b}`
	}

	return (
		<div className={classesName} onClick={pop} ref={refBalloon}>
			<img src={src} className={classes.img} />
		</div>
	)
}

const useStyles = makeStyles((theme) => {
	return {
		rootBalloon: {
			position: "fixed",
			zIndex: "1001",
		},
		img: {
			height: "60px",
			cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>📌</text></svg>")
			14 0,
		auto !important;`,
			transform: "translate(-50%, -50%)",
			opacity: "0",
			animation: "$appear 9s",
			[theme.breakpoints.down("xs")]: {
				height: "30px",
			},
		},

		pop: {
			animation: "$pop 0.3s",
		},

		b: {
			top: "calc(50% - 180px)",
			left: "calc(50% - 280px)",
			animation: "$moveOne 6s ease-in-out 1.5s ",
			[theme.breakpoints.down("xs")]: {
				top: "calc(50% - 150px)",
				left: "calc(50% - 105px)",
			},
		},
		i: {
			top: "calc(50% - 220px)",
			left: "calc(50% - 200px)",
			animation: "$moveOne 7s ease-in-out 1.5s ",
			[theme.breakpoints.down("xs")]: {
				top: "calc(50% - 160px)",
				left: "calc(50% - 75px)",
			},
		},
		r: {
			top: "calc(50% - 240px)",
			left: "calc(50% - 120px)",
			animation: "$moveOne 8s ease-in-out 1.5s ",
			[theme.breakpoints.down("xs")]: {
				top: "calc(50% - 170px)",
				left: "calc(50% - 45px)",
			},
		},
		t: {
			top: "calc(50% - 260px)",
			left: "calc(50% - 40px)",
			animation: "$moveOne 5s ease-in-out 1.5s ",
			[theme.breakpoints.down("xs")]: {
				top: "calc(50% - 180px)",
				left: "calc(50% - 15px)",
			},
		},
		h: {
			top: "calc(50% - 260px)",
			left: "calc(50% + 40px)",
			animation: "$moveOne 7s ease-in-out 1.5s ",
			[theme.breakpoints.down("xs")]: {
				top: "calc(50% - 180px)",
				left: "calc(50% + 15px)",
			},
		},
		d: {
			top: "calc(50% - 240px)",
			left: "calc(50% + 120px)",
			animation: "$moveOne 9s ease-in-out 1.5s ",
			[theme.breakpoints.down("xs")]: {
				top: "calc(50% - 170px)",
				left: "calc(50% + 45px)",
			},
		},
		a: {
			top: "calc(50% - 220px)",
			left: "calc(50% + 200px)",
			animation: "$moveOne 6s ease-in-out 1.5s ",
			[theme.breakpoints.down("xs")]: {
				top: "calc(50% - 160px)",
				left: "calc(50% + 75px)",
			},
		},
		y: {
			top: "calc(50% - 180px)",
			left: "calc(50% + 280px)",
			animation: "$moveOne 5s ease-in-out 1.5s ",
			[theme.breakpoints.down("xs")]: {
				top: "calc(50% - 150px)",
				left: "calc(50% + 105px)",
			},
		},

		"@keyframes moveOne": {
			"0%": { transform: "translate(-20%, 0%) " },
			"25%": { transform: "translate(-100%, 0%) " },
			"75%": { transform: "translate(-200%,0%) " },
			"100%": { transform: "translate(-300%,0%) ", top: "-100px" },
		},

		"@keyframes pop": {
			from: { transform: "scale(1)" },
			"100%": { transform: "scale(10)", opacity: "0%" },
		},

		"@keyframes appear": {
			"0%": { opacity: "0%" },
			"19%": { opacity: "0%" },
			"20%": { opacity: "90%" },
			"60%": { opacity: "90%" },
			"90%": { opacity: "90%" },
			"100%": { opacity: "0%" },
		},
	}
})

export default BalloonBirthday
