import { makeStyles, TableCell } from "@material-ui/core"
import Image from "../../../../components/image/Image"
const useStyles = makeStyles((theme) => {
	return {
		rootCellPool: {
			display: "flex",
			alignItems: "center",
			pointerEvents: "none",
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

	let currentData = data[cellConfig.cellKey]
	return (
		<TableCell key={cellKey} >
			<div className={classes.rootCellPool}>
				<div className={classes.imagesContainer}>
					<Image
						className={`${classes.image}`}
						assets={true}
						src={currentData.image}
						srcFallback="../assets/default.png"
						pathAssets=""
					/>
				</div>
				<span className={classes.poolName}>{currentData.name}</span>
			</div>
		</TableCell>
	)
}

export default CellPool
