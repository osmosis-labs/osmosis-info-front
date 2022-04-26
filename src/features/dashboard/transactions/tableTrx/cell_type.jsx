import { makeStyles, TableCell } from "@material-ui/core"
import { useState } from "react"
import PopoverTypes from "./popoverType"
const useStyles = makeStyles((theme) => {
	return {
		rootcellType: {
			cursor: "pointer",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
		},

		type: {
			display: "inline-block",
			pointerEvents: "none",
			backgroundColor: theme.palette.table.badgeBackground,
			color: theme.palette.table.badgeText,
			borderRadius: "16px",
			fontSize: "14px",
			padding: "2px 10px",
			marginLeft: "5px",
			maxWidth: "200px",
			overflow: "hidden",
			whiteSpace: "nowrap",
			textOverflow: "ellipsis",
			cursor: "pointer",
		},
		more: {
			pointerEvents: "none",
			color: theme.palette.table.badgeText,
			fontSize: "12px",
			padding: "1px 6px",
			marginLeft: "5px",
		},
	}
})
const cellType = ({ cellKey, cellConfig, data }) => {
	const classes = useStyles()
	const [event, setEvent] = useState(null)

	const onClick = () => {
		cellConfig.onClickCell(data)
	}

	const onOpen = (event) => {
		setEvent(event)
	}

	const onClose = (event) => {
		setEvent(null)
	}

	const open = Boolean(event)
	return (
		<TableCell key={cellKey} onClick={onClick} onMouseEnter={onOpen} onMouseLeave={onClose}>
			<div className={classes.rootcellType} onClick={onClick}>
				<span className={classes.type} onClick={onClick}>
					{data.types[0].display}
				</span>
				{data.types.length > 1 ? <span className={classes.more}>+{data.types.length}</span> : null}
				{data.types.length > 1 ? (
					<PopoverTypes
						types={data.types}
						open={open}
						onClose={onClose}
						event={event}
						key={cellKey + "ppovertype"}
						id={cellKey + "poptype"}
					/>
				) : null}
			</div>
		</TableCell>
	)
}

export default cellType
