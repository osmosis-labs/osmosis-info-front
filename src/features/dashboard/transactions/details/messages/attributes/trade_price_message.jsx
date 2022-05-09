import { makeStyles } from "@material-ui/core"
import { capitalizeFirstLetter, formateNumberDecimalsAuto } from "../../../../../../helpers/helpers"

const useStyles = makeStyles((theme) => {
	return {
		rootTradePriceMessage: {
			display: "flex",
			flexDirection: "row",
			width: "100%",
			alignContent: "center",
			justifyContent: "space-between",
			margin: "6px 0",
			[theme.breakpoints.down("xs")]: {},
		},
		name: {
			fontSize: "12px",
			color: theme.palette.primary.contrastText,
			display: "flex",
			flexDirection: "column",
			alignItems: "flex-start",
			justifyContent: "center",
		},
		firstNumber: {
			fontSize: "13px",
		},
		restNumber: {
			fontSize: "11px",
		},
		symbol: {
			paddingLeft: "5px",
			color: theme.palette.table.cellDark,
			fontSize: "12px",
			maxWidth: "75px",
			overflow: "hidden",
			textOverflow: "ellipsis",
			display: "inline-block",
		},
		price: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
		},
	}
})
const TradePriceMessage = ({ denom, name, amount }) => {
	const classes = useStyles()

	let splitNumber = formateNumberDecimalsAuto({ price: amount }).toString().split(".")

	return (
		<div className={`${classes.rootTradePriceMessage}`}>
			<p className={classes.name}>{name}</p>
			<p className={classes.price}>
				$<span className={classes.firstNumber}>{splitNumber[0]}</span>
				{splitNumber.length > 1 ? <span className={classes.restNumber}>.{splitNumber[1]}</span> : null}
				{/* {usd ? <span className={classes.symbol}>$(~{usd})</span> : null} */}
			</p>
		</div>
	)
}

export default TradePriceMessage
