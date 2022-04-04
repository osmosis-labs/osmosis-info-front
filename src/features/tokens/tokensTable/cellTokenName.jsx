import { makeStyles, TableCell } from "@material-ui/core"
import Image from "../../../components/image/Image"
const useStyles = makeStyles((theme) => {
	return {
		rootCellTokenName: {
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
		symbolName: {
			fontStyle: "normal",
			color: theme.palette.gray.dark,
			paddingLeft: theme.spacing(1),
		},
	}
})
const CellTokenName = ({ cellKey, cellConfig, data }) => {
	const classes = useStyles()
	let currentData = data[cellConfig.cellKey]
	return (
		<TableCell
			key={cellKey}
			onClick={() => {
				cellConfig.onClickCell(data)
			}}
		>
			<div className={classes.rootCellTokenName}>
				<div className={classes.images}>
					<Image
						key={cellKey + currentData}
						className={classes.image}
						assets={true}
						alt={`${currentData}`}
						src={`https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/${data.symbol.toLowerCase()}.png`}
						srcFallback="../assets/default.png"
						pathAssets=""
					/>
				</div>
				<p className={classes.name}>
					{currentData} <em className={classes.symbolName}>({data.symbol})</em>
				</p>
			</div>
		</TableCell>
	)
}

export default CellTokenName
