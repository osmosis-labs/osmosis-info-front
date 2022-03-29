import { makeStyles } from "@material-ui/core"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
const useStyles = makeStyles((theme) => {
	return {
		rootPopover: {
			position: "absolute",
			opacity: 0,
			top: 0,
			zIndex: "-1",
			transition: "opacity 0.2s ease-in-out",
		},
		pop: {
			opacity: "1",
			zIndex: "9999",
		},
		hide: {
			opacity: "0",
			zIndex: "9999",
		},
	}
})
const Popover = ({ open, children, event }) => {
	const classes = useStyles()
	const ref = useRef(null)
	const refTimeout = useRef(null)
	const refTimeoutClear = useRef(null)
	const refWasOpened = useRef(false)
	const [style, setStyle] = useState({ top: 0, left: 0 })
	const [classesPop, setClasses] = useState(classes.rootPopover)

	useEffect(() => {
		if (open && event && event.target && ref.current) {
			let rectElement = ref.current.getBoundingClientRect()
			let topEl = 0
			let leftEl = 0
			let heightEl = rectElement.height
			let widthEl = rectElement.width
			let anchorEl = event.target
			let rectAnchor = anchorEl.getBoundingClientRect()
			let offset = 10

			topEl = rectAnchor.y + rectAnchor.height / 2 - heightEl / 2
			leftEl = rectAnchor.x + rectAnchor.width / 2 - widthEl / 2
			let yMax = topEl + heightEl
			let xMax = leftEl + widthEl
			if (yMax >= window.innerHeight - offset) {
				let diffY = yMax - window.innerHeight
				topEl = topEl - diffY - offset
			}
			if (xMax >= window.innerWidth - offset) {
				let diffX = xMax - window.innerWidth
				leftEl = leftEl - diffX - offset
			}
			if (topEl <= 0) {
				topEl = offset
			}
			if (leftEl <= 0) {
				leftEl = offset
			}

			setStyle({
				top: topEl,
				left: leftEl,
				height: heightEl,
				width: widthEl,
			})
		}
	}, [open, ref, event])

	useEffect(() => {
		refTimeout.current = window.setTimeout(() => {
			if (open) {
				refWasOpened.current = true
				setClasses(`${classes.rootPopover} ${classes.pop}`)
			} else if (refWasOpened.current) {
				refWasOpened.current = false
				setClasses(`${classes.rootPopover} ${classes.hide}`)
				refTimeoutClear.current = window.setTimeout(() => {
					setClasses(`${classes.rootPopover}`)
				}, 300)
			}
		}, 50)
		return () => {
			if (refTimeout.current !== null) {
				clearTimeout(refTimeout.current)
			}
			if (refTimeoutClear.current !== null) {
				clearTimeout(refTimeoutClear.current)
			}
		}
	}, [open])
	return createPortal(
		<div ref={ref} style={style} className={classesPop}>
			{children}
		</div>,
		document.body
	)
}

export default Popover
