import { makeStyles } from "@material-ui/core"
import LockIcon from "@mui/icons-material/Lock"
const useStyles = makeStyles((theme) => {
	return {
		rootTypes: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			overflow: "hidden",
			flexWrap: "wrap",
			marginBottom: "20px",
			[theme.breakpoints.down("xs")]: {},

		},
		type: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			padding: "4px 8px",
			margin: "4px 8px",
			backgroundColor: theme.palette.primary.main,
			borderRadius: "20px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            border: "1px solid transparent",
		},
		typeSelected: {
			backgroundColor: theme.palette.primary.light,
            border: `1px solid ${theme.palette.yellow.gold}`,

		},
		icon: {
			marginRight: "8px",
		},
		iconIn: {
			color: theme.palette.green.text,
		},
		iconOut: {
			color: theme.palette.error.main,
		},
	}
})
const Types = ({ types, onChangeType, currentType }) => {
	const classes = useStyles()

	return (
		<div className={classes.rootTypes}>
			{types.map((type, index) => {
				let classIcon = classes.icon
				return (
					<div
						className={currentType === type.type ? `${classes.type} ${classes.typeSelected}` : classes.type}
						key={type.type}
						onClick={() => {
							onChangeType(type.type)
						}}
					>
						<LockIcon className={classIcon} />
						{type.type} ({type.count})
					</div>
				)
			})}
		</div>
	)
}

export default Types
