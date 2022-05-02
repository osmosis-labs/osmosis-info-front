import { makeStyles } from "@material-ui/core"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
const useStyles = makeStyles((theme) => {
	return {
		rootButtonCSV: {
			transition: "all 0.3s ease-in-out",
			padding: "6px 12px",
			margin: "4px",
			borderRadius: "4px",
			border: "none",
			cursor: "pointer",
			backgroundColor: theme.palette.yellowButton.background,
			color: theme.palette.yellow.gold,
			border: `1px solid ${theme.palette.yellow.gold}`,
			display: "flex",
			alignItems: "center",

			"&:hover": {
				backgroundColor: theme.palette.yellowButton.backgroundHover,
			},

			[theme.breakpoints.down("xs")]: {},
		},
		disabled:{
			opacity: 0.5,
			cursor: "not-allowed",
		},
		icon: {
			marginRight: "4px",
		},
	}
})
const ButtonCSV = ({ onClick, children, className, disabled }) => {
	const classes = useStyles()
	let classButton = `${classes.rootButtonCSV} ${className}`
	if (disabled) {
		classButton = `${classes.rootButtonCSV} ${className} ${classes.disabled}`
	}

	return (
		<button className={classButton} onClick={disabled?null:onClick}>
			<FileDownloadIcon className={classes.icon} />
			{children}
		</button>
	)
}

export default ButtonCSV
