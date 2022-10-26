import { Ghost } from "./ghost"
import { makeStyles } from "@material-ui/core"
import grass from "./assets/grass.webp"
import grass2 from "./assets/grass2.webp"
import grass3 from "./assets/grass3.webp"
import smoke from "./assets/smoke.webp"
import smoke2 from "./assets/smoke2.webp"
import smoke3 from "./assets/smoke3.webp"
import scarecrow from "./assets/scarecrow.webp"
import sir from "./assets/sir.png"
import sir2 from "./assets/sir2.png"
import sir3 from "./assets/sir3.png"
import sir4 from "./assets/sir4.png"
import sir5 from "./assets/sir5.png"
import sir6 from "./assets/sir6.png"
import stone from "./assets/stone.webp"
import stone2 from "./assets/stone2.webp"
import hand from "./assets/hand.webp"
import { Stars } from "./stars"
import { Moon } from "./moon"
import { Riven } from "./riven"

const maxGhost = 3
export const Halloween2022 = () => {
	const classes = useStyles()

	let ghosts = []
	for (let i = 0; i <= maxGhost - 1; i++) {
		ghosts.push(<Ghost key={i} />)
	}
	return (
		<div className={classes.rootHalloween}>
			{ghosts}
			{/* <img src={stars} className={classes.stars} /> */}
			{/* <img src={stars} className={classes.stars} /> */}
			<Stars />
			<Moon className={classes.moon} />
			<Riven type="small" />
			<Riven type="smallReverse" />
			<Riven />
			<img src={smoke2} className={classes.smoke2} />
			<img src={smoke} className={classes.smoke} />
			<img src={grass3} className={classes.grass3} />
			<img src={sir6} className={classes.sir6} />
			<img src={sir} className={classes.sir} />
			<img src={sir2} className={classes.sir2} />
			<img src={sir3} className={classes.sir3} />
			<img src={sir4} className={classes.sir4} />
			<img src={sir5} className={classes.sir5} />
			<img src={stone} className={classes.stone} />
			<img src={grass2} className={classes.grass2} />
			<img src={smoke3} className={classes.smoke3} />
			<img src={scarecrow} className={classes.scarecrow} />
			<img src={grass} className={classes.grass} />
			<img src={stone2} className={classes.stone2} />
			<img src={hand} className={classes.hand} />
		</div>
	)
}

