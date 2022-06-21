import { makeStyles, Popover } from "@material-ui/core"
import { useEffect } from "react"
import Image from "../../../../components/image/Image"
import Paper from "../../../../components/paper/Paper"
import { useAssets } from "../../../../hooks/data/assets.hook"
// import Popover from "../../../../components/popover/popover"
const useStyles = makeStyles((theme) => {
	return {
		rootPopoverPool: {
			display: "flex",
			alignItems: "center",
			flexDirection: "column",
			// boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
		},
		header: {
			width: "100%",
			display: "grid",
			gridTemplateColumns: "1fr 3fr",
			alignItems: "center",
			justifyContent: "space-between",
			color: theme.palette.table.cellDark,
			fontFamily: "'Poppins' !important",
			fontSize: "14px",
			lineHeight: "23px",
			borderBottom: `1px solid ${theme.palette.table.cellDark}`,
			gridGap: "10px",
			"& span": {
				padding: "0 4px",
			},
		},
		body: {
			width: "100%",
			display: "flex",
			alignItems: "center",
			flexDirection: "column",
		},
		row: {
			width: "100%",
			display: "grid",
			gridTemplateColumns: "1fr 3fr",
			gridGap: "10px",
			alignItems: "center",
			justifyContent: "space-between",
			color: theme.palette.table.cell,
			fontFamily: "'Inter' !important",
			fontSize: "12px",
			borderBottom: `1px solid ${theme.palette.table.border}`,
			lineHeight: "19px",
			padding: "8px 0",
		},
		id: {
			textAlign: "left",
			padding: "0 4px",
			marginRight: "10px",
		},
		contentRow: {
			padding: "0 4px",
			display: "flex",
			alignItems: "center",
		},

		imagesContainer: {
			display: "flex",
			alignItems: "center",
			pointerEvents: "none",
		},
		image: {
			height: "20px",
		},
		name: {
			paddingLeft: "5px",
			minWidth: "100px",
		},
		paperPopover: {
			backgroundColor: "transparent",
			borderRadius: "20px",
		},
	}
})
const PopoverPool = ({ routes, open, event, onClose, id }) => {
	const classes = useStyles()
	const { data: assets } = useAssets()

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
			{/* <Popover open={open} event={event}> */}
			<Paper className={classes.rootPopoverPool}>
				<div className={classes.header}>
					<span>#</span>
					<span>Pool</span>
				</div>
				<div className={classes.body}>
					{routes.map((route, index) => {
						let images = route.poolName.split("/").map((tokenName) => {
							return assets[tokenName]?.image
						})
						return (
							<div key={index} className={classes.row}>
								<span className={classes.id}>{route.poolId}</span>
								<div className={classes.contentRow}>
									<div className={classes.imagesContainer}>
										{images.map((image, index) => {
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
									<span className={classes.name} key={id + "route" + index}>
										{route.poolNameDisplay}
									</span>
								</div>
							</div>
						)
					})}
				</div>
			</Paper>
		</Popover>
	)
}

export default PopoverPool
