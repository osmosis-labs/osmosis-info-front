import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => {
	return {
		buttonRoot: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "flex-end",
			backgroundColor: theme.palette.primary.dark2,
			fontSize: theme.fontSize.verySmall,
			padding: "4px 4px",
			borderRadius: "20px",
		},
		button: {
			cursor: "pointer",
			color: theme.palette.gray.main,
			padding: "2px 10px",
			"&:hover": {
				color: "#6c7284",
			},
		},
	}
})

const Button = ({ onclick, className, style, children }) => {
	const classes = useStyles()

	return (
		<div className={`${className} ${classes.buttonRoot}`} style={style}>
			<div className={`${classes.button}`} onClick={onclick}>
				{children}
			</div>
		</div>
	)
}

export default Button
