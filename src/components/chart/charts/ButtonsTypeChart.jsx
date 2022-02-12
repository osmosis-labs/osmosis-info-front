import { makeStyles } from "@material-ui/core"
import ButtonGroup from "../../buttonGroup/ButtonGroup"

const useStyles = makeStyles((theme) => {
	return {
		groupButton: {
			marginBottom: theme.spacing(1),
		},
	}
})

const ButtonsTypeChart = ({ onChangeType, type }) => {
	const classes = useStyles()

	return (
		<ButtonGroup
			className={classes.groupButton}
			buttons={[
				{
					id: "price",
					name: "Price",
					onClick: () => {
						onChangeType("price")
					},
				},
				{
					id: "volume",
					name: "Volume",
					onClick: () => {
						onChangeType("volume")
					},
				},
				{
					id: "liquidity",
					name: "Liquidity",
					onClick: () => {
						onChangeType("liquidity")
					},
				},
			]}
			active={type}
		/>
	)
}

export default ButtonsTypeChart
