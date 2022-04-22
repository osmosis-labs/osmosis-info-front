import { makeStyles } from "@material-ui/core"
import dayjs from "dayjs"

const useStyles = makeStyles((theme) => {
	return {
		rootInformations: {
			[theme.breakpoints.down("xs")]: {},
		},
		title: {
			color: theme.palette.primary.contrastText,
			fontSize: "16px",
			backgroundColor: theme.palette.primary.light,
            padding: "12px 20px",
			borderRadius: "16px 16px 0 0",
			borderBottom: `1px solid ${theme.palette.primary.light}`,
		},
		row: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
            padding: "8px 20px",
			alignItems: "flex-start",
			backgroundColor: theme.palette.primary.main2,
		},
		rowBorder: {
		},
		subTitle: {
			fontSize: "14px",
        },
		info: {
            width: "100%",
			fontSize: "12px",
			borderBottom: `1px solid ${theme.palette.primary.light}`,
            padding: "0 0 8px 0",
            marginTop: "4px"
        },
	}
})
const Informations = ({ data }) => {
	const classes = useStyles()

	let dateToShow = dayjs(data.time.value.toString()).format("h:m a, D MMM YYYY")
	return (
		<div className={classes.rootInformations}>
			<p className={classes.title}>Informations</p>
			<div className={`${classes.row}`}>
				<p className={classes.subTitle}>Chain ID</p>
				<p className={classes.info}>lapin</p>
			</div>
			<div className={`${classes.row} ${classes.rowBorder}`}>
				<p className={classes.subTitle}>Chain ID</p>
				<p className={classes.info}>lapin</p>
			</div>
		</div>
	)
}

export default Informations
