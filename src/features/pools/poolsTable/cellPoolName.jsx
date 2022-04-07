import { makeStyles, TableCell } from "@material-ui/core"
import Image from "../../../components/image/Image"
const useStyles = makeStyles((theme) => {
	return {
		rootCellPoolName: {
			display: "grid",
			gridTemplateColumns: "60px 200px",
			textOverflow: "ellipsis",
			overflow: "hidden",
			whiteSpace: "nowrap",
            cursor: "pointer",
			fontSize: "16px !important",
			alignItems: "center",
			height: "30px",
			[theme.breakpoints.down("xs")]: {
				gridTemplateColumns: "60px 100px",
			},
		},
		image: {
			width: "30px",
			marginRight: theme.spacing(1),
			marginLeft: theme.spacing(1),
			position: "absolute",
			top: "-50%",
			[theme.breakpoints.down("xs")]: {
				width: "20px",
				top: "0%",
			},
		},
		images: {
			padding: theme.spacing(1),
			position: "relative",
		},

		name: {
			textOverflow: "ellipsis",
			overflow: "hidden",
			whiteSpace: "nowrap",
		},
	}
})
const CellPoolName = ({ cellKey, cellConfig, data }) => {
	const classes = useStyles()
	let currentData = data[cellConfig.cellKey]
	return (
		<TableCell
			key={cellKey}
			onClick={() => {
				cellConfig.onClickCell(data)
			}}
		>
			<div className={classes.rootCellPoolName}>
				<div className={classes.images}>
					{currentData
						.split("-")
						.slice(0, 2)
						.map((name, index) => {
							return (
								<Image
									style={{ left: index * 18 + "px" }}
									key={cellKey + name}
									className={classes.image}
									assets={true}
									alt={`${name}`}
									src={`https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/${name.toLowerCase()}.png`}
									srcFallback="../assets/default.png"
									pathAssets=""
								/>
							)
						})}
				</div>
				<p className={classes.name}>{currentData}</p>
			</div>
		</TableCell>
	)
}

export default CellPoolName
