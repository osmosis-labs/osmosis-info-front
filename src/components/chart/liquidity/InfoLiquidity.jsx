import { makeStyles } from "@material-ui/core"
import { useCallback, useEffect, useState } from "react"
import {
	formatDate,
	formateNumberDecimals,
	formateNumberPrice,
	formateNumberPriceDecimals,
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

const InfoLiquidity = ({ title, data, range, currency = { value: "$", before: true } }) => {
	const classes = useStyles()
	const [currentInfo, setCurrentInfo] = useState({
		price: 0,
		date: "-",
	})

	useEffect(() => {
		formatItem(data, range)
	}, [data, range])

	const formatItem = (item, range) => {
		if (item.time) {
			let formated = { price: item.value, date: timeToDate(item.time) }
			setInfo(formated, range)
		}
	}

	const setInfo = (item, range) => {
		setCurrentInfo({
			price: formatPriceForDisplay(item.price),
			date: formatDateForDisplay(item.date, range),
		})
	}

	const formatPriceForDisplay = (price) => {
		let value = formateNumberDecimals(price, 0)
		if (currency.before) {
			value = `${currency.value}${value}`
		} else {
			value = `${value} ${currency.value}`
		}
		return value
	}

	const formatDateForDisplay = (date, range) => {
		if (range && range !== "d") {
			let dates = getDates(date, range)
			return `${formatDate(dates[0])} - ${formatDate(dates[1])}`
		} else if (range && range === "d" && isToDay(date)) {
			return "Last 24 hours"
		}
		return formatDate(date)
	}

	return (
		<div className={classes.headerInfo}>
			<p className={classes.title}>{title}</p>
			<p className={classes.currentInfo}>{currentInfo.price}</p>
			<p className={classes.currentSubInfo}>{currentInfo.date}</p>
		</div>
	)
}

export default InfoLiquidity
