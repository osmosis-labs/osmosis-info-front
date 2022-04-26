import { makeStyles } from "@material-ui/core"
import { useEffect } from "react"
import { useDashboard } from "../../../contexts/dashboard.provider"
const useStyles = makeStyles((theme) => {
	return {
		rootOverview: {
			width: "100%",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			backgroundColor: theme.palette.primary.dark2,
			[theme.breakpoints.down("xs")]: {},
		},
		container: {
			padding: "40px 0",
			maxWidth: "1200px",
			width: "100%",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
		},
		title: {
			fontSize: "1.6rem",
			color: theme.palette.gray.contrastText,
		},
		containerInfo: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			flexWrap: "wrap",
		},
		info: {
			display: "flex",
			flexDirection: "column",
			alignItems: "flex-start",
            justifyContent: "center",
		},
		titleInfo: {
			margin: "32px 0 16px 0",
			fontSize: "12px",
			color: theme.palette.gray.textLight,
		},
		dataInfo: {
			fontSize: "1.6rem",
			color: theme.palette.primary.contrastText,
		},
	}
})
const Overview = () => {
	const classes = useStyles()
	const { address, getNbTransaction } = useDashboard()

	useEffect(() => {
		const fetch = async () => {}

		if (address && address.length > 0) {
			fetch()
		}
	}, [address])

	return (
		<div className={classes.rootOverview}>
			<div className={classes.container}>
				<p className={classes.title}>History Trading</p>
				<div className={classes.containerInfo}>
					<div className={classes.info}>
						<p className={classes.titleInfo}>Total worth</p>
						<p className={classes.dataInfo}>$97 000</p>
					</div>
					<div className={classes.info}>
						<p className={classes.titleInfo}>Total worth</p>
						<p className={classes.dataInfo}>$97 000</p>
					</div>
					<div className={classes.info}>
						<p className={classes.titleInfo}>Total worth</p>
						<p className={classes.dataInfo}>$97 000</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Overview
