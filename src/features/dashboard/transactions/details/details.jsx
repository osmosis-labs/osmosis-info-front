import { makeStyles } from "@material-ui/core"
import dayjs from "dayjs"
import Informations from "./informations"

import trxImg from "./transactions.svg"
const useStyles = makeStyles((theme) => {
	return {
		rootDetails: {
			padding: "8px 8px",
			backgroundColor: theme.palette.primary.main,
			display: "flex",
			flexDirection: "column",
			height: "100%",
			[theme.breakpoints.down("xs")]: {},
		},
		rootDetailsNoData: {
			padding: "8px 8px",
			backgroundColor: theme.palette.primary.main,
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			height: "100%",
			[theme.breakpoints.down("xs")]: {},
		},
		imgNoData: {
			width: "70px",
		},
		containerImgNoData: {
			borderRadius: "50%",
			marginBottom: "16px",
			padding: "28px",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: theme.palette.primary.light,
		},
		textNoData: {
			color: theme.palette.primary.light2,
			fontSize: "24px",
			maxWidth: "300px",
			textAlign: "center",
		},
		title: {
			margin: "16px 0 8px 0",
			textAlign: "center",
			fontSize: "18px",
			color: theme.palette.primary.contrastText,
		},
		subTitle: {
			textAlign: "center",
			fontSize: "14px",
			marginBottom: "32px"
		},
	}
})
const Details = ({ data }) => {
	const classes = useStyles()
	if (!data.time) {
		return (
			<div className={classes.rootDetailsNoData}>
				<div className={classes.containerImgNoData}>
					<img src={trxImg} alt="" className={classes.imgNoData} />
				</div>
				<p className={classes.textNoData}>Select a transaction to see the details</p>
			</div>
		)
	}

	let dateToShow = dayjs(data.time.value.toString()).format("h:m a, D MMM YYYY")
	return (
		<div className={classes.rootDetails}>
			<p className={classes.title}>Transaction Details</p>
			<p className={classes.subTitle}>{dateToShow}</p>
			<Informations data={data}/>
		</div>
	)
}

export default Details
