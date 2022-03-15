import { makeStyles } from "@material-ui/core"
import Dominance from "./Dominance"
import Metrics from "./Metrics"
import Top from "./Top"
import lpwSVG from "../../../patrickTheme/ressources/lpwomen.svg"
import lpgroupSVG from "../../../patrickTheme/ressources/lpGroup.svg"
import cloversPNG from "../../../patrickTheme/ressources/clovers4.png"

const useStyles = makeStyles((theme) => {
	return {
		overviewMetricsRoot: {
			backgroundColor: theme.palette.primary.dark2,
			width: "100vw",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			position: "relative",
			zIndex: 1,
			"&:after": {
				position: "absolute",
				content: "''",
				top: "0",
				left: "0",
				width: "100%",
				height: "100%",
				zIndex: -1,
				opacity: "0.2",
				background: `url(${cloversPNG}) `,
			},
		},
		overviewMetricsContainer: {
			maxWidth: "1200px",
			width: "90%",
			margin: "40px 0",
			position: "relative",

			"&:after": {
				content: "''",
				zIndex: "1",
				position: "absolute",
				bottom: "-49px",
				right: "-50px",
				height: "50px",
				width: "50px",
				display: "block",
				background: `url(${lpwSVG}) no-repeat center`,
				[theme.breakpoints.down("xs")]: {
					right: "-0px",
				},
			},
			"&:before": {
				content: "''",
				zIndex: "1",
				position: "absolute",
				bottom: "-69px",
				left: "-50px",
				height: "100px",
				width: "100px",
				display: "block",
				background: `url(${lpgroupSVG}) no-repeat center`,
				[theme.breakpoints.down("xs")]: {
					left: "-0px",
				},
			},
		},
		title: {
			fontSize: "1.6rem",
			color: theme.palette.gray.contrastText,
			marginBottom: "20px",
		},
		topsContainer: {
			marginTop: "16px",
			display: "grid",
			gridTemplateColumns: "6fr 6fr",
			columnGap: theme.spacing(1),
			[theme.breakpoints.down("xs")]: {
				gridTemplateColumns: "1fr",
				rowGap: theme.spacing(1),
			},
		},
	}
})

const OverviewMetrics = () => {
	const classes = useStyles()

	return (
		<div className={classes.overviewMetricsRoot}>
			<div className={classes.overviewMetricsContainer}>
				<p className={classes.title}>Overview</p>
				<Metrics />
				<div className={classes.topsContainer}>
					<Dominance />
					<Top />
				</div>
			</div>
		</div>
	)
}

export default OverviewMetrics
