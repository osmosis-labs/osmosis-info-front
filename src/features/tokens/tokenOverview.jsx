import { makeStyles } from "@material-ui/core"
import Dominance from "../metrics/Dominance"
import Top from "../metrics/Top"

const useStyles = makeStyles((theme) => {
	return {
		rootTokenOverview: {
			backgroundColor: theme.palette.primary.dark2,
			width: "100vw",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		},
		containerTokenOveriew: {
			maxWidth: "1200px",
			width: "90%",
			margin: "40px 0",
		},
		title: {
			fontSize: "1.6rem",
			color: theme.palette.gray.contrastText,
			marginBottom: "20px",
		},
		topsContainer:{
			marginTop: "16px",
			display: "grid",
			gridTemplateColumns: "6fr 6fr",
			columnGap: theme.spacing(1),
			[theme.breakpoints.down("xs")]: {
				gridTemplateColumns: "1fr",
				rowGap: theme.spacing(1),
			},
		}
	}
})

const TokenOverview = () => {
	const classes = useStyles()

	return (
		<div className={classes.rootTokenOverview}>
			<div className={classes.containerTokenOveriew}>
				<p className={classes.title}>Tokens overview</p>
				<div className={classes.topsContainer}>
					<Dominance />
					<Top />
				</div>
			</div>
		</div>
	)
}

export default TokenOverview
