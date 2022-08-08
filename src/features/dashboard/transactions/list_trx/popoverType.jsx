import { makeStyles, Popover } from "@material-ui/core"
import { useEffect, useState } from "react"
import Paper from "../../../../components/paper/Paper"

const useStyles = makeStyles((theme) => {
	return {
		rootPopoverTypes: {
			display: "flex",
			flexDirection: "column",
		},
		row: {
			display: "flex",
			color: theme.palette.table.cell,
			fontSize: "12px",
			margin: "2px 0",
		},
		type: {
			margin: "2px 0",
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
		paperPopover: {
			backgroundColor: "transparent",
			borderRadius: "20px",
		},
	}
})
const PopoverTypes = ({ types, open, event, onClose, id }) => {
	const classes = useStyles()
	const [typesAggregated, setTypesAggregated] = useState({})

	useEffect(() => {
		if (types.length > 0) {
			let aggregated = {}
			types.forEach((type) => {
				if (aggregated[type.value]) {
					aggregated[type.value].nb++
				} else {
					aggregated[type.value] = { ...type, nb: 1 }
				}
			})
			setTypesAggregated((t) => aggregated)
		}
	}, [types])
	return (
		<Popover
			id={id + "p"}
			open={open}
			anchorEl={event?.target}
			onClose={onClose}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "center",
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "center",
			}}
			style={{ pointerEvents: "none" }}
			PaperProps={{ className: classes.paperPopover }}
		>
			<Paper className={classes.rootPopoverTypes}>
				{Object.keys(typesAggregated).map((key, index) => {
					let type = typesAggregated[key]
					return (
						<div key={id + "type" + index} className={classes.row}>
							<span className={classes.type}>
								{type.display}
								{type.nb > 1 ? ` (${type.nb})` : null}
							</span>
						</div>
					)
				})}
			</Paper>
		</Popover>
	)
}

export default PopoverTypes
