import { makeStyles } from "@material-ui/core"
import RivenIMG from "./assets/rivens.webp"

export const Riven = ({ className, type }) => {
	const classes = useStyles()
	let classesName = `${classes.rootRiven} ${className}`

	if (type) {
		classesName += ` ${classes[type]}`
	} else {
		classesName += ` ${classes.rivenBase}`
	}
	return (
		<div className={classesName}>
			<div className={`${classes.riven}`} />
		</div>
	)
}

const useStyles = makeStyles((theme) => {
	return {
		smallReverse: {
			animation: "$flySmall 24s linear infinite",
			animationDelay: "6s",
			scale: "-0.6 0.6",
			left: "300px",
			left: `${window.innerWidth + 200}px`,
		},
		small: {
			scale: "0.6",
			animation: "$flySmall 18s linear infinite",
			left: "-100px",
			animationDelay: "4s",
		},
		rivenBase: {
			animation: "$fly 20s linear infinite",
			left: "-100px",
			animationDelay: "2s",
		},
		rootRiven: {
			position: "absolute",
			opacity: 0,
		},
		"@keyframes sprite": {
			from: {
				backgroundPosition: "0px 0px",
			},
			to: {
				backgroundPosition: "900px 0px",
			},
		},
		riven: {
			height: "90px",
			width: "90px",
			background: `url(${RivenIMG})`,
			backgroundSize: "900px",
			animationName: "$sprite",
			backgroundPosition: "0px 0px",
			animationDuration: "0.5s",
			animationTimingFunction: "steps(9)",
			animationIterationCount: "infinite",
		},
		"@keyframes fly": {
			"0%": {
				opacity: 0,
				transform: "translate(-100px, 400px)",
				display: "none",
			},
			"1%": {
				display: "block",
				opacity: 1,
				transform: "translate(-100px, 400px)",
			},
			"25%": {
				transform: `translate(${window.innerWidth / 2}px, 300px)`,
				opacity: 1,
			},
			"50%": {
				transform: `translate(${window.innerWidth + 200}px, 400px)`,
				opacity: 1,
			},
			"51%": {
				opacity: 0,
			},
			"52%": {
				opacity: 0,
				display: "none",
			},
		},
		"@keyframes flySmall": {
			"0%": {
				opacity: 0,
				transform: "translate(-100px, 200px)",
				display: "none",
			},
			"1%": {
				display: "block",
				opacity: 1,
				transform: "translate(-100px, 200px)",
			},
			"25%": {
				transform: `translate(${window.innerWidth}px, 300px)`,
				opacity: 1,
			},
			"50%": {
				transform: `translate(${window.innerWidth * 2 + 200}px, 200px)`,
				opacity: 1,
			},
			"51%": {
				opacity: 0,
			},
			"52%": {
				opacity: 0,
				display: "none",
			},
		},
	}
})
