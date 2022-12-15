import { makeStyles } from "@material-ui/core"

export const Light = ({ x, y, size, color }) => {
	const classes = useStyles()

	return (
		<span
			key={key}
			className={classes.light}
			style={{ top: x, left: y, width: `${size}px`, height: `${size}px`, backgroundColor: color }}
		/>
	)
}
const useStyles = makeStyles((theme) => {
	return {
		light: {
			position: "absolute",
			borderRadius: "50%",
			transform: "translate(-50%, -50%)",
			animation: "$light 2s linear infinite, drop 1s linear .5s forwards",
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
