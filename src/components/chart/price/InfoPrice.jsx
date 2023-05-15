import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import {
	formatDateHours,
	formateNumberDecimals,
	formateNumberDecimalsAuto,
	formateNumberPrice,
	getDates,
	isToDay,
	isValidDate,
	timeToDate,
	twoNumber,
} from "../../../helpers/helpers"

const useStyles = makeStyles((theme) => {
	return {
		headerInfo: {
			padding: "0 0 0 2px",
			display: "flex",
			flexDirection: "column",
		},
		currentTitle: {},
		currentInfo: {
			fontSize: theme.fontSize.veryBig,
			color: theme.palette.gray.contrastText,
			fontVariantNumeric: "tabular-nums",
			margin: "4px 0",
		},
		currentSubInfo: {
			fontSize: "12px",
		},
	}
})

const InfoPrice = ({ title, data, range, currency = { before: true, value: "$" } }) => {
	const classes = useStyles()
	const [currentInfo, setCurrentInfo] = useState({
		value: 0,
		date: "-",
	})

	useEffect(() => {
		formatItem(data, range)
	}, [data, range])

	const formatItem = (item, range) => {
		if (item.time) {
			let formated = { value: item.value?.close, date: timeToDate(item.time) }
			setInfo(formated, range)
		}
	}

	const setInfo = (item, range) => {
		let value = `${formatPriceForDisplay(item.value)}`
		if (currency.before) {
			value = `${currency.value}${value}`
		} else {
			value = `${value} ${currency.value}`
		}
		setCurrentInfo({
			value,
			date: formatDateForDisplay(item.date, range),
		})
	}

	const formatPriceForDisplay = (price) => {
		return formateNumberDecimalsAuto({ price })
	}

	const formatDateForDisplay = (date, range) => {
		if (range && range === 1440 && isToDay(date)) {
			return "Last 24 hours"
		}
		return formatDateHours(date)
	}

	return (
		<div className={classes.headerInfo}>
			<p className={classes.title}>{title}</p>
			<p className={classes.currentInfo}>{currentInfo.value}</p>
			<p className={classes.currentSubInfo}>{currentInfo.date}</p>
		</div>
	)
}

export default InfoPrice
