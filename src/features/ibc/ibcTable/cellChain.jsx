import { makeStyles, TableCell } from "@material-ui/core"
import StarIcon from "@mui/icons-material/Star"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import { Tooltip, IconButton } from "@mui/material"
import Image from "../../../components/image/Image"
import { MIN_BLOCKED, MIN_CONGESTED } from "../../../contexts/IBCProvier"

const useStyles = makeStyles((theme) => {
	return {
		rootCellChain: {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			minWidth: "400px",
			overflow: "hidden",
			textOverflow: "ellipsis",
			"& span": {
				margin: "0px 2px",
			},
		},
		rows: {
			display: "flex",
			flexDirection: "column",
		},
		row: {
			margin: "4px 0",
			display: "grid",
			gridTemplateColumns: "30px 20px 1fr",
			alignItems: "center",
			justifyContent: "flex-start",
		},

		watchlistIcon: {
			margin: "0 4px 0 0 ",
		},
		iconStar: {
			color: "rgba(196, 164, 106,1)",
		},
		imagesContainer: {
			padding: "0px 10px 0 0",
			display: "flex",
			alignItems: "center",
			pointerEvents: "none",
		},
		image: {
			height: "20px",
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
		source: {
			fontSize: "0.9rem",
			color: theme.palette.gray.dark,
			textOverflow: "ellipsis",
			overflow: "hidden",
			whiteSpace: "nowrap",
			maxWidth: "130px",
		},
	}
})
const CellChain = ({ cellKey, cellConfig, data }) => {
	const classes = useStyles()

	const toggleWatchlist = () => {
		cellConfig.updateWatchlistIBC(data)
	}

	const itemInWatchlist = () => {
		return cellConfig.isInWatchlist(data)
	}
	let classDotOne = classes.dot
	if (data[0].duration_minutes < MIN_CONGESTED) {
		classDotOne += " " + classes.dotGreen
	} else if (data[0].duration_minutes < MIN_BLOCKED) {
		classDotOne += " " + classes.dotOrange
	} else {
		classDotOne += " " + classes.dotRed
	}
	let classDotTwo = classes.dot
	if (data[1].duration_minutes < MIN_CONGESTED) {
		classDotTwo += " " + classes.dotGreen
	} else if (data[1].duration_minutes < MIN_BLOCKED) {
		classDotTwo += " " + classes.dotOrange
	} else {
		classDotTwo += " " + classes.dotRed
	}
	return (
		<TableCell key={cellKey}>
			<div className={classes.rootCellChain}>
				<div className={classes.watchlistIcon}>
					<Tooltip title={itemInWatchlist() ? "Remove from your watchlist" : "Add to your watchlist"}>
						<IconButton onClick={toggleWatchlist} aria-label="Switch in your watchList" component="span">
							{itemInWatchlist() ? (
								<StarIcon className={classes.iconStar} />
							) : (
								<StarBorderIcon className={classes.iconStar} />
							)}
						</IconButton>
					</Tooltip>
				</div>
				<div className={classes.rows}>
					<div className={classes.row}>
						<Image
							className={`${classes.image}`}
							assets={true}
							src={`https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/${data[0]?.token_symbol?.toLowerCase()}.png`}
							srcFallback="../assets/default.png"
							pathAssets=""
						/>
						<span className={`${classDotOne}`} />
						<span>{data[0].token_name} <span className={classes.source}>({data[0].source})</span></span>
						
					</div>
					<div className={classes.row}>
						<Image
							className={`${classes.image}`}
							assets={true}
							src={`https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/${data[1]?.token_symbol?.toLowerCase()}.png`}
							srcFallback="../assets/default.png"
							pathAssets=""
						/>
						<span className={`${classDotTwo}`} />
						<span>{data[1].token_name} <span className={classes.source}>({data[1].source})</span></span>
						
					</div>
				</div>
			</div>
		</TableCell>
	)
}

export default CellChain
