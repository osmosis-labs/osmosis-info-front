import { makeStyles } from "@material-ui/core"
import { useState } from "react"
import Image from "../../../../components/image/Image"
import PopoverPools from "./popover_pools"
const useStyles = makeStyles((theme) => {
	return {
		rootAttributPools: {
			display: "flex",
			alignItems: "center",
		},
		imagesContainer: {
			display: "flex",
			alignItems: "center",
		},
		image: {
			height: "20px",
		},
		poolName: {
			paddingLeft: "5px",
		},
		poolBadge: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: theme.palette.table.badgeBackground,
			color: theme.palette.table.badgeText,
			borderRadius: "16px",
			fontSize: "10px",
			padding: "1px 6px",
			marginLeft: "5px",
		},
	}
})
const AttributPools = ({ data, config, itemConfig, itemKey }) => {
	const classes = useStyles()
	const [event, setEvent] = useState(null)
	let currentData = data[itemConfig.key]
	console.log("%cattribut_pools.jsx -> 43 BLUE: data", "background: #2196f3; color:#FFFFFF", data)

	const onOpen = (event) => {
		setEvent(event)
	}

	const onClose = (event) => {
		setEvent(null)
	}
	const open = Boolean(event)
	console.log("attribut_pools.jsx -> 53: open", open  )

	return (
		<div
			className={classes.rootAttributPools}
			onMouseEnter={onOpen}
			onMouseLeave={onClose}
			onClick={itemConfig.onClickAttribut ? onClick : null}
		>
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
				<PopoverPools
					routes={currentData.routes}
					open={open}
					onClose={onClose}
					event={event}
					key={itemKey + "ppover"}
					id={itemKey + "pop"}
				/>
			) : null}
		</div>
	)
}

export default AttributPools
