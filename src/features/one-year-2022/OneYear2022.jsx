import { useEffect, useRef } from "react"
import Balloon from "./balloon"
import ConfettiBag from "./confettiBag"
import Engine from "./engine"
import HBD from "./hbd"
import OneYear from "./oneYear"

const styleCanvas = {
	position: "fixed",
	height: "100vh",
	width: "100vw",
	pointerEvents: "none",
	zIndex: 999,
}
const OneYear2022 = () => {
	const refCanvas = useRef(null)
	const refEngine = useRef(null)
	const rng = (min, max) => Math.random() * (max - min) + min

	useEffect(() => {
		if (refCanvas.current) {
			let canvas = refCanvas.current
			let ctx = refCanvas.current.getContext("2d")
			let engine = new Engine(canvas, ctx)
			engine.add(
				new ConfettiBag(canvas, {
					x: 0,
					y: canvas.height / 2,
					vxLimit: [10, 30],
					vyLimit: [-0, -18],
					nbConfetti: rng(100, 150),
				})
			)
			engine.add(
				new ConfettiBag(canvas, {
					x: canvas.width,
					y: canvas.height / 2,
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
			<HBD />
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
		</>
	)
}

export default OneYear2022
