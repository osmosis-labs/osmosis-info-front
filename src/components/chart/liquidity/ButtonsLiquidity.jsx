import { makeStyles } from "@material-ui/core"
import ButtonGroup from "../../buttonGroup/ButtonGroup"

const useStyles = makeStyles((theme) => {
	return {
		groupButton: {
			marginBottom: theme.spacing(1),
		},
	}
})

const ButtonsLiquidity = ({ onChangeRange, range }) => {
	const classes = useStyles()

	return (
		<ButtonGroup
			className={classes.groupButton}
			buttons={[
				{
					id: "d",
					name: "D",
					onClick: () => {
						onChangeRange("d")
					},
				},
				{
					id: "w",
					name: "W",
					onClick: () => {
						onChangeRange("w")
					},
				},
				{
					id: "m",
					name: "M",
					onClick: () => {
						onChangeRange("m")
					},
				},
			]}
			active={range}
		/>
	)
}

export default ButtonsLiquidity
