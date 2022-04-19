import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => {
	return {
		paperRoot: {
			backgroundColor: `${theme.palette.primary.dark}`,
            padding: "5px",
            borderRadius: "10px",
		},
	}
})

const PaperAPR = ({ children, className }) => {
	const classes = useStyles()

	return <div className={`${classes.paperRoot} ${className}`}>{children}</div>
}

export default PaperAPR
