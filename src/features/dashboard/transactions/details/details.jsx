import { makeStyles } from "@material-ui/core"
import dayjs from "dayjs"
import Informations from "./informations"
import Messages from "./messages/messages"
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions"
import { IconButton } from "@mui/material"
import trxImg from "./transactions.svg"
import { useState } from "react"
import ModalJSON from "./modal_json"
const useStyles = makeStyles((theme) => {
	return {
		rootDetails: {
			overflow: "hidden",
			overflowY: "auto",
			padding: "8px 8px",
			backgroundColor: theme.palette.primary.main,
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			height: "100%",
			[theme.breakpoints.down("xs")]: {},
		},
		rootDetailsNoData: {
			padding: "8px 8px",
			backgroundColor: theme.palette.primary.main,
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			justifyContent: "center",
			height: "100%",
			[theme.breakpoints.down("xs")]: {},
		},
		detailsContainer: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			width: "100%",
			maxWidth: "460px",
			height: "100%",
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
		header: {
			position: "relative",
			width: "100%",
			marginTop: "16px",
			marginBottom: "32px",
		},
		title: {
			margin: "0px 0 8px 0",
			width: "100%",
			textAlign: "center",
			fontSize: "18px",
			color: theme.palette.primary.contrastText,
		},
		subTitle: {
			textAlign: "center",
			fontSize: "14px",
		},
		iconContainer: {
			top: "50%",
			right: "10%",
			transform: "translate(-50%, -50%)",
			position: "absolute !important",
			backgroundColor: `${theme.palette.primary.dark} !important`,
			borderRadius: "50% !important",
			padding: "4px !important",
		},
		icon: {
			color: theme.palette.primary.light2,
			backgroundColor: theme.palette.primary.dark,
			fontSize: "24px !important",
		},
	}
})
const Details = ({ data, openJSON }) => {
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
			<div className={classes.detailsContainer}>
				<div className={classes.header}>
					<p className={classes.title}>Transaction Details</p>
					<p className={classes.subTitle}>{dateToShow}</p>
					<IconButton aria-label="open" className={classes.iconContainer} onClick={openJSON}>
						<IntegrationInstructionsIcon className={classes.icon} />
					</IconButton>
				</div>
				<Informations data={data} />
				<Messages data={data} />
			</div>
		</div>
	)
}

export default Details
