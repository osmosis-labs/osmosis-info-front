import { IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import Image from "../../../../components/image/Image"
import StarIcon from "@material-ui/icons/Star"
import StarBorderIcon from "@material-ui/icons/StarBorder"
import Tooltip from "@material-ui/core/Tooltip"
import { getInclude } from "../../../../helpers/helpers"
import { useAssets } from "../../../../hooks/data/assets.hook"
import { useWatchlistTokens } from "../../../../contexts/WatchlistTokensProvider"

const useStyles = makeStyles((theme) => {
	return {
		image: {
			width: "30px",
			marginRight: theme.spacing(1),
		},

		tokenImage: {
			width: "40px",
			[theme.breakpoints.down("xs")]: {
				width: "30px",
			},
		},
		tokenName: {
			marginTop: theme.spacing(1),
			display: "flex",
			margin: `${theme.spacing(2)}px 0`,
			flexDirection: "row",
			alignItems: "center",
		},
		subTitle: {
			[theme.breakpoints.down("xs")]: {
				width: "90%",
			},
			fontSize: theme.fontSize.big,
			textOverflow: "ellipsis",
			overflow: "hidden",
			whiteSpace: "nowrap",
		},
		titleIcon: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
		},
		images: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
		},
		iconStar: {
			color: "rgba(196, 164, 106,1)",
		},
		symbolName: {
			fontStyle: "normal",
			color: theme.palette.gray.dark,
			paddingLeft: theme.spacing(1),
		},
	}
})

const TokenTitle = ({ token }) => {
	const classes = useStyles()
	const { watchlistTokens, setWatchlistTokens } = useWatchlistTokens()
	const { data: assets } = useAssets()

	const toggleWatchlist = () => {
		let tmpWatchListTokens = [...watchlistTokens]
		let index = getInclude(watchlistTokens, (symbol) => symbol === token.symbol)
		if (index === -1) tmpWatchListTokens.push(token.symbol)
		else tmpWatchListTokens.splice(index, 1)
		setWatchlistTokens([...tmpWatchListTokens])
	}

	const isInWatchList = () => {
		let index = getInclude(watchlistTokens, (symbol) => {
			return symbol === token.symbol
		})
		return index >= 0
	}

	return (
		<div className={classes.tokenName}>
			<div className={classes.images}>
				<Image
					key={`${token.denom} - tokenImage`}
					className={`${classes.image} ${classes.tokenImage}`}
					assets={true}
					pathAssets=""
					src={assets[token.symbol]?.image}
					srcFallback="../assets/default.png"
					alt={`${token.symbol}`}
				/>
			</div>
			<div className={classes.titleIcon}>
				<p className={classes.subTitle}>
					{`${token.name}`} <em className={classes.symbolName}>({token.symbolDisplay})</em>
				</p>

				<Tooltip title={isInWatchList() ? "Remove from your watchlist" : "Add to your watchlist"}>
					<IconButton onClick={toggleWatchlist} aria-label="Switch in your watchList" component="span">
						{isInWatchList() ? (
							<StarIcon className={classes.iconStar} />
						) : (
							<StarBorderIcon className={classes.iconStar} />
						)}
					</IconButton>
				</Tooltip>
			</div>
		</div>
	)
}

export default TokenTitle
