import { makeStyles } from "@material-ui/core"
const useStyles = makeStyles((theme) => {
	return {
		root: {
			fontSize: "12px",
			color: theme.palette.gray.contrastText,
			fontStyle: "italic",
			opacity: "0.8",
			// do a beautiful hover effect
			"& a": {
				color: theme.palette.yellow.gold,
				textDecoration: "none",
				cursor: "pointer",
				transition: "all 0.2s",
				"&:hover": {
					color: theme.palette.yellow.hover,
				},
			},
		},
		madeFixeRoot: {
			position: "fixed",
			bottom: "0",
			zIndex: theme.zIndex.appBar,
			height: "30px",
		},
		madeFixeContent: {
			position: "relative",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",

			justifyContent: "center",
			height: "100%",
			backgroundColor: theme.palette.primary.dark,
			maxWidth: "100%",
			width: "100vw",

			fontSize: theme.fontSize.small,
		},
	}
})
export const MadeSimpleText = () => {
	const classes = useStyles()

	return (
		<p className={classes.root}>
			made with ❤️ by{" "}
			<a href="https://imperator.co/" target="_blank">
				Imperator.co
			</a>
		</p>
	)
}

export const MadeFixe = () => {
	const classes = useStyles()
	return (
		<div className={classes.madeFixeRoot}>
			<div className={classes.madeFixeContent}>
				<MadeSimpleText />
			</div>
		</div>
	)
}
