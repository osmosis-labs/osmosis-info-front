import { useEffect, useRef } from "react"
import ConfettiBag from "./confettiBag"

const styleCanvas = {
	position: "fixed",
	height: "100vh",
	width: "100vw",
	pointerEvents: "none",
	zIndex: 999,
}
const OneYear2022 = () => {
	const refCanvas = useRef(null)

	useEffect(() => {
		if (refCanvas.current) {
			let canvas = refCanvas.current
			let ctx = refCanvas.current.getContext("2d")

			let confettiBag = new ConfettiBag(canvas, ctx)
			confettiBag.init()
			let timer = window.setTimeout(() => {
				window.requestAnimationFrame(confettiBag.update)
			}, 1000)

			return () => {
				window.clearTimeout(timer)
			}
		}
	}, [refCanvas])

	return <canvas style={styleCanvas} ref={refCanvas}></canvas>
}

export default OneYear2022
