import { makeStyles } from "@material-ui/core"
import Image from "../../../../components/image/Image"
import { formateNumberDecimalsAuto, getPercent } from "../../../../helpers/helpers"
const useStyles = makeStyles((theme) => {
	return {
		rootWalletItem: {
			width: "100%",
			display: "grid",
			gridTemplateColumns: "2fr repeat(3, 1fr)",
			padding: "8px 0",
			borderBottom: `1px solid ${theme.palette.table.hover}`,
			color: theme.palette.primary.contrastText,
			fontSize: "14px",
			[theme.breakpoints.down("xs")]: {},
		},
		nameContainer: {
			display: "flex",
			alignItems: "center",
		},
		image: {
			width: "32px",
			marginRight: "8px",
			padding: "2px",
			borderRadius: "50%",
			border: `1px solid ${theme.palette.yellow.gold}`,
		},
		names: {
			display: "flex",
			flexDirection: "column",
		},
		name: {
			fontSize: "12px",
			color: theme.palette.table.cellDark,
		},
		data: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
		},
		up: {
			color: theme.palette.green.text,
		},
		down: {
			color: theme.palette.error.main,
		},
	}
})

const WalletItem = ({ data }) => {
	const classes = useStyles()

	const getPercentDisplay = (percent) => {
		if (percent === 0) return <span className={classes.data}>{getPercent(percent)}</span>
		else if (percent > 0) return <span className={`${classes.data}  ${classes.up}`}>↑ {getPercent(percent)}</span>
		return <span className={` ${classes.data} ${classes.down}`}>↓ {getPercent(percent)}</span>
	}

	return (
		<div className={classes.rootWalletItem}>
			<div className={classes.nameContainer}>
				<Image
					className={`${classes.image}`}
					assets={true}
					src={`https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/${data.symbol.toLowerCase()}.png`}
					srcFallback="../assets/default.png"
					pathAssets=""
				/>
				<div className={classes.names}>
					<span>{data.symbol}</span>
					<span className={classes.name}>{data.name}</span>
				</div>
			</div>
			<span className={classes.data}>{formateNumberDecimalsAuto({ price: data.amount })} </span>
			{getPercentDisplay(data.valueChange)}
			<span className={classes.data}>${formateNumberDecimalsAuto({ price: data.value })} </span>
		</div>
	)
}

export default WalletItem
