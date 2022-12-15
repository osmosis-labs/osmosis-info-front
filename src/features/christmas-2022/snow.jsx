import { makeStyles } from "@material-ui/core"
import { useEventTheme } from "../../contexts/event-theme.provider"
import snowBorder from "./assets/border_snow.webp"
import snowCorner from "./assets/corner-snow.webp"
import snowHor from "./assets/hor-snow.webp"
import snowHor2 from "./assets/hor2-snow.webp"

export const Snow = ({ x, y, type = "snowHorizontal" }) => {
	const classes = useStyles()
	const { show } = useEventTheme()

	let classesName = ``
	let src = snowBorder
	if (show) classesName = `${classesName} ${classes.snow}`
	else classesName = `${classesName} ${classes.snowHide}`
	if (type === "snowHorizontal") {
		src = snowBorder
		classesName += ` ${classes.snowHorizontal}`
	} else if (type === "snowCorner") {
		src = snowCorner
		classesName += ` ${classes.snowCorner}`
	} else if (type === "snowHorizontal2") {
		src = snowHor
		classesName += ` ${classes.snowHor}`
	} else if (type === "snowHorizontal3") {
		src = snowHor2
		classesName += ` ${classes.snowHor2}`
	}

	return (
		<img
			src={src}
			className={classesName}
			style={{
				left: `${x}`,
				top: `${y}`,
			}}
		/>
	)
}

const useStyles = makeStyles((theme) => {
	return {
		snowHide: {
			display: "none",
		},
		snow: {
			position: "absolute",
			maxWidth: "100%",
			zIndex: "10",
		},
		snowHor2: {
			transform: "translate(0%, -53%)",
		},
		snowHor: {
			transform: "translate(0%, -37%)",
		},
		snowHorizontal: {
			transform: "translate(0%, -38%)",
		},
		snowCorner: {
			transform: "translate(0%, -38%)",
		},
	}
})
