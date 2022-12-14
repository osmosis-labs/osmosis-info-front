import { makeStyles } from "@material-ui/core"
import tree from "./assets/tree.webp"
import { random, randomArray } from "../../helpers/helpers"

const colors = ["#f06292", "#c2185b", "#880e4f", "#b39ddb", "#673ab7", "#4527a0", "#7986cb", "#303f9f", "#ad1457"]
const positions = [
	{ left: "48%", top: "10%" },
	{ left: "30%", top: "25%" },
	{ left: "45%", top: "20%" },
	{ left: "68%", top: "23%" },
	{ left: "30%", top: "35%" },
	{ left: "48%", top: "32%" },
	{ left: "70%", top: "38%" },
	{ left: "80%", top: "55%" },
	{ left: "60%", top: "50%" },
	{ left: "30%", top: "53%" },
	{ left: "20%", top: "65%" },
	{ left: "40%", top: "70%" },
	{ left: "85%", top: "68%" },
	{ left: "15%", top: "80%" },
	{ left: "30%", top: "90%" },
	{ left: "60%", top: "85%" },
	{ left: "92%", top: "88%" },
]
export const Tree = ({ x, y, nbBall = 12, size = 1, delay = 0 }) => {
	const classes = useStyles()

	const posCopy = [...positions]
	const max = nbBall <= posCopy.length ? nbBall : posCopy.length
	const posFinals = []
	for (let i = 0; i < max; i++) {
		let index = random(0, posCopy.length - 1)
		posFinals.push(posCopy.splice(index, 1)[0])
	}

	return (
		<div className={classes.containerTree} style={{ left: x, top: y, transform: `scale(${size})` }}>
			<div
				className={classes.tree}
				style={{
					animationDelay: `${delay}s`,
				}}
			>
				{[...Array(max).keys()].map((key, index) => {
					const color = randomArray(colors)
					return <span key={key} className={classes.light} style={{ ...posFinals[index], backgroundColor: color }} />
				})}
				<img src={tree} className={classes.treeIMG} />
			</div>
		</div>
	)
}
const useStyles = makeStyles((theme) => {
	return {
		containerTree: {
			position: "absolute",
			pointerEvents: "none",
		},
		tree: {
			animation: "$tree 8s linear infinite",
			transformOrigin: "50% 100%",
			bottom: "8%",
			zIndex: 2,
			left: "50%",
			height: "80%",
			[theme.breakpoints.down("xs")]: {},
		},
		treeIMG: {
			maxWidth: "100px",
		},
		light: {
			position: "absolute",
			width: "10px",
			height: "10px",
			borderRadius: "50%",
			transform: "translate(-50%, -50%)",
			animation: "$light 2s linear infinite, drop 1s linear .5s forwards",
		},
		"@keyframes tree": {
			"0%, 100%": {
				transform: `rotate(-2deg)`,
				opacity: 0.8,
			},
			"50%": {
				transform: `rotate(2deg)`,
				opacity: 1,
			},
		},
		"@keyframes light": {
			"0%": {
				filter: "drop-shadow(0 0 2px #fefae0) brightness(1);",
			},
			"50%": {
				filter: "drop-shadow(0 0 5px #fefae0) brightness(1.5);",
			},
			"100%": {
				filter: "drop-shadow(0 0 2px #fefae0) brightness(1);",
			},
		},
	}
})
