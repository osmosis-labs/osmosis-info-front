import { makeStyles } from "@material-ui/core"
import PieChartIcon from "@material-ui/icons/PieChart"
import { useHistory } from "react-router-dom"
import Image from "../../components/image/Image"
import { formateNumberDecimalsAuto } from "../../helpers/helpers"

const useStyles = makeStyles((theme) => {
	return {
		topItemRoot: {
			display: "grid",
			gridTemplateColumns: "1fr 15fr 2fr",
			alignItems: "center",
			columnGap: "2px",
			padding: "6px 6px",
			margin: "4px 0",
			borderRadius: "5px",
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
		top: {
			fontSize: "13px",
			fontWeight: "bold",
			color: theme.palette.gray.dark,
			textAlign: "right",
		},
		infoContainer: {
			paddingLeft: "10px",
			display: "flex",
			alignItems: "center",
		},
		container: {
			paddingLeft: "10px",
			display: "flex",
			flexDirection: "column",
		},

		price: {
			textAlign: "right",
			fontSize: "12px",
		},
		priceDown: {
			color: theme.palette.red.subText,
			textShadow: "0px 0px 1px #000",
		},
		priceUp: {
			color: theme.palette.green.subText,
			textShadow: "0px 0px 1px #000",
		},
		name: {
			paddingLeft: "4px",
			fontSize: "13px",
			fontWeight: "bold",
			color: "#FFFFFF7A",
		},
		first: {
			background: `${theme.palette.green.first} `,
		},
		second: {
			background: `${theme.palette.green.second} `,
		},
		third: {
			background: `${theme.palette.green.third} `,
		},
		firstDown: {
			background: `${theme.palette.red.first} `,
		},
		secondDown: {
			background: `${theme.palette.red.second} `,
		},
		thirdDown: {
			background: `${theme.palette.red.third} `,
		},
	}
})

const TopItem = ({ item, index, type }) => {
	const classes = useStyles()
	const history = useHistory()
	let itemClass = ""
	if (type === "gainers") {
		if (index === 0) itemClass = classes.first
		else if (index === 1) itemClass = classes.second
		else if (index === 2) itemClass = classes.third
	} else {
		if (index === 0) itemClass = classes.firstDown
		else if (index === 1) itemClass = classes.secondDown
		else if (index === 2) itemClass = classes.thirdDown
	}

	const onClick = () => {
		history.push(`/token/${item.symbol}`)
	}

	return (
		<div className={`${classes.topItemRoot} ${itemClass}`} onClick={onClick}>
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
				<span className={classes.symbol}>{item.symbol}</span>
				<span className={classes.name}>{item.name}</span>
			</div>
			<div className={classes.container}>
				<span className={`${classes.price} ${type === "gainers" ? classes.priceUp : classes.priceDown}`}>
					${formateNumberDecimalsAuto({ price: item.price })}
				</span>
				<span className={`${classes.price} ${type === "gainers" ? classes.priceUp : classes.priceDown}`}>
					{formateNumberDecimalsAuto({ price: item.price_24h_change, unit: "%" })}
				</span>
			</div>
		</div>
	)
}

export default TopItem
