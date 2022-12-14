import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => {
	console.log(
		"%cPaper.jsx -> 4 BLUE: theme.palette.primary.light",
		"background: #2196f3; color:#FFFFFF",
		theme.palette.primary.light
	)
	return {
		paperRoot: {
			padding: theme.spacing(2),
			borderRadius: theme.spacing(2),
			backgroundColor: `${theme.palette.primary.light}DD`,
		},
	}
})

const Paper = ({ children, className }) => {
	const classes = useStyles()

	return <div className={`${classes.paperRoot} ${className}`}>{children}</div>
}

export default Paper
