import { makeStyles, TableCell } from "@material-ui/core"
import { useState } from "react"
import PopoverTypes from "./popoverType"
const useStyles = makeStyles((theme) => {
	return {
		rootAttributType: {
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
			fontSize: "12px",
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
const AttributType = ({ data, config, itemConfig, itemKey }) => {
	const classes = useStyles()
	const [event, setEvent] = useState(null)

	const onOpen = (event) => {
		setEvent(event)
	}

	const onClose = (event) => {
		setEvent(null)
	}

	const open = Boolean(event)
	return (
		<div className={classes.rootAttributType} onMouseEnter={onOpen} onMouseLeave={onClose}>
			<span className={classes.type} >
				{data.types[0].display}
			</span>
			{data.types.length > 1 ? <span className={classes.more}>+{data.types.length}</span> : null}
			{data.types.length > 1 ? (
				<PopoverTypes types={data.types} open={open} onClose={onClose} event={event} id={itemKey + "poptype"} />
			) : null}
		</div>
	)
}

export default AttributType
