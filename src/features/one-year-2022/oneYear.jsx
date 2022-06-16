import React, { useEffect, useRef, useState } from "react"
import { makeStyles } from "@material-ui/core"
import dogeCakeIMG from "./dogecake.png"

const OneYear = () => {
	const classes = useStyles()
	const [poped, setPoped] = useState(false)
	const ref = useRef(null)

	useEffect(() => {
		if (ref.current) {
			ref.current.classList.add(classes.pop)
			window.setTimeout(() => {
				setPoped((p) => true)
			}, 4000)
		}
	}, [ref])

	if (poped) {
		return null
	}
	return (
		<div className={classes.rootOneYear} ref={ref}>
			<img src={dogeCakeIMG} className={classes.img} />
			{/* <span className={classes.star}>★</span>
			<span className={classes.one}>1</span>
			<span className={classes.year}>YEAR</span> */}
		</div>
	)
}

const useStyles = makeStyles((theme) => {
	return {
		rootOneYear: () => ({
			height: "300px",
			width: "300px",
			top: "30%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			position: "fixed",
			zIndex: "1001",
			borderRadius: "50%",
			backgroundColor: "#c7a600",
			border: "10px solid #ffd700",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			flexDirection: "column",
			opacity: "0%",
			boxShadow: `0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22), inset 0 1px 3px rgba(0,0,0,0.12), inset 0 1px 2px rgba(0,0,0,0.24)`,
		}),
		img: {
            height: "220px",
            transform: "translate(-10%, 0)",
        },

		one: {
			color: "#ffd700",
			fontSize: "5rem",
			textShadow: "1px 1px 2px #846f00",
		},
		star: {
			color: "#ffd700",
			fontSize: "3rem",
			textShadow: "1px 1px 2px #846f00",
		},
		year: {
			color: "#ffd700",
			fontSize: "3rem",
			textShadow: "1px 1px 2px #846f00",
		},

		pop: {
			animation: "$pop 4s",
		},

		"@keyframes pop": {
			"0%": { opacity: "0%" },
			"20%": { opacity: "0%" },
			"60%": { opacity: "90%" },
			"80%": { opacity: "90%" },
			"100%": { opacity: "0%" },
		},
	}
})

export default OneYear
