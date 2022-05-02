import { makeStyles } from "@material-ui/core"
import { useEffect } from "react"
import Paper from "../../../../components/paper/Paper"
import { useDashboard } from "../../../../contexts/dashboard.provider"
import ButtonChart from "./button_chart"
import ListExposure from "./list_exposure"

const useStyles = makeStyles((theme) => {
	return {
		rootInfo: {
			[theme.breakpoints.down("xs")]: {},
		},
		containerList: {
            overflowY: "auto",
            margin: "4px 0",
			maxHeight: "72%",
		},
	}
})
const Info = ({ onChangeExposure, currentExposure, currentList }) => {
	const classes = useStyles()

	return (
		<div className={classes.rootInfo}>
			<div className={classes.buttonContainer}>
				<ButtonChart type={currentExposure} onChangeType={onChangeExposure} />
			</div>
			<div className={classes.containerList}>
				<ListExposure data={currentList} />
			</div>
		</div>
	)
}

export default Info
