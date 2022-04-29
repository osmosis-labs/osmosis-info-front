import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => {
	return {
		rootThemeButton: {
			transition: "all 0.3s ease-in-out",
			padding: "8px 16px",
			margin: "4px",
			borderRadius: "4px",
			border: "none",
			cursor: "pointer",
			backgroundColor: theme.palette.blueButton.background,
			color: theme.palette.blueButton.color,
			"&:hover": {
				backgroundColor: theme.palette.blueButton.backgroundHover,
				color: theme.palette.blueButton.color,
			},
			"&:disabled": {
				backgroundColor: theme.palette.blueButton.backgroundDisabled,
				color: theme.palette.blueButton.colorDisabled,
			},

			[theme.breakpoints.down("xs")]: {},
		},
	}
})
const ThemeButton = ({ onClick, children, className }) => {
	const classes = useStyles()

	return (
		<button className={`${classes.rootThemeButton} ${className}`} onClick={onClick}>
			{children}
		</button>
	)
}

export default ThemeButton
