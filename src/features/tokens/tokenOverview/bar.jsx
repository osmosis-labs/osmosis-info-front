import { makeStyles, useTheme } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import CustomSkeleton from "../../../components/skeleton/custom_skeleton"
import { useGainers, useLosers } from "../../../hooks/data/metrics.hook"
import MoverItem from "./moverItem"

const useStyles = makeStyles((theme) => {
	return {
		rootBar: {
			display: "flex",
			alignItems: "center",
		},
		itemSkeleton: {
			margin: "0px 10px",
			borderRadius: "10px",
			padding: "8px 12px",
			backgroundColor: theme.palette.primary.dark,
		},
	}
})

const Bar = ({ className, isLoading }, ref) => {
	const classes = useStyles()
	const { data: losers } = useLosers()
	const { data: gainers } = useGainers()
	const [items, setItems] = useState([])
	const theme = useTheme()
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

	if (isLoading) {
		let itemsLoading = []
		for (let i = 0; i < 5; i++) {
			itemsLoading.push(i)
		}
		return (
			<div ref={ref} className={`${classes.rootBar} ${className}`}>
				{itemsLoading.map((_, index) => {
					return (
						<div key={index} className={classes.itemSkeleton}>
							<CustomSkeleton
								animation="wave"
								variant="rectangular"
								className={`${classes.skeleton}`}
								width={175}
								height={45}
								sx={{ bgcolor: theme.palette.primary.main, margin: "0 0" }}
							/>
						</div>
					)
				})}
			</div>
		)
	}
	return (
		<div ref={ref} className={`${classes.rootBar} ${className}`}>
			{items.map((item, index) => {
				return <MoverItem key={index} item={item} index={index} />
			})}
		</div>
	)
}

export default React.forwardRef(Bar)
