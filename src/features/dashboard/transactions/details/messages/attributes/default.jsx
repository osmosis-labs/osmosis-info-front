import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => {
	return {
		rootDefault: {
			display: "flex",
			flexDirection: "row",
			width: "100%",
			alignContent: "center",
			justifyContent: "space-between",
            margin: "6px 0",
			[theme.breakpoints.down("xs")]: {},
		},
		name: {
			fontSize: "12px",
            color: theme.palette.primary.contrastText,
		},
		data: {
			fontSize: "12px",
			color: theme.palette.gray.textLight2,
		},
	}
})
const Default = ({ data, name }) => {
	const classes = useStyles()

	return (
		<div className={`${classes.rootDefault}`}>
			<p className={classes.name}>{name}</p>
			<p className={classes.data}>{data}</p>
		</div>
	)
}

export default Default
