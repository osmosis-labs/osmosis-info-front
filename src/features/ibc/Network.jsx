import React from "react"
import { makeStyles } from "@material-ui/core"
import Paper from "../../components/paper/Paper"
import Image from "../../components/image/Image"
import { MIN_BLOCKED, MIN_CONGESTED } from "../../contexts/IBCProvier"
const useStyles = makeStyles((theme) => {
	return {
		network: {
			backgroundColor: theme.palette.primary.dark,
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			width: "160px",
		},
		image: {
			height: "50px",
			padding: "8px",
			border: `1px solid ${theme.palette.yellow.gold}`,
			borderRadius: "50%",
		},
		name: {
			color: theme.palette.gray.contrastText,
			textAlign: "center",
			fontSize: "1.5rem",
		},
		source: {
			fontSize: "0.9rem",
			textAlign: "center",
			color: theme.palette.gray.dark,
		},
		channel: {
			marginTop: "2px",
			fontSize: "0.8rem",
			textAlign: "center",
			color: theme.palette.gray.dark,
		},
		buble: {
			marginTop: "10px",
			borderRadius: "50px",
			padding: "4px 14px",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			fontSize: "0.7rem",
		},
		bubleGreen: {
			color: "#52EB7D",
		},
		bubleOrange: {
			color: "#FF8200",
		},
		bubleRed: {
			color: "#EF3456",
		},
		dot: {
			height: "8px",
			width: "8px",
			borderRadius: "50%",
			marginRight: "5px",
		},
		dotGreen: {
			backgroundColor: "#52EB7D",
		},
		dotOrange: {
			backgroundColor: "#FF8200",
		},
		dotRed: {
			backgroundColor: "#EF3456",
		},
	}
})

const IBCItem = ({ network, className }) => {
	const classes = useStyles()
	let classNameBuble = classes.buble
	if (network.duration_minutes < MIN_CONGESTED) {
		classNameBuble += " " + classes.bubleGreen
	} else if (network.duration_minutes < MIN_BLOCKED) {
		classNameBuble += " " + classes.bubleOrange
	} else {
		classNameBuble += " " + classes.bubleRed
	}
	return (
		<Paper className={`${classes.network} ${className}`}>
			<Image
				className={`${classes.image}`}
				assets={true}
				pathAssets=""
				src={`https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/${network?.token_symbol?.toLowerCase()}.png`}
				srcFallback="../assets/default.png"
				alt={`${network.symbol}`}
			/>
			<p className={classes.name}>{network.channel_id}</p>
			<p className={classes.source}>{network.source}</p>
			<p className={classes.channel}>{network.channel_id}</p>
			<span className={`${classes.buble} ${classes.bubleGreen}`}>
				<span className={`${classes.dot} ${classes.dotGreen}`} />
				<span>{`${network.size_queue} Pending Tx`}</span>
			</span>
		</Paper>
	)
}

export default React.memo(IBCItem)
