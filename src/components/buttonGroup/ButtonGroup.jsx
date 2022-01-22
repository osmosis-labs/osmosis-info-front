import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => {
	return {
		buttonGroupRoot: {
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
		buttonActive: {
			color: theme.palette.gray.contrastText,
			backgroundColor: theme.palette.black.dark,
			fontWeight: "600",
			borderRadius: "20px",
		},
	}
})

const ButtonGroup = ({ buttons, active, className, style }) => {
	const classes = useStyles()

	return (
		<div className={`${className} ${classes.buttonGroupRoot}`} style={style}>
			{buttons.map((button) => {
				return (
					<div
						key={button.id}
						className={active === button.id ? `${classes.button} ${classes.buttonActive}` : `${classes.button}`}
						onClick={button.onClick}
					>
						{button.name}
					</div>
				)
			})}
		</div>
	)
}

export default ButtonGroup
