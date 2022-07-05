import { makeStyles } from "@material-ui/core"
import CachedIcon from "@mui/icons-material/Cached"
const useStyles = makeStyles((theme) => {
	return {
		rootListFooter: {
			marginTop: "8px",
			padding: "8px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			width: "100%",
			[theme.breakpoints.down("xs")]: {},
		},
		button: {
			cursor: "pointer",
			userSelect: "none",
			transition: "all 0.3s ease",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			"&:hover": {
				color: theme.palette.primary.contrastText,
			},
		},
		buttonDisabled: {
			cursor: "no-drop",
			"&:hover": {
				color: theme.palette.gray.main,
			},
			icon: {
				marginRight: "8px",
				color: theme.palette.gray.main,
			},
		},

		icon: {
			marginRight: "8px",
			color: theme.palette.primary.contrastText,
		},
		iconLoad: {
			animation: "$rotate 1s infinite linear",
		},

		"@keyframes rotate": {
			from: { transform: "rotate(0deg)" },
			to: { transform: "rotate(-360deg)" },
		},
	}
})
const ListFooter = ({ onLoadMore, isLoading }) => {
	const classes = useStyles()

	return (
		<div className={classes.rootListFooter}>
			<div
				className={onLoadMore ? classes.button : `${classes.button} ${classes.buttonDisabled}`}
				onClick={!isLoading && onLoadMore ? onLoadMore : null}
			>
				<CachedIcon className={isLoading ? `${classes.icon} ${classes.iconLoad}` : classes.icon} />
				<p>{isLoading ? "Loading ..." : "Load more"}</p>
			</div>
		</div>
	)
}

export default ListFooter
