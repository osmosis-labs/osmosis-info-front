import { makeStyles } from "@material-ui/core"
import { useRef } from "react"
import { useState, useEffect } from "react"
import { random } from "../../helpers/helpers"
import GhostRight from "./assets/ghostRight.webp"
import GhostDead from "./assets/ghostDead.webp"
import Cursor from "./assets/cursor.webp"
const DIM = { x: 75, y: 75 }
export const Ghost = () => {
	const classes = useStyles()
	const [alive, setAlive] = useState(true)
	const refTimer = useRef()
	const refElt = useRef(null)
	const currentPos = { x: 0, y: 0 }
	const max = { x: window.innerWidth, y: window.innerHeight }
	let direction = "right"
	let nbCycle = 0
	let nbMaxCycle = 0

	const getNextPos = () => {
		const time = 4
		if (refElt.current) {
			if (nbCycle >= nbMaxCycle) {
				nbCycle = 0
				disappear()
			} else {
				nbCycle += 1
				let nextPos = { x: random(0, max.x - DIM.x), y: random(0, max.y - DIM.y) }
				if (currentPos.x < nextPos.x) direction = "right"
				else direction = "left"
				currentPos.x = nextPos.x
				currentPos.y = nextPos.y

				// set animation
				refElt.current.style.top = `${currentPos.y}px`
				refElt.current.style.left = `${currentPos.x}px`
				refElt.current.style.transitionProperty = `top, left`
				refElt.current.style.transitionDuration = `${time}s`

				refElt.current.style.transitionTimingFunction = `cubic-bezier(0.41,0.1,0.62,1)`

				refElt.current.style.transform = `scale(${direction === "right" ? 1 : -1}, 1)`
				clearTimeout(refTimer.current)
				refTimer.current = window.setTimeout(getNextPos, time * 1_000 + 100)
			}
		}
	}

	const disappear = () => {
		const time = 4
		let nextPos = { x: random(0, max.x - DIM.x), y: random(0, max.y - DIM.y) }
		if (currentPos.x < nextPos.x) direction = "right"
		else direction = "left"
		currentPos.x = nextPos.x
		currentPos.y = nextPos.y

		// set animation
		refElt.current.style.top = `${currentPos.y}px`
		refElt.current.style.left = `${currentPos.x}px`
		refElt.current.style.transitionProperty = `top, left, opacity`
		refElt.current.style.opacity = `0`
		refElt.current.style.transitionDuration = `${time}s`

		refElt.current.style.transitionTimingFunction = `cubic-bezier(0.41,0.1,0.62,1)`

		refElt.current.style.transform = `scale(${direction === "right" ? 1 : -1}, 1)`
		clearTimeout(refTimer.current)
		refTimer.current = window.setTimeout(() => {
			reinitialize()
			initGhost()
		}, time * 1_000 + random(3, 10) * 1_000)
	}

	const initGhost = () => {
		const time = random(2, 4)
		let nextPos = { x: random(0, max.x - DIM.x), y: random(0, max.y - DIM.y) }
		if (currentPos.x < nextPos.x) direction = "right"
		else direction = "left"
		currentPos.x = nextPos.x
		currentPos.y = nextPos.y

		// set animation
		refElt.current.style.top = `${currentPos.y}px`
		refElt.current.style.left = `${currentPos.x}px`
		refElt.current.style.transitionProperty = `top, left, opacity`
		refElt.current.style.transitionDuration = `${4}s`
		refElt.current.style.opacity = `0.7`

		refElt.current.style.transitionTimingFunction = `cubic-bezier(.25,.13,.27,.99)`

		refElt.current.style.transform = `scale(${direction === "right" ? 1 : -1}, 1)`
		clearTimeout(refTimer.current)

		refTimer.current = window.setTimeout(getNextPos, time * 1_000 + 100)
	}

	const onClick = () => {
		setAlive((a) => false)
		const duration = 1
		refElt.current.style.top = `${max.y + DIM.y}px`
		refElt.current.style.opacity = `0.1`
		refElt.current.style.transitionProperty = `top, left, opacity`
		refElt.current.style.transitionDuration = `${duration}s`

		refElt.current.style.transitionTimingFunction = `cubic-bezier(.3,-0.36,.4,.2)`

		refElt.current.style.transform = `scale(${direction === "right" ? 1 : -1}, -1)`
		clearTimeout(refTimer.current)
		// refTimer.current = window.setTimeout(() => {
		// 	 reinitialize()
		// 	 initGhost()
		// }, duration * 1_000 + random(3, 10) * 1_000)
	}
	const reinitialize = () => {
		setAlive((a) => true)
		nbMaxCycle = random(3, 4)
		nbCycle = 0
		currentPos.x = random(1, 2) === 1 ? -DIM.x : max.x + DIM.x
		currentPos.y = random(1, 2) === 1 ? -DIM.y : max.y + DIM.y
		refElt.current.style.opacity = `0`
		refElt.current.style.top = `${currentPos.y}px`
		refElt.current.style.left = `${currentPos.x}px`
	}

	useEffect(() => {
		reinitialize()
		refTimer.current = window.setTimeout(initGhost, random(1, 3) * 1000)
		return () => clearTimeout(refTimer.current)
	}, [])
	return (
		<div className={classes.rootGhost} ref={refElt} onClick={onClick}>
			<img className={classes.ghostImg} src={alive ? GhostRight : GhostDead} />
		</div>
	)
}

const useStyles = makeStyles((theme) => {
	return {
		rootGhost: {
			position: "absolute",
			cursor: `url(${Cursor}), pointer`,
			pointerEvents: "auto !important",
			userSelect: "none",
			zIndex: 9999,
		},
		ghostImg: {
			userSelect: "none",
			height: "75px",
		},
	}
})
