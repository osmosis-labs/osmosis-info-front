import { makeStyles } from "@material-ui/core"
import React, { useImperativeHandle, useFowardRef, useState } from "react"

const useStyles = makeStyles((theme) => {
	return {
		rowInfo: {
			margin: "4px 2px",
			display: "flex",
			flexDirection: "column",
			alignItems: "flex-start",
			justifyContent: "center",
		},
		name: {
			fontSize: "11px",
			marginBottom: "2px",
			color: theme.palette.table.cellDark,
		},
		value: {
			color: theme.palette.gray.contrastText,
		},
	}
})
const DailyReward = React.forwardRef(({ currentToken }, ref) => {
	const classes = useStyles()
	const [currentItem, setCurrentItem] = useState({ time: "-", value: "-", dayValue: "-" })
	useImperativeHandle(ref, () => ({
		updateItem: (item) => {
            setCurrentItem(item)
		},
	}))

	

	return (
		<div ref={ref} className={classes.rowInfo}>
			<p className={classes.name}>Daily reward</p>
			<p className={classes.name}>{currentItem.time}</p>
			<p className={classes.value}>
				{currentItem.dayValue} <span className={classes.token}>{currentToken.symbolDisplay}</span>
			</p>
		</div>
	)
})

export default DailyReward
