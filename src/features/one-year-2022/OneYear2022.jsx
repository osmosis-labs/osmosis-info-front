import { useEffect, useRef, useState } from "react"
import Balloon from "./balloon"
import ConfettiBag from "./confettiBag"
import Engine from "./engine"
import HBD from "./hbd"
import OneYear from "./oneYear"
import coneIMG from "./cone.png"
import { makeStyles } from "@material-ui/core"
import Gift from "./gift"
import useSize from "../../hooks/sizeHook"
import Birthday from "./birthday/birthday"

const styleCanvas = {
	position: "fixed",
	height: "100vh",
	width: "100vw",
	pointerEvents: "none",
	zIndex: 999,
}
const OneYear2022 = () => {
	const classes = useStyles()
	const size = useSize()
	const isXS = size === "xs"

	const refCanvas = useRef(null)
	const refEngine = useRef(null)
	const [poped, setPoped] = useState(false)
	const refConeOne = useRef(null)
	const refConeTwo = useRef(null)
	const rng = (min, max) => Math.random() * (max - min) + min

	useEffect(() => {
		if (refConeOne.current) {
			refConeTwo.current.classList.add(classes.pop)
			refConeOne.current.classList.add(classes.pop)
			window.setTimeout(() => {
				setPoped((p) => true)
			}, 4000)
		}
	}, [refConeOne, refConeTwo])

	const onClickBody = (e) => {
		let x = e.clientX
		let y = e.clientY
		refEngine.current.add(
			new ConfettiBag(refCanvas.current, {
				x,
				y,
				vxLimit: [-10, 10],
				vyLimit: [0, -10],
				nbConfetti: rng(10, 20),
			})
		)
	}

	useEffect(() => {
		if (refCanvas.current) {
			let canvas = refCanvas.current
			let ctx = refCanvas.current.getContext("2d")
			let engine = new Engine(canvas, ctx)
			let body = document.querySelector("body")
			body.addEventListener("click", onClickBody)
			engine.add(
				new ConfettiBag(canvas, {
					x: 30,
					y: canvas.height / 2 - 10,
					vxLimit: [10, 30],
					vyLimit: [-0, -18],
					nbConfetti: rng(100, 150),
				})
			)
			engine.add(
				new ConfettiBag(canvas, {
					x: canvas.width - 30,
					y: canvas.height / 2 - 10,
					vxLimit: [-10, -30],
					vyLimit: [-0, -18],
					nbConfetti: rng(100, 150),
				})
			)
			refEngine.current = engine

			let timer = window.setTimeout(() => {
				window.requestAnimationFrame(refEngine.current.update)
			}, 1000)

			return () => {
				window.clearTimeout(timer)
				body.removeEventListener("click", onClickBody)
			}
		}
	}, [refCanvas])

	const onPopBalloon = (e) => {
		let rect = e.target.getBoundingClientRect()
		let x = rect.left + rect.width / 2
		let y = rect.top + rect.height / 2
		refEngine.current.add(
			new ConfettiBag(refEngine.current.canvas, {
				x,
				y,
				vxLimit: [-5, 5],
				vyLimit: [0, -10],
				nbConfetti: rng(25, 30),
			})
		)
	}

	return (
		<>
			<canvas style={styleCanvas} ref={refCanvas}></canvas>
			{!poped ? (
				<>
					<img ref={refConeOne} src={coneIMG} className={`${classes.cone} ${classes.coneLeft}`} />
					<img ref={refConeTwo} src={coneIMG} className={`${classes.cone} ${classes.coneRight}`} />
				</>
			) : null}
			{/* <HBD /> */}
			<OneYear />
			<Balloon
				onPopBalloon={onPopBalloon}
				color="rgba(102,8,172, 0.8)"
				pos={{ bottom: -1, left: 30 }}
				colorHandle="rgba(161,137,188,1)"
				move={"one"}
			/>
			<Balloon
				onPopBalloon={onPopBalloon}
				color="rgba(173,7,206, 0.8)"
				pos={{ bottom: -1, left: 60 }}
				colorHandle="rgba(161,137,188,1)"
				move={"two"}
			/>
			<Balloon
				onPopBalloon={onPopBalloon}
				color="rgba(173,7,206, 0.8)"
				pos={{ bottom: -20, right: 30 }}
				colorHandle="rgba(161,137,188,1)"
				move={"three"}
			/>
			<Balloon
				onPopBalloon={onPopBalloon}
				color="rgba(223,28,209, 0.8)"
				pos={{ bottom: -10, right: 80 }}
				colorHandle="rgba(161,137,188,1)"
				move={"one"}
			/>
			<Balloon
				onPopBalloon={onPopBalloon}
				color="rgba(37,4,181, 0.8)"
				pos={{ bottom: -1, right: 60 }}
				colorHandle="rgba(161,137,188,1)"
				move={"two"}
			/>
			<Birthday onPop={onPopBalloon}/>
			{isXS ? (
				<>
					<Gift
						pos={{ top: "80px", right: "12%" }}
						colorPaper={{ main: "#84abcb", dark: "#557c9a" }}
						colorRibbon={{ main: "#fbc02d", dark: "#c49000" }}
						size={30}
						variant="one"
						onPop={onPopBalloon}
					/>

					<Gift
						pos={{ top: "90px", left: "12%" }}
						colorPaper={{ main: "#4000a5", dark: "#000075" }}
						colorRibbon={{ main: "#fbc02d", dark: "#c49000" }}
						size={20}
						variant="three"
						onPop={onPopBalloon}
					/>
				</>
			) : (
				<>
					<Gift
						pos={{ top: "68px", right: "50%" }}
						colorPaper={{ main: "#84abcb", dark: "#557c9a" }}
						colorRibbon={{ main: "#fbc02d", dark: "#c49000" }}
						size={60}
						variant="one"
						onPop={onPopBalloon}
					/>
					<Gift
						pos={{ top: "98px", right: "55%" }}
						colorPaper={{ main: "#8500b8", dark: "#510087" }}
						colorRibbon={{ main: "#fbc02d", dark: "#c49000" }}
						size={30}
						variant="two"
						onPop={onPopBalloon}
					/>
					<Gift
						pos={{ top: "88px", right: "45%" }}
						colorPaper={{ main: "#4000a5", dark: "#000075" }}
						colorRibbon={{ main: "#fbc02d", dark: "#c49000" }}
						size={40}
						variant="three"
						onPop={onPopBalloon}
					/>
				</>
			)}
		</>
	)
}

const useStyles = makeStyles((theme) => {
	return {
		cone: {
			animation: "$pop 4s",
			opacity: "0%",
			position: "fixed",
			top: "45%",
			zIndex: 990,
			height: "50px",
		},
		coneLeft: {
			left: "10px",
			transform: "scale(-1, 1)",
		},
		coneRight: {
			right: "10px",
		},

		"@keyframes pop": {
			"0%": { opacity: "0%" },
			"20%": { opacity: "90%" },
			"60%": { opacity: "90%" },
			"80%": { opacity: "90%" },
			"100%": { opacity: "0%" },
		},
	}
})
export default OneYear2022
