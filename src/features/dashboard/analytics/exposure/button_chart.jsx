import { makeStyles } from "@material-ui/core"
import { useState } from "react"
import ThemeButton from "../../../../components/button/theme_button"

const useStyles = makeStyles((theme) => {
	return {
		rootButtonChart: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",

		},
		notAvalaible: {
			backgroundColor: theme.palette.blueButton.backgroundDisabled,
			color: theme.palette.blueButton.colorDisabled,
			transition: "all 0.3s ease-in-out",
		},
	}
})

const ButtonChart = ({ onChangeType, type }) => {
	const classes = useStyles()
	const [actived, setActived] = useState(type)

	const onClick = (type) => {
		onChangeType(type)
		setActived(type)
	}

	return (
		<div className={classes.rootButtonChart}>
			<ThemeButton
				onClick={() => {
					onClick("asset")
				}}
				className={actived === "asset" ? null : classes.notAvalaible}
			>
				Asset Exposure
			</ThemeButton>
			<ThemeButton
				onClick={() => {
					onClick("pool")
				}}
				className={actived === "pool" ? null : classes.notAvalaible}
			>
				Pools Exposure
			</ThemeButton>
		</div>
	)
}

export default ButtonChart
