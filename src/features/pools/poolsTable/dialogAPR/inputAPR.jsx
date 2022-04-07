import { makeStyles } from "@material-ui/core"
import { useState, useEffect } from "react"
import SwapVertIcon from "@mui/icons-material/SwapVert"
import { usePrices } from "../../../../contexts/PricesProvider"
import { formateNumberDecimalsAuto } from "../../../../helpers/helpers"

const useStyles = makeStyles((theme) => {
	return {
		rootInputAPR: {
			display: "flex",
			flexDirection: "column",
		},
		label: {
			color: theme.palette.primary.contrastText,
			fontSize: "0.9rem",
			margin: "10px 0",
		},
		containerInput: {
			padding: "10px 10px",
			display: "grid",
			alignItems: "center",
			gridTemplateColumns: "1fr 30px",
			borderRadius: "20px",
			boxShadow: "inset 0 1px 3px rgba(0,0,0,0.12),inset  0 1px 2px rgba(0,0,0,0.24)",
			backgroundColor: theme.palette.primary.dark,
		},
		containerValue: {},
		row: {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
			marginRight: "8px",
			color: theme.palette.gray.textDark,
		},
		input: {
			backgroundColor: theme.palette.primary.dark,
			border: "none",
			maxWidth: "250px",
			textAlign: "right",
			marginRight: "6px",
			color: theme.palette.gray.textDark,
			fontSize: "1.2rem",
			padding: "8px 0",
			outline: "none",
		},
		inputCurrency: {
			fontSize: "1.2rem",
		},
		otherValue: {
			fontSize: "0.8rem",
		},
		iconSwap: {
			color: theme.palette.gray.textDark,
			cursor: "pointer",
			transition: "all 0.3s !important",
		},
        iconSwapRotated:{
            transform: "rotate(180deg)"
        }
	}
})
const InputAPR = ({ onChange, value, swapIsOsmos }) => {
	const classes = useStyles()
	const { priceOsmoBrut } = usePrices()
	const [valueUSD, setValueUSD] = useState(0)
	const [valueOSMO, setValueOSMO] = useState(0)

	const convertToUSD = (value) => {
		return value * priceOsmoBrut
	}
	const convertToOSMO = (value) => {
		return value / priceOsmoBrut
	}

	useEffect(() => {
		if (swapIsOsmos) {
			setValueOSMO(value)
			setValueUSD(convertToUSD(value))
		} else {
			setValueOSMO(convertToOSMO(value))
			setValueUSD(value)
		}
	}, [value, swapIsOsmos])

	const onClickSwap = () => {
		if (swapIsOsmos) {
			onChange(parseFloat(formateNumberDecimalsAuto({ price: valueUSD }).replace(',', '')), !swapIsOsmos)
		} else {
			onChange(parseFloat(formateNumberDecimalsAuto({ price: valueOSMO }).replace(',', '')), !swapIsOsmos)
		}
	}

	const onInputChange = (e) => {
		let currentValue = e.target.value
		onChange(currentValue)
	}

	let currentValue = swapIsOsmos ? valueOSMO : valueUSD
	let currentCurrency = swapIsOsmos ? "OSMO" : "USD"
	let otherValue = !swapIsOsmos
		? formateNumberDecimalsAuto({ price: valueOSMO })
		: formateNumberDecimalsAuto({ price: valueUSD })
	let otherCurrency = !swapIsOsmos ? "OSMO" : "USD"

	return (
		<div className={classes.rootInputAPR}>
			<p className={classes.label}>Staked OSMO</p>
			<div className={classes.containerInput}>
				<div className={classes.containerValue}>
					<div className={classes.row}>
						<input className={classes.input} type="text" onChange={onInputChange} value={currentValue} />
						<span className={`${classes.inputCurrency}`}> {currentCurrency}</span>
					</div>
					<div className={classes.row}>
						<p className={classes.otherValue}>
							{otherValue} {otherCurrency}
						</p>
					</div>
				</div>
				<SwapVertIcon className={`${classes.iconSwap} ${swapIsOsmos?classes.iconSwapRotated:null}`} onClick={onClickSwap} />
			</div>
		</div>
	)
}

export default InputAPR
