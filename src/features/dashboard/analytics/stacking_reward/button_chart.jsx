import { makeStyles } from "@material-ui/core"
import ButtonGroup from "../../../../components/buttonGroup/ButtonGroup"

const useStyles = makeStyles((theme) => {
	return {
		groupButton: {
			marginBottom: theme.spacing(1),
		},
	}
})

const ButtonChart = ({ onChangeRange, range }) => {
	const classes = useStyles()

	return (
		<ButtonGroup
			className={classes.groupButton}
			buttons={[
				{
					id: "7d",
					name: "7D",
					onClick: () => {
						onChangeRange("7d")
					},
				},

				{
					id: "3m",
					name: "3M",
					onClick: () => {
						onChangeRange("3m")
					},
				},
				{
					id: "all",
					name: "All",
					onClick: () => {
						onChangeRange("all")
					},
				},
			]}
			active={range}
		/>
	)
}

export default ButtonChart
