import { makeStyles } from "@material-ui/core"
import ScreamIMG from "./assets/scream.webp"
import MoonIMG from "./assets/moon.webp"

export const Moon = ({ className }) => {
	const classes = useStyles()
	return (
		<div className={`${className} ${classes.rootMon}`}>
			<img src={MoonIMG} className={classes.moonImg} />
			<img src={ScreamIMG} className={classes.screamImg} />
		</div>
	)
}

const useStyles = makeStyles((theme) => {
	return {
		rootMoon: {},
		moonImg: {
			position: "absolute",
			top: "10%",
			left: "10%",
			width: "100%",
		},
		screamImg: {
			position: "absolute",
			width: "90%",
			opacity: 0,
			top: 30,
			animation: "$scream 6s infinite",
			left: 30,
		},
		"@keyframes scream": {
			"0%": {
				opacity: 0,
			},
			"20%": {
				opacity: 0,
			},
			"21%": {
				opacity: 0.8,
			},
			"22%": {
				opacity: 0.1,
			},
			"23%": {
				opacity: 0.8,
				transform: "translate(-1px,-1px)",
			},
			"24%": {
				opacity: 0.1,
			},
			"27%": {
				opacity: 0.8,
				transform: "translate(1px,1px)",
			},
			"28%": {
				opacity: 0.1,
				transform: "translate(-1px,1px)",
			},
			"29%": {
				opacity: 0.4,
				transform: "translate(1px,-1px)",
			},
			"31%": {
				opacity: 0.8,
			},
			"32%": {
				opacity: 0.1,
			},
			"33%": {
				opacity: 0.8,
				transform: "translate(-1px,-1px)",
			},
			"34%": {
				opacity: 0.3,
			},
			"36%": {
				opacity: 0.6,
			},

			"41%": {
				opacity: 0.6,
			},
		},
	}
})
