import { makeStyles } from "@material-ui/core"
import { useEffect } from "react"
import Paper from "../../../../components/paper/Paper"
import { useDashboard } from "../../../../contexts/dashboard.provider"
import { formaterNumber, getPercent } from "../../../../helpers/helpers"
import ButtonChart from "./button_chart"

const useStyles = makeStyles((theme) => {
	return {
		rootListExposure: {
			display: "flex",
			flexDirection: "column",
			[theme.breakpoints.down("xs")]: {},
		},
		item: {
			margin: "8px 2px",
			display: "grid",
			gridTemplateColumns: "15px 1.5fr 1fr 0.8fr",
			alignItems: "center",
		},
		data: {
			margin: "0 4px",
			fontSize: "14px",
			color: theme.palette.primary.contrastText,
		},
		percent: {
			justifySelf: "end",
		},
		buble: {
			width: "10px",
			height: "10px",
			borderRadius: "50%",
		},
	}
})
const ListExposure = ({ data }) => {
	const classes = useStyles()

	return (
		<div className={classes.rootListExposure}>
			{data.map((item, index) => {
				return (
					<div key={index} className={classes.item}>
						<span className={classes.buble} style={{ backgroundColor: item.color }} />
						<span className={`${classes.data} ${classes.data}`}>{item.name}</span>
						<span className={`${classes.data} ${classes.data}`}>${formaterNumber(item.value)}</span>
						<span className={`${classes.data} ${classes.percent}`}>{getPercent(item.percent)}</span>
					</div>
				)
			})}
		</div>
	)
}

export default ListExposure