const useStyles = makeStyles((theme) => {
	return {
		"@keyframes smoke2": {
			"0%, 100%": {
				opacity: 0.3,
				transform: `rotate(0deg)`,
			},
			"50%": {
				transform: `rotate(5deg)`,
				opacity: 0.5,
			},
		},
		"@keyframes smoke": {
			"0%, 100%": {
				transform: `rotate(0deg)`,
				opacity: 0.8,
			},
			"50%": {
				transform: `rotate(5deg)`,
				opacity: 1,
			},
		},
		"@keyframes scarecrow": {
			"0%, 100%": {
				transform: `rotate(-2deg)`,
				opacity: 0.8,
			},
			"50%": {
				transform: `rotate(2deg)`,
				opacity: 1,
			},
		},

		"@keyframes grass": {
			"0%, 100%": {
				transform: `translateX(-2px)`,
			},
			"50%": {
				transform: `translateX(2px)`,
			},
		},

		"@keyframes sir": {
			"0%, 100%": {
				transform: `rotate(-1deg)`,
			},
			"50%": {
				transform: `rotate(1deg)`,
			},
		},
		"@keyframes hand": {
			"0%, 100%": {
				transform: `rotate(-2deg)`,
			},
			"50%": {
				transform: `rotate(2deg)`,
			},
		},

		rootHalloween: {
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			overflow: "hidden",
			pointerEvents: "none",
		},
		sir: {
			position: "absolute",
			pointerEvents: "none",
			zIndex: 0,
			bottom: 350,
			left: 0,
			animation: "$sir 8s linear infinite",
			transformOrigin: "50% 100%",
			width: 150,
			[theme.breakpoints.down("xs")]: {
				bottom: 210,
			},
		},
		hand: {
			position: "absolute",
			pointerEvents: "none",
			zIndex: 0,
			bottom: 60,
			left: 240,
			width: 60,
			animation: "$hand 8s linear infinite",
			transform: "scaleX(-1)",
			[theme.breakpoints.down("xs")]: {
				display: "none",
			},
		},
		stone2: {
			position: "absolute",
			pointerEvents: "none",
			zIndex: 0,
			bottom: 90,
			left: 60,
			width: 200,
			transform: "scaleX(-1)",
			[theme.breakpoints.down("xs")]: {
				display: "none",
			},
		},
		stone: {
			position: "absolute",
			pointerEvents: "none",
			zIndex: 0,
			bottom: 260,
			left: 200,
			width: 60,
			[theme.breakpoints.down("xs")]: {
				display: "none",
			},
		},
		sir2: {
			position: "absolute",
			pointerEvents: "none",
			zIndex: 0,
			bottom: 350,
			left: 80,
			animation: "$sir 8s linear infinite",
			transformOrigin: "50% 100%",
			width: 100,
			[theme.breakpoints.down("xs")]: {
				display: "none",
			},
		},
		sir3: {
			position: "absolute",
			pointerEvents: "none",
			zIndex: 0,
			bottom: 350,
			left: 80,
			animation: "$sir 8s linear infinite",
			transformOrigin: "50% 100%",
			width: 100,
			[theme.breakpoints.down("xs")]: {
				display: "none",
			},
		},
		sir4: {
			position: "absolute",
			pointerEvents: "none",
			zIndex: 0,
			bottom: 210,
			right: 600,
			animation: "$sir 8s linear infinite",
			transformOrigin: "50% 100%",
			width: 100,
			[theme.breakpoints.down("xs")]: {
				display: "none",
			},
		},
		sir5: {
			position: "absolute",
			pointerEvents: "none",
			zIndex: 0,
			bottom: 200,
			right: 500,
			animation: "$sir 8s linear infinite",
			transformOrigin: "50% 100%",
			width: 100,
			[theme.breakpoints.down("xs")]: {
				display: "none",
			},
		},
		sir6: {
			position: "absolute",
			pointerEvents: "none",
			zIndex: 0,
			bottom: 250,
			right: 60,
			animation: "$sir 8s linear infinite",
			transformOrigin: "50% 100%",
			width: 100,
			[theme.breakpoints.down("xs")]: {
				bottom: 100,
			},
		},
		moon: {
			position: "absolute",
			pointerEvents: "none",
			zIndex: 0,
			top: 130,
			left: 30,
			width: 200,
		},
		stars: {
			position: "absolute",
			pointerEvents: "none",
			zIndex: 0,
			width: "100%",
		},
		scarecrow: {
			position: "absolute",
			pointerEvents: "none",
			zIndex: 0,
			animation: "$scarecrow 8s linear infinite",
			animationDelay: "0.5s",
			bottom: -10,
			right: 30,
			transformOrigin: "50% 100%",
			[theme.breakpoints.down("xs")]: {
				bottom: -30,
				width: "300px",
				right: "80px",
			},
		},
		smoke3: {
			position: "absolute",
			pointerEvents: "none",
			zIndex: 0,
			animation: "$smoke 8s linear infinite",
			animationDelay: "0.5s",
			bottom: 20,
			width: "100%",
		},
		smoke2: {
			position: "absolute",
			animation: "$smoke2 8s linear infinite",
			pointerEvents: "none",
			zIndex: 0,
			opacity: 0.6,
			width: "100%",
		},
		smoke: {
			position: "absolute",
			animation: "$smoke 4s linear infinite",
			pointerEvents: "none",
			bottom: 120,
			zIndex: 0,
		},
		grass3: {
			position: "absolute",
			pointerEvents: "none",
			zIndex: 0,
			width: "100%",
			bottom: -10,
			animation: "$grass 4s linear infinite",
			animationDelay: "1.5s",
			[theme.breakpoints.down("xs")]: {
				width: "210%",
				left: -60,
				bottom: -20,
			},
		},
		grass2: {
			position: "absolute",
			pointerEvents: "none",
			animation: "$grass 4s linear infinite",
			animationDelay: "1s",
			zIndex: 0,
			width: "100%",
			bottom: -10,
			[theme.breakpoints.down("xs")]: {
				width: "210%",
				left: -60,
				bottom: -20,
			},
		},
		grass: {
			position: "absolute",
			pointerEvents: "none",
			zIndex: 1000,
			width: "110%",
			bottom: -115,
			left: -10,
			animation: "$grass 4s linear infinite",
			[theme.breakpoints.down("xs")]: {
				width: "210%",
				left: -60,
				bottom: -60,
			},
		},
	}
})
