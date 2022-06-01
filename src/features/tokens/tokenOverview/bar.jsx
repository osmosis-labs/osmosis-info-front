import { makeStyles } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useGainers, useLosers } from "../../../hooks/data/metrics.hook"
import MoverItem from "./moverItem"

const useStyles = makeStyles((theme) => {
	return {
		rootBar: {
			display: "flex",
			alignItems: "center",
		},
	}
})

const Bar = ({ className }, ref) => {
	const classes = useStyles()
	const { data: losers } = useLosers()
	const { data: gainers } = useGainers()
	const [items, setItems] = useState([])
	useEffect(() => {
		let items = []
		if (gainers && gainers.length > 0) {
			items = [...items, ...gainers]
		}
		if (losers && losers.length > 0) {
			items = [...items, ...losers]
		}
		items.sort((a, b) => {
			return b.price_24h_change - a.price_24h_change
		})
		setItems(items)
	}, [gainers, losers])
	return (
		<div ref={ref} className={`${classes.rootBar} ${className}`}>
			{items.map((item, index) => {
				return <MoverItem key={index} item={item} index={index} />
			})}
		</div>
	)
}

export default React.forwardRef(Bar)
