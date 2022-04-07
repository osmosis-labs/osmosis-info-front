import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core"
import IBCItem from "./IBCItem"
import { useWatchlistIBC } from "../../contexts/WatchlistIBCProvider"
import IBCList from "./IBCList"
import IbcTable from "./ibcTable/ibcTable"
const useStyles = makeStyles((theme) => {
	return {
		IBCwatchlistRoot: {
			margin: `${theme.spacing(2)}px 0`,
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		},
		content: {
			maxWidth: "1200px",
			width: "90%",
		},
		items: {
			display: "grid",
			gridTemplateColumns: "1fr 1fr 1fr",
			columnGap: "20px",
			rowGap: "20px",
			marginTop: "20px",
			overflow: "hidden",
			marginBottom: theme.spacing(2),
			[theme.breakpoints.down("xs")]: {
				gridTemplateColumns: "1fr ",
			},
		},
		subTitle: {
			alignSelf: "flex-start",
			margin: `${theme.spacing(2)}px 0`,
			fontSize: "1.5rem",
		},
		text: {
			alignSelf: "flex-start",
		},
	}
})

const IBCwatchlist = ({ ibcCouple }) => {
	const classes = useStyles()
	const { watchlistIBC, getWatchList, updateWatchlistIBC, isInWatchlist } = useWatchlistIBC()

	const [watchlist, setWatchlist] = useState([])

	useEffect(() => {
		setWatchlist(getWatchList(ibcCouple))
	}, [watchlistIBC, ibcCouple])
	return (
		<div className={classes.IBCwatchlistRoot}>
			<p className={classes.subTitle}>Your watchlist</p>
			{watchlist.length > 0 ? (
				<IbcTable data={watchlist} updateWatchlistIBC={updateWatchlistIBC} isInWatchlist={isInWatchlist} />
			) : (
				<p className={classes.text}>Saved IBC will appear here</p>
			)}
		</div>
	)
}

export default React.memo(IBCwatchlist)
