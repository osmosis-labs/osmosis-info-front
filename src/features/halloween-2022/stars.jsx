import { makeStyles } from "@material-ui/core"
import { random } from "../../helpers/helpers"
import starPNG from "./assets/star.png"
const useStyles = makeStyles((theme) => {
	return {
		"@keyframes starA1": {
			"0%, 100%": {
				opacity: 0.5,
			},
			"50%": {
				opacity: 1,
			},
		},
		root: {
			zIndex: 0,
			position: "absolute",
			width: "100%",
		},
		star1: {
			animation: "$starA1 1s linear infinite",
		},
		star2: {
			animation: "$starA1 1s linear infinite",
			animationDelay: 333,
		},
		star0: {
			animation: "$starA1 1.5s linear infinite",
			animationDelay: 666,
		},
		stars: { position: "absolute", zIndex: 1 },
	}
})

export const Stars = () => {
	const classes = useStyles()
	const maxStars = 60

	const stars = []
	for (let i = 0; i < maxStars; i++) {
		stars.push(
			<img
				key={i}
				src={starPNG}
				className={`${classes.stars} ${classes[`star${i % 3}`]}`}
				style={{
					transform: `rotate(${random(0, 360)}deg) scale(${random(0, 10) * 0.1})`,
					top: random(90, 600),
					left: random(0, 1400),
				}}
			/>
		)
	}
	console.log("stars.jsx (l:41): stars:", stars)
	return <div className={classes.root}>{stars}</div>
}

export default Stars
