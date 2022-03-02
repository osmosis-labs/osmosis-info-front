import { makeStyles } from "@material-ui/core"
import ButtonGroup from "../../buttonGroup/ButtonGroup"

const useStyles = makeStyles((theme) => {
	return {
		groupButton: {
			marginBottom: theme.spacing(1),
		},
	}
})

const ButtonsPrice = ({ onChangeRange, range }) => {
	const classes = useStyles()

	return (
		<ButtonGroup
			className={classes.groupButton}
			buttons={[
				{
					id: 60,
					name: "1H",
					onClick: () => {
						onChangeRange(60)
					},
				},

				{
					id: 1440,
					name: "1D",
					onClick: () => {
						onChangeRange(1440)
					},
				},
				{
					id: 10800,
					name: "1W",
					onClick: () => {
						onChangeRange(10080)
					},
				},
				{
					id: 43800,
					name: "1M",
					onClick: () => {
						onChangeRange(43800)
					},
				},
			]}
			active={range}
		/>
	)
}

export default ButtonsPrice
