import { makeStyles, TableCell } from "@material-ui/core"
import Image from "../../../components/image/Image"
import redArrow from "./arrowRed.svg"
import orangeArrow from "./arrowOrange.svg"
import greenArrow from "./arrowGreen.svg"
import { MIN_BLOCKED, MIN_CONGESTED } from "../../../contexts/IBCProvier"

const useStyles = makeStyles((theme) => {
	return {
		rootCellStatus: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		image: {
			height: "30px",
		},
		arrows: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
		},
		arrow: {
			width: "40px",
			padding: "2px 4px",
		},
		firstArrow: {
			transform: "rotate(180deg)",
		},
	}
})
const CellStatus = ({ cellKey, cellConfig, data }) => {
	const classes = useStyles()
	let arrowFirstSrc = greenArrow
	let arrowSecondSrc = greenArrow
	if (data[0].duration_minutes < MIN_CONGESTED) {
		arrowFirstSrc = greenArrow
	} else if (data[0].duration_minutes < MIN_BLOCKED) {
		arrowFirstSrc = orangeArrow
	} else {
		arrowFirstSrc = redArrow
	}
	if (data[1].duration_minutes < MIN_CONGESTED) {
		arrowSecondSrc = greenArrow
	} else if (data[1].duration_minutes < MIN_BLOCKED) {
		arrowSecondSrc = orangeArrow
	} else {
		arrowSecondSrc = redArrow
	}
	return (
		<TableCell key={cellKey}>
			<div className={classes.rootCellStatus}>
				<Image
					className={`${classes.image}`}
					assets={true}
					src={`https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/${data[0]?.token_symbol?.toLowerCase()}.png`}
					srcFallback="../assets/default.png"
					pathAssets=""
				/>
				<div className={classes.arrows}>
					<img src={arrowFirstSrc} alt="arrow" className={`${classes.arrow} ${classes.firstArrow}`} />
					<img src={arrowSecondSrc} alt="arrow" className={`${classes.arrow} `} />
				</div>
				<Image
					className={`${classes.image}`}
					assets={true}
					src={`https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/${data[1]?.token_symbol?.toLowerCase()}.png`}
					srcFallback="../assets/default.png"
					pathAssets=""
				/>
			</div>
		</TableCell>
	)
}

export default CellStatus
