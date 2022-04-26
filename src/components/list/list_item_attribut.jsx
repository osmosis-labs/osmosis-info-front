import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => {
	return {
		rootListItemAttribut: {
			color: theme.palette.primary.contrastText,
			transition: "all 0.3s ease !important",
			width: "100%",
			display: "flex",
			alignItems: "center",
			flexDirection: "row",
			padding: "8px 8px",
			userSelect: "none",
			[theme.breakpoints.down("xs")]: {},
		},
		alignLeft: { justifyContent: "flex-start" },
		alignRight: { justifyContent: "flex-end" },
		alignCenter: { justifyContent: "center" },
		clickable: {
			cursor: "pointer",
		},
	}
})
const ListItemAttribut = ({ data, config, itemConfig }) => {
	const classes = useStyles()
	let className = `${classes.rootListItemAttribut}`
	if (itemConfig.align === "left") className += ` ${classes.alignLeft}`
	else if (itemConfig.align === "right") className += ` ${classes.alignRight}`
	else className += ` ${classes.alignCenter}`

	if (itemConfig.onClickAttribut) className += ` ${classes.clickable}`

	if (itemConfig.bodyClass) className += ` ${itemConfig.bodyClass}`
	let currentData = itemConfig.transform ? itemConfig.transform(data[itemConfig.key]) : data[itemConfig.key]

	const onClick = (e) => {
		itemConfig.onClickAttribut(data, e)
	}

	return (
		<div className={className} onClick={itemConfig.onClickAttribut ? onClick : null}>
			{currentData}
		</div>
	)
}

export default ListItemAttribut
