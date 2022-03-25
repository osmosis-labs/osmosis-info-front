import { makeStyles } from "@material-ui/core"
import React, { memo } from "react"
import { useTokenChartV2 } from "../../../../contexts/TokenChartV2"
import AppBarExpertChart from "./AppBarExpertChart"
import ExpertChart from "./ExpertChart"
import TransactionTable from "./TransactionsTable"
const useStyles = makeStyles((theme) => {
	return {
		expertDialogContainer: {
			position: "fixed",
			width: "100%",
			height: "calc(100% - 141px)",
			maxHeight: "calc(100% - 141px)",
			display: "flex",
			flexDirection: "column",
			zIndex: "1000",
			transition: "all 0.3s ease-in-out",
			[theme.breakpoints.down("xs")]: {
				height: "calc(100% - 109px)",
				maxHeight: "calc(100% - 109px)",
			},
		},
		expertDialogContainerOpened: {
			zIndex: theme.zIndex.dialog,
			opacity: 1,
			transform: "translateY(0%)",
		},
		expertDialogContainerClosed: {
			opacity: 0,
			zIndex: -1,
			transform: "translateY(100%)",
		},
		expertContainer: {
			overflowY: "scroll",
			width: "100%",
			display: "flex",
			flexDirection: "column",
			backgroundColor: theme.palette.primary.light,
			height: "100%",
			
		},
		expertChart: { minHeight: "66%" },
		table: {
			minHeight: "34%",
		},
	}
})

const ExpertChartDialog = ({ open, onClose, token }) => {
	const classes = useStyles()
	const { getHistoricalChartToken, getTrxToken, loadingTrx } = useTokenChartV2()

	const handleClose = () => {
		onClose()
	}

	return (
		<div
			className={
				open
					? `${classes.expertDialogContainer} ${classes.expertDialogContainerOpened}`
					: `${classes.expertDialogContainer} ${classes.expertDialogContainerClosed}`
			}
		>
			<AppBarExpertChart onClose={handleClose} token={token} />
			<div className={classes.expertContainer}>
				<ExpertChart getHistoricalChartToken={getHistoricalChartToken} token={token} className={classes.expertChart} />
				<TransactionTable getTrxToken={getTrxToken} loadingTrx={loadingTrx} token={token} className={classes.table} />
			</div>
		</div>
	)
}

export default memo(ExpertChartDialog)
