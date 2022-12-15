import { makeStyles } from "@material-ui/core"
import { useEventTheme } from "../../contexts/event-theme.provider"
import moon from "./assets/moon.webp"
import bgTop from "./assets/bg-top.webp"
import bgBottom from "./assets/bg-bottom.webp"
import bgSnow from "./assets/bg-snow2.webp"
import { Tree } from "./tree"
import { isMobile } from "react-device-detect"
import { random } from "../../helpers/helpers"
import Trail from "./canvas/trail"
import React, { useEffect, useRef } from "react"
import Engine from "./canvas/engine"
import Light from "./canvas/light"
const colors = ["#f06292", "#ba68c8", "#4dd0e1", "#81c784", "#ffb74d", "#eeeeee"]
const maxTree = random(4, 10)
const maxLight = 15
export const ChristmasTheme = () => {
	const classes = useStyles()
	const { show } = useEventTheme()
	const refCanvas = useRef(null)
	const refEngine = useRef(null)
	const refLights = useRef([])
	const refTrail = useRef(null)
	const refIndexColors = useRef(0)
	const mousePos = useRef({ x: 0, y: 0 })

	const onClickBody = (e) => {
		let x = e.clientX
		let y = e.clientY
		refTrail.current.updateColor
		if (refLights.current.length > maxLight) {
			const removed = refLights.current.shift()
			removed.updateColor("#EEEEEEAA")
			refEngine.current.remove(removed)
		}
		const newLight = new Light({ x, y, color: colors[refIndexColors.current], size: 10, maxLighting: 20 })
		refLights.current.push(newLight)
		refEngine.current.add(newLight)
		refIndexColors.current++
		if (refIndexColors.current > colors.length - 1) refIndexColors.current = 0
		refTrail.current.updateColor(colors[refIndexColors.current])
	}

	const mouseMove = (event) => {
		mousePos.current = {
			x: event.clientX,
			y: event.clientY,
		}
	}

	useEffect(() => {
		if (refCanvas.current) {
			let canvas = refCanvas.current
			let ctx = refCanvas.current.getContext("2d")
			let engine = new Engine({ canvas, ctx, clear: "soft" })
			let body = document.querySelector("body")
			body.addEventListener("click", onClickBody)
			refTrail.current = new Trail({ x: 0, y: 0, size: 10, color: colors[refIndexColors.current], maxLighting: 20 })
			engine.add(refTrail.current)
			refEngine.current = engine

			let timer = window.setTimeout(() => {
				window.requestAnimationFrame(() => refEngine.current.update(mousePos))
			}, 1000)
			body.addEventListener("mousemove", mouseMove)

			return () => {
				window.clearTimeout(timer)
				body.removeEventListener("click", onClickBody)
				body.removeEventListener("mousemove", mouseMove)
			}
		}
	}, [refCanvas])

	return (
		<div className={show ? classes.containerTheme : classes.containerThemeHide}>
			<canvas ref={refCanvas} className={classes.canvas} />
			<div className="snow">
				<div className="snow__layer"></div>
				<div className="snow__layer"></div>
				<div className="snow__layer"></div>
			</div>
			<div className={classes.christmasContainer}>
				{[...Array(maxTree).keys()].map((key, index) => {
					return (
						<Tree
							key={key}
							x={`${random(10, 90)}%`}
							y={`${random(70, 75)}%`}
							size={random(8, 14) / 10}
							delay={index / 10}
						/>
					)
				})}
				<img src={moon} className={classes.moon} />
				<img src={bgSnow} className={classes.bgSnow} />
				<img src={bgBottom} className={classes.bgBottom} />
				<img src={bgTop} className={classes.bgTop} />
			</div>
		</div>
	)
}
const useStyles = makeStyles((theme) => {
	return {
		"@keyframes cloud": {
			"0%, 100%": {
				transform: `rotate(0-1deg)`,
				opacity: 0.8,
			},
			"50%": {
				transform: `rotate(1deg)`,
				opacity: 1,
			},
		},
		containerThemeHide: { display: "none" },
		containerTheme: {
			position: "fixed",
			pointerEvents: "none",
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			width: "100vw",
			height: "100vh",
			opacity: 1,
		},
		canvas: {
			position: "fixed",
			pointerEvents: "none",
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			width: "100vw",
			height: "100vh",
			zIndex: 999,
		},
		christmasContainer: {
			position: "absolute",
			top: 0,
			left: 0,
			zIndex: 0,
			right: 0,
			bottom: 0,
			overflow: "hidden",
			pointerEvents: "none",
		},
		moon: {
			zIndex: 0,
			position: "absolute",
			top: "20%",
			left: "2%",
		},
		bgTop: {
			position: "absolute",
			pointerEvents: "none",
			zIndex: 0,
			top: 0,
			animationDelay: "1s",
			zIndex: 1,
			left: "-2%",
			animation: "$cloud 5s linear infinite",
			[theme.breakpoints.down("xs")]: {},
		},
		bgBottom: {
			position: "absolute",
			pointerEvents: "none",
			bottom: 0,
			zIndex: 1,
			left: "-2%",
			animation: "$cloud 5s linear infinite",
			[theme.breakpoints.down("xs")]: {},
		},
		bgFar: {
			position: "absolute",
			pointerEvents: "none",
			zIndex: 0,
			width: "100%",
			maxWidth: "600px",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			[theme.breakpoints.down("xs")]: {},
		},
		bgSnow: {
			position: "absolute",
			pointerEvents: "none",
			zIndex: 0,
			bottom: 0,
			maxWidth: "100%",
			opacity: "0.3",
			left: "50%",
			transform: "translate(-50%, 0)",
			[theme.breakpoints.down("xs")]: {},
		},
	}
})
