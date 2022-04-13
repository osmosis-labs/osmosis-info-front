import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useMetrics } from "../../../contexts/MetricsProvider"
import MoverItem from "./moverItem"

const useStyles = makeStyles((theme) => {
	return {
		rootBar: {
			display: "flex",
			alignItems: "center",
		},
	}
})

const Bar = ({ className }) => {
	const classes = useStyles()
	const { losers, gainers, loadingTop } = useMetrics()
	const [items, setItems] = useState([])
	useEffect(() => {
		let items = []
		if (gainers && gainers.length > 0) {
			items = [...items, ...gainers]
		}
		if (losers && losers.length > 0) {
			items = [...items, ...losers]
		}
		items.sort((a,b)=>{return b.price_24h_change - a.price_24h_change})
		setItems(items)
	}, [gainers, losers])
	return (
		<div className={`${classes.rootBar} ${className}`}>
			{items.map((item, index) => {
				return <MoverItem key={index} item={item} index={index} />
			})}
		</div>
	)
}

export default Bar
