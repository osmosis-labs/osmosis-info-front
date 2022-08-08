import { InputBase, makeStyles, MenuItem } from "@material-ui/core"
import { styled } from "@material-ui/styles"
import { Select } from "@mui/material"
import Image from "../../../../components/image/Image"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import { getImageFromAsset, useAssets } from "../../../../hooks/data/assets.hook"
const useStyles = makeStyles((theme) => {
	return {
		rootSelectToken: {
			width: "100%",
			margin: "8px 0",

			[theme.breakpoints.down("xs")]: {},
		},
		container: {
			display: "flex",
			alignItems: "center",
			color: theme.palette.primary.contrastText,
			backgroundColor: `${theme.palette.primary.dark} !important`,
		},
		image: {
			width: "20px",
			marginRight: "4px",
		},
		paper: {
			backgroundColor: `${theme.palette.primary.dark} !important`,
		},
		label: {
			color: theme.palette.table.cellDark,
			fontSize: "14px",
			paddingBottom: "6px",
		},
	}
})

const BootstrapInput = styled(InputBase)(({ theme }) => ({
	"label + &": {},
	"& .MuiInputBase-input": {
		color: `${theme.palette.primary.contrastText} !important`,
		outline: "none",
		borderRadius: 4,
		position: "relative",
		backgroundColor: theme.palette.primary.dark,
		border: "none",
		fontSize: 16,
		padding: "16px 30px 10px 12px",
		transition: theme.transitions.create(["border-color", "box-shadow"]),
		"&:focus": {},
	},
	"& 	.MuiSelect-icon": {
		color: `${theme.palette.primary.contrastText} !important`,
		transform: "rotate(-90deg) translate(-3px, 2px) !important",
		width: "20px !important",
		height: "20px !important",
	},
}))

const SelectToken = ({ tokens, currentToken, onChangeToken }) => {
	const classes = useStyles()
	const { data: assets } = useAssets()

	const onChange = (event) => {
		onChangeToken(event.target.value)
	}

	return (
		<div className={classes.rootSelectToken}>
			<p className={classes.label}>Select asset</p>
			<Select
				value={currentToken}
				label="Select asset"
				onChange={onChange}
				MenuProps={{ classes: { paper: classes.paper } }}
				input={<BootstrapInput />}
				IconComponent={ArrowBackIosNewIcon}
			>
				{tokens.map((token) => {
					const image = getImageFromAsset(assets, token)

					return (
						<MenuItem className={classes.container} key={token.symbol} value={token} classes={{ root: classes.paper }}>
							<div className={classes.container}>
								<Image
									className={`${classes.image}`}
									assets={true}
									src={image}
									srcFallback="../assets/default.png"
									pathAssets=""
								/>
								{token.symbolDisplay}
							</div>
						</MenuItem>
					)
				})}
			</Select>
		</div>
	)
}

export default SelectToken
