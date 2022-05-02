import { makeStyles, Popover } from "@material-ui/core"
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
				{types.map((type, index) => {
					return (
						<div key={id + "type" + index} className={classes.row}>
							<span className={classes.type}>{type.display}</span>
						</div>
					)
				})}
			</Paper>
		</Popover>
	)
}

export default PopoverTypes
