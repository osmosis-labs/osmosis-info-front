import { makeStyles } from "@material-ui/core"
import ButtonGroup from "../../components/buttonGroup/ButtonGroup"

const useStyles = makeStyles((theme) => {
	return {
		groupButton: {
			marginBottom: theme.spacing(1),
		},
	}
})

const ButtonsLiquidityType = ({ onChangeRange, range }) => {
	const classes = useStyles()

	return (
		<ButtonGroup
			className={classes.groupButton}
			buttons={[
				{
					id: "usd",
					name: "USD",
					onClick: () => {
						onChangeRange("usd")
					},
				},
				{
					id: "atom",
					name: "ATOM",
					onClick: () => {
						onChangeRange("atom")
					},
				},
				{
					id: "osmo",
					name: "OSMO",
					onClick: () => {
						onChangeRange("osmo")
					},
				},
			]}
			active={range}
		/>
	)
}

export default ButtonsLiquidityType
