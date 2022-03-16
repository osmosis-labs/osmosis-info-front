import { makeStyles } from "@material-ui/core"
import ButtonGroup from "../../buttonGroup/ButtonGroup"

const useStyles = makeStyles((theme) => {
	return {
		groupButton: {
			marginBottom: theme.spacing(1),
		},
	}
})

const ButtonsPriceV1 = ({ onChangeRange, range }) => {
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
					id: "1mo",
					name: "1M",
					onClick: () => {
						onChangeRange("1mo")
					},
				},
				{
					id: "1y",
					name: "1Y",
					onClick: () => {
						onChangeRange("1y")
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

export default ButtonsPriceV1
