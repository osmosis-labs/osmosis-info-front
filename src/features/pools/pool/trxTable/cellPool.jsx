import { makeStyles, Popover, TableCell } from "@material-ui/core"
import { useState } from "react"
import Image from "../../../../components/image/Image"
import Paper from "../../../../components/paper/Paper"
import PopoverPool from "./popoverPool"
const useStyles = makeStyles((theme) => {
	return {
		rootCellPool: {
			display: "flex",
			alignItems: "center",
			pointerEvents: "none",
			width: "200px",
			overflow: "hidden",
			textOverflow: "ellipsis",
		},
		imagesContainer: {
			display: "flex",
			alignItems: "center",
			pointerEvents: "none",
		},
		image: {
			height: "20px",
		},
		poolName: {
			paddingLeft: "5px",
			pointerEvents: "none",
		},
		poolBadge: {
			pointerEvents: "none",
			backgroundColor: theme.palette.table.badgeBackground,
			color: theme.palette.table.badgeText,
			borderRadius: "16px",
			fontSize: "10px",
			padding: "1px 6px",
			marginLeft: "5px",
		},
	}
})
const CellPool = ({ cellKey, cellConfig, data }) => {
	const classes = useStyles()
	const [event, setEvent] = useState(null)
	let currentData = data[cellConfig.cellKey]

	const onOpen = (event) => {
		setEvent(event)
	}

	const onClose = (event) => {
		setEvent(null)
	}

	const open = Boolean(event)

	return (
		<TableCell key={cellKey} onMouseEnter={onOpen} onMouseLeave={onClose} style={{ width: "200px", boxSizing: "border-box" }}>
			<div className={classes.rootCellPool}>
				<div className={classes.imagesContainer}>
					{currentData.images.map((image, index) => {
						return (
							<Image
								key={index}
								className={`${classes.image}`}
								assets={true}
								src={image}
								srcFallback="../assets/default.png"
								pathAssets=""
							/>
						)
					})}
				</div>
				<span className={classes.poolName}>{currentData.name}</span>
				{currentData.routes.length > 1 ? <span className={classes.poolBadge}>+{currentData.routes.length}</span> : null}
				{currentData.routes.length > 1 ? (
					<PopoverPool
						routes={currentData.routes}
						open={open}
						onClose={onClose}
						event={event}
						key={cellKey + "ppover"}
						id={cellKey + "pop"}
					/>
				) : null}
			</div>
		</TableCell>
	)
}

export default CellPool
