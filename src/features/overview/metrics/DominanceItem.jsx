import { makeStyles } from "@material-ui/core"
import Image from "../../../components/image/Image"
import PieChartIcon from "@material-ui/icons/PieChart"
import { formateNumberDecimals, getPercent } from "../../../helpers/helpers"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => {
	return {
		dominanceItemRoot: {
			display: "grid",
			gridTemplateColumns: "1fr 15fr 2fr",
			alignItems: "center",
			columnGap: "2px",
			padding: "6px 0",
			cursor: "pointer",

		},
		image: {
			height: "30px",
			borderRadius: "50%",
			border: `1px solid ${theme.palette.yellow.gold}`,
		},
		icon: {
			height: "30px",
			fontSize: "28px",
		},
		dominance: {
			fontSize: "13px",
			fontWeight: "bold",
			color: theme.palette.gray.dark,
			textAlign: "right",
		},
		infoContainer: {
			paddingLeft: "2px",
			display: "flex",
			flexDirection: "column",
		},

		info: {
			display: "flex",
			alignItems: "center",
		},
		symbol: {},
		name: {
			paddingLeft: "4px",
			fontSize: "13px",
			fontWeight: "bold",
			color: theme.palette.gray.dark,
		},
		percentBar: {
			marginTop: "2px",
			borderRadius: "5px",
			height: "5px",
			background: `${theme.palette.yellow.gold} 0% 0% no-repeat padding-box`,
		},
		percentBarBlue: {
			background: "transparent linear-gradient(180deg, #89EAFB 0%, #1377B0 100%) 0% 0% no-repeat padding-box",
		},
		percentBarPurple: {
			background: "transparent linear-gradient(180deg, #9600BC 0%, #FF00A7 100%) 0% 0% no-repeat padding-box",
		},
		percentBarRed: {
			background: "transparent linear-gradient(180deg, #FF817D 0%, #FF2C00 100%) 0% 0% no-repeat padding-box",
		},
		percentBarGreen: {
			background: "transparent linear-gradient(180deg, #008A7D 0%, #00CEBA 100%) 0% 0% no-repeat padding-box",
		},
	}
})

const DominanceItem = ({ item, index }) => {
	const classes = useStyles()
	const history = useHistory()
	let barClasse = ""
	if(index === 0) barClasse = classes.percentBarPurple
	else if(index === 1) barClasse = classes.percentBarBlue
	else if(index === 2) barClasse = classes.percentBarRed
	else if(index === 3) barClasse = classes.percentBarGreen

	const onClick = () => {
		history.push(`/token/${item.symbol}`)
	}

	return (
		<div className={classes.dominanceItemRoot} onClick={onClick}>
			{item.symbol === "Others" ? (
				<PieChartIcon className={`${classes.icon}`} />
			) : (
				<Image
					className={`${classes.image}`}
					assets={true}
					pathAssets=""
					src={`https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/${item?.symbol?.toLowerCase()}.png`}
					srcFallback="../assets/default.png"
					alt={`${item.symbol}`}
				/>
			)}
			<div className={classes.infoContainer}>
				<div className={classes.info}>
					<span className={classes.symbol}>{item.symbol}</span>
					<span className={classes.name}>{item.name}</span>
				</div>
				<div
					className={`${classes.percentBar} ${barClasse}`}
					style={{ width: `${formateNumberDecimals(item.dominance, 0)}%` }}
				></div>
			</div>
			<p className={classes.dominance}>{getPercent(item.dominance)}</p>
		</div>
	)
}

export default DominanceItem
