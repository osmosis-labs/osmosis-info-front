import React, { useRef, useState } from "react"
import { makeStyles } from "@material-ui/core"

const Gift = ({ colorPaper, colorRibbon, pos, size, variant, onPop }) => {
	const classes = useStyles({ colorPaper, pos, colorRibbon, size })
	const [poped, setPoped] = useState(false)
	const refGift = useRef(null)

	let classesName = `${classes.rootGift}`
	if (variant === "one") {
		classesName += ` ${classes.shakeOne}`
	} else if (variant === "two") {
		classesName += ` ${classes.shakeTwo}`
	} else if (variant === "three") {
		classesName += ` ${classes.shakeThree}`
	}

	const pop = (e) => {
		onPop(e)
		refGift.current.classList.add(classes.pop)
		window.setTimeout(() => {
			setPoped((p) => true)
		}, 300)
	}

	if (poped) {
		return null
	}

	return (
		<div className={`${classesName}`} ref={refGift} onClick={pop}>
			<div className={classes.box}>
				<div className={`${classes.lid}`} />
			</div>
			<div className={classes.ribbonBottom} />
			<div className={classes.ribbonTop} />
			<div className={`${classes.node} ${classes.nodeLeft}`} />
			<div className={`${classes.node} ${classes.nodeRight}`} />
		</div>
	)
}

const useStyles = makeStyles((theme) => {
	return {
		rootGift: ({ colorPaper, colorRibbon, pos, size }) => ({
			position: "fixed",
			zIndex: "999",
			...pos,
		}),
		box: ({ colorPaper, colorRibbon, pos, size }) => {
			return {
				position: "relative",
				width: size,
				height: size - 4,
				backgroundColor: colorPaper.dark,
				borderRadius: `${size / 20}px ${size / 20}px ${size / 9}px  ${size / 9}px`,
			}
		},
		lid: ({ colorPaper, colorRibbon, pos, size }) => {
			return {
				position: "absolute",
				width: size + 8,
				height: size / 4.5,
				left: "50%",
				transform: "translate(-50%, 0)",
				backgroundColor: colorPaper.main,
				borderRadius: `${size / 10}px ${size / 10}px ${size / 20}px  ${size / 20}px`,
				perspective: "1000px",
			}
		},
		ribbonTop: ({ colorPaper, colorRibbon, pos, size }) => {
			return {
				position: "absolute",
				transform: "translate(-50%, 0)",
				width: size / 9 + 2,
				height: size / 4.5,
				left: "50%",
				top: 0,
				borderRadius: "2px",
				backgroundColor: colorRibbon.main,
			}
		},
		ribbonBottom: ({ colorPaper, colorRibbon, pos, size }) => {
			return {
				position: "absolute",
				transform: "translate(-50%, 0)",
				height: size - 4,
				width: size / 9,
				left: "50%",
				top: 0,
				borderRadius: "2px",
				backgroundColor: colorRibbon.dark,
			}
		},
		node: ({ colorPaper, colorRibbon, pos, size }) => {
			return {
				position: "absolute",
				width: size / 4,
				height: size / 4,
				top: 0,
				backgroundColor: "transparent",
				borderRadius: "50% 50% 10% 50%",
				border: `6px solid ${colorRibbon.main}`,
			}
		},
		nodeRight: {
			transform: " translateY(-100%) skew(10deg, 10deg)",
			right: "50%",
		},
		nodeLeft: {
			transform: "  translateY(-100%) scaleX(-1) skew(10deg, 10deg)",
			left: "50%",
		},

		shakeOne: {
			animation: "$shake 8s cubic-bezier(.36,.07,.19,.97) infinite",
		},
		shakeTwo: {
			animation: "$shake 6s cubic-bezier(.36,.07,.19,.97) infinite",
		},
		shakeThree: {
			animation: "$shake 10s cubic-bezier(.36,.07,.19,.97) infinite",
		},
		pop: {
			animation: "$pop 0.3s",
		},
		"@keyframes pop": {
			from: { transform: "scale(1)" },
			"100%": { transform: "scale(10)", opacity: "0%" },
		},

		"@keyframes shake": {
			"1%, 9%": {
				transform: "translate3d( -1px, 0, 0)",
			},
			"2%, 8%": {
				transform: "translate3d( 2px, 0, 0)",
			},
			"3%, 5%, 7%": {
				transform: "translate3d( -4px, 0, 0)",
			},
			"4%, 6%": {
				transform: "translate3d( 4px, 0, 0)",
			},
		},
	}
})

export default Gift
