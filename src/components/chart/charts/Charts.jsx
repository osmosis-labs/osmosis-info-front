import ChartLiquidity from "../liquidity/ChartLiquidity"
import ChartPrice from "../price/ChartPrice"
import ChartVolume from "../volume/ChartVolume"
import { makeStyles } from "@material-ui/core"
import { CSSTransitionGroup } from "react-transition-group"

const useStyles = makeStyles((theme) => {
	return {
		containerErrorChart: {
			height: "100%",
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		errorChart: {
			margin: "auto",
		},
		container:{
			height: "100%",
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		}
	}
})

const Charts = ({
	typeChart,
	dataPrice,
	dataVolume,
	dataLiquidity,
	crossMove,
	onMouseLeave,
	onClick,
	rangePrice,
	rangeVolume,
	rangeLiquidity,
}) => {
	const classes = useStyles()

	let chartRender = (
		<div className={classes.containerErrorChart} key="noChart">
			<p className={classes.errorChart}>Not enough data to display chart.</p>
		</div>
	)
	if (typeChart === "price") {
		chartRender = (
			<ChartPrice data={dataPrice} crossMove={crossMove} onMouseLeave={onMouseLeave} key={"ChartPrice" + rangePrice} />
		)
	} else if (typeChart === "volume") {
		chartRender = (
			<ChartVolume
				data={dataVolume}
				crossMove={crossMove}
				onMouseLeave={onMouseLeave}
				onClick={onClick}
				key={"ChartVolume" + rangeVolume}
			/>
		)
	} else {
		chartRender = (
			<ChartLiquidity
				data={dataLiquidity}
				crossMove={crossMove}
				onMouseLeave={onMouseLeave}
				key={"ChartLiquidity" + rangeLiquidity}
			/>
		)
	}

	return (
		<CSSTransitionGroup transitionName="fade" className={classes.container} transitionEnterTimeout={300} transitionLeaveTimeout={300}>
			{chartRender}
		</CSSTransitionGroup>
	)
}

export default Charts
