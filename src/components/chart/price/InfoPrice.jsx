import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import { formatDateHours, formateNumberDecimals, formateNumberPrice, getDates, isValidDate, timeToDate, twoNumber } from "../../../helpers/helpers"

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

const InfoPrice = ({ title, data, range }) => {
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

	const setInfo = (item) => {
		setCurrentInfo({
			value: "$"+formatPriceForDisplay(item.value),
			date: formatDateForDisplay(item.date),
		})
	}

	const formatPriceForDisplay = (price) => {
		return formateNumberDecimals(price, 2)
	}

	const formatDateForDisplay = (date) => {
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
