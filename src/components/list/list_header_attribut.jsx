import { makeStyles } from "@material-ui/core"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import { useEffect, useState } from "react"

const useStyles = makeStyles((theme) => {
	return {
		rootListHeaderAttribut: {
			color: theme.palette.table.cellDark,
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
		sortable: {
			cursor: "pointer",
		},
		sorted: {
			color: theme.palette.primary.contrastText,
		},
		icon: {
			opacity: 0,
			marginRight: "4px",
			marginLeft: "4px",
			fontSize: "1.1rem !important",
			transition: "all 0.3s ease !important",
		},
		iconShow: {
			opacity: 1,
		},
		iconUp: {
			transform: "rotate(180deg)",
		},
	}
})
const ListHeaderAttribut = ({ config, itemConfig, onSort, orderBy, order }) => {
	const classes = useStyles()
	const [className, setClassName] = useState(`${classes.rootListHeaderAttribut}`)
	const [classNameIcon, setClassNameIcon] = useState(`${classes.icon}`)

	useEffect(() => {
		let className = `${classes.rootListHeaderAttribut}`
		let classNameIcon = `${classes.icon}`
		if (itemConfig.align === "left") className += ` ${classes.alignLeft}`
		else if (itemConfig.align === "right") className += ` ${classes.alignRight}`
		else className += ` ${classes.alignCenter}`

		if (itemConfig.sortable) className += ` ${classes.sortable}`
		if (itemConfig.sortable && orderBy === itemConfig.key) {
			className += ` ${classes.sorted}`
			classNameIcon += ` ${classes.iconShow}`
		}

		if (itemConfig.sortable && orderBy === itemConfig.key && order === "asc") classNameIcon += ` ${classes.iconUp}`

		if (itemConfig.headerClass) className += ` ${itemConfig.headerClass}`

		setClassName(className)
		setClassNameIcon(classNameIcon)
	}, [itemConfig, order, orderBy])

	const onClickSort = () => {
		onSort(itemConfig)
	}

	return (
		<div className={className} onClick={itemConfig.sortable ? onClickSort : null}>
			{itemConfig.sortable && !itemConfig.align === "left" ? <ArrowDownwardIcon className={classNameIcon} /> : null}
			{itemConfig.label}
			{itemConfig.sortable && itemConfig.align === "left" ? <ArrowDownwardIcon className={classNameIcon} /> : null}
		</div>
	)
}

export default ListHeaderAttribut
