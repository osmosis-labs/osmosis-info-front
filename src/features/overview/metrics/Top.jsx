import { makeStyles } from "@material-ui/core"
import Paper from "../../../components/paper/Paper"
import { useMetrics } from "../../../contexts/MetricsProvider"
import TopItem from "./TopItem"
import ShowChartIcon from "@material-ui/icons/ShowChart"
import { useEffect, useState } from "react"
import ButtonGroup from "../../../components/buttonGroup/ButtonGroup"
const useStyles = makeStyles((theme) => {
	return {
		topRoot: {},
		titleContainer: {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
		},
		iconUp: {
			color: theme.palette.green.text,
			transition: "all 0.3s ease-in-out",
		},
		iconDown: {
			color: theme.palette.error.main,
			transform: "rotateX(180deg)",
			transition: "all 0.3s ease-in-out",
		},
		items:{
			marginTop: "10px",
		}
	}
})

const Top = () => {
	const classes = useStyles()
	const { losers, gainers } = useMetrics()

	const [typeTop, setTypeTop] = useState("gainers")
	const [currentTop, setCurrentTop] = useState([])

	useEffect(() => {
		if (gainers && gainers.length > 0) {
			setCurrentTop(gainers)
		}
	}, [gainers])

	const onChangeTypeTop = (type) => {
		setTypeTop(type)
		setCurrentTop(type === "gainers" ? gainers : losers)
	}
	return (
		<Paper className={classes.topRoot}>
			<div className={classes.titleContainer}>
				<p>Top</p>
				<ButtonGroup
					className={classes.groupButton}
					buttons={[
						{
							id: "gainers",
							name: "Gainers",
							onClick: () => {
								onChangeTypeTop("gainers")
							},
						},
						{
							id: "losers",
							name: "Losers",
							onClick: () => {
								onChangeTypeTop("losers")
							},
						},
					]}
					active={typeTop}
				/>
				<ShowChartIcon className={typeTop==="gainers"?classes.iconUp:classes.iconDown} />
			</div>
			<div className={classes.items}>
				{currentTop.slice(0, 5).map((item, index) => {
					return <TopItem key={index} item={item} index={index} type={typeTop}/>
				})}
			</div>
		</Paper>
	)
}

export default Top
