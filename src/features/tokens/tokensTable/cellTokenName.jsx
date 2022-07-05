import { makeStyles, TableCell } from "@material-ui/core"
import Image from "../../../components/image/Image"
import { useAssets } from "../../../hooks/data/assets.hook"
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
			height: "36px",
			[theme.breakpoints.down("xs")]: {
				gridTemplateColumns: "60px 100px",
				fontSize: "12px  !important",
			},
		},
		image: {
			width: "34px",
			marginRight: theme.spacing(1),
			marginLeft: theme.spacing(1),
			position: "absolute",
			padding: "2px",
			top: "-50%",
			[theme.breakpoints.down("xs")]: {
				width: "34px",
				top: "-50%",
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
	const { data: assets } = useAssets()
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
						src={assets[data.symbol]?.image}
						srcFallback="../assets/default.png"
						pathAssets=""
					/>
				</div>
				<p className={classes.name}>
					{currentData} <em className={classes.symbolName}>({data.symbolDisplay})</em>
				</p>
			</div>
		</TableCell>
	)
}

export default CellTokenName
