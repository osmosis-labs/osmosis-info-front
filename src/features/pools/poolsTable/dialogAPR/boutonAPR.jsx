import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => {
	return {
		buttonAPRRoot: {
			display: "grid",
            gridTemplateColumns:"1fr 1fr 1fr",
			alignItems: "center",
			justifyContent: "space-between",
			backgroundColor: theme.palette.primary.main,
			fontSize: theme.fontSize.verySmall,
			borderRadius: "20px",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.12),inset  0 1px 2px rgba(0,0,0,0.24)"
		},
		button: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
			cursor: "pointer",
			color: theme.palette.gray.textDark,
			padding: "8px 30px",
            transition: "background-color .3s",
			borderRadius: "20px",
			textAlign: "center",
			
		},
		buttonActive: {
			color: theme.palette.gray.contrastText,
			backgroundColor: theme.palette.blue.main,
		},
	}
})

const ButtonAPR = ({ buttons, active, className, style }) => {
	const classes = useStyles()

	return (
		<div className={`${className} ${classes.buttonAPRRoot}`} style={style}>
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

export default ButtonAPR
