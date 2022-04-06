import { makeStyles } from "@material-ui/core"
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => {
	return {
		notFoundRoot: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			marginTop: "60px",
			flexDirection: "column",
		},
		subTitle: {
			color: theme.palette.gray.main,
			fontSize: "1.4rem",
		},
		text: {
            margin: "20px"
        },
		link: {
            color: theme.palette.table.link,
        },
	}
})

const NotFound = () => {
	const classes = useStyles()

	return (
		<div className={classes.notFoundRoot}>
			<p className={classes.subTitle}>404 Page not found</p>
			<p className={classes.text}>
				<Link to="/" className={classes.link}>
				Go back home
				</Link>
			</p>
		</div>
	)
}

export default NotFound
