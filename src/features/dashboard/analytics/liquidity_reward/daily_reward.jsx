import { makeStyles } from "@material-ui/core"
import React, { useImperativeHandle, useFowardRef, useState } from "react"
import CustomSkeleton from "../../../../components/skeleton/custom_skeleton"

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
const DailyReward = React.forwardRef(({ currentToken, isLoading }, ref) => {
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
			{isLoading ? (
				<CustomSkeleton
					height={30}
					width={80}
					sx={{ margin: "0px", padding: "0px", transformOrigin: "0 20% !important" }}
				/>
			) : (
				<>
					<p className={classes.name}>{currentItem.time}</p>
					<p className={classes.value}>
						{currentItem.dayValue} <span className={classes.token}>{currentToken.symbolDisplay}</span>
					</p>
				</>
			)}
		</div>
	)
})

export default DailyReward
