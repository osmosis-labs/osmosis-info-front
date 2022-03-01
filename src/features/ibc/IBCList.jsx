import React from "react"
import { makeStyles } from "@material-ui/core"
import IBCItem from "./IBCItem"
const useStyles = makeStyles((theme) => {
	return {
		IBCListRoot: {
			width: "100vw",
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
	}
})

const IBCList = ({ ibcCouple, updateWatchlistIBC, isInWatchlist }) => {
	const classes = useStyles()
	return (
		<div className={classes.IBCListRoot}>
			<div className={classes.content}>
				<div className={classes.items}>
					{ibcCouple.map((item, index) => {
						return <IBCItem item={item} key={index} updateWatchlistIBC={updateWatchlistIBC} isInWatchlist={isInWatchlist} />
					})}
				</div>
			</div>
		</div>
	)
}

export default React.memo(IBCList)
