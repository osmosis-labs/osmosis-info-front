import React from "react"
import { IconButton, makeStyles, Tooltip } from "@material-ui/core"
import Paper from "../../components/paper/Paper"
import greenArrow from "./greenDownArrow.svg"
import orangeArrow from "./orangeDownArrow.svg"
import redArrow from "./redDownArrow.svg"
import Network from "./Network"
import StarIcon from "@material-ui/icons/Star"
import StarBorderIcon from "@material-ui/icons/StarBorder"
import { MIN_BLOCKED, MIN_CONGESTED } from "../../contexts/IBCProvier"
const useStyles = makeStyles((theme) => {
	return {
		IBCItem: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			position: "relative",
		},
		arrowUp: {
			transform: "rotate(180deg)",
		},
		networks: {
			display: "flex",
			flexDirection: "column",
			height: "100%",
			justifyContent: "space-between",
		},
		arrow: {
			height: "260px",
			margin: "0px 8px",
		},
		network: {
			marginBottom: "60px",
		},
		watchlistIcon: {
			position: "absolute",
			top: "20px",
			right: "20px",
			
		},
		iconStar: {
			color: "rgba(196, 164, 106,1)",
		},
	}
})

const IBCItem = ({ item, updateWatchlistIBC, isInWatchlist }) => {
	const classes = useStyles()
	let arrowFirstSrc = greenArrow
	let arrowSecondSrc = greenArrow
	if (item.length > 1) {
		if (item[0].duration_minutes < MIN_CONGESTED) {
			arrowFirstSrc = greenArrow
		} else if (item[0].duration_minutes < MIN_BLOCKED) {
			arrowFirstSrc = orangeArrow
		} else {
			arrowFirstSrc = redArrow
		}
		if (item[1].duration_minutes < MIN_CONGESTED) {
			arrowSecondSrc = greenArrow
		} else if (item[1].duration_minutes < MIN_BLOCKED) {
			arrowSecondSrc = orangeArrow
		} else {
			arrowSecondSrc = redArrow
		}
	}

	const toggleWatchlist = () => {
		updateWatchlistIBC(item)
	}

	const itemInWatchlist = (item) => {
		return isInWatchlist(item)
	}

	return (
		<Paper className={classes.IBCItem}>
			<div className={classes.watchlistIcon}>
				<Tooltip
					style={{ transform: `translateX(0)` }}
					title={itemInWatchlist(item) ? "Remove from your watchlist" : "Add to your watchlist"}
				>
					<IconButton onClick={toggleWatchlist} aria-label="Switch in your watchList" component="span">
						{itemInWatchlist(item) ? (
							<StarIcon className={classes.iconStar} />
						) : (
							<StarBorderIcon className={classes.iconStar} />
						)}
					</IconButton>
				</Tooltip>
			</div>
			<img src={arrowFirstSrc} alt="blocked" className={`${classes.arrow} ${classes.arrowUp}`} />
			<div className={classes.networks}>
				<Network network={item[0]} className={classes.network} />

				<Network network={item[1]} />
			</div>

			<img src={arrowSecondSrc} alt="blocked" className={`${classes.arrow}`} />
		</Paper>
	)
}

export default IBCItem
