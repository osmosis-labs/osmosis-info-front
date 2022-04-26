import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import ListItemAttribut from "./list_item_attribut"

const useStyles = makeStyles((theme) => {
	return {
		rootListItem: {
			width: "100%",
			fontSize: "12px",
			padding: "4px 12px",
			lineHeight: "23px",
			borderBottom: `1px solid ${theme.palette.table.border}`,
			transition: "all 0.3s ease-in-out",
			"&:hover":{
				backgroundColor: theme.palette.table.hover,
			},
			[theme.breakpoints.down("xs")]: {},
		},
		listItemSelectable: {
			cursor: "pointer",
		},
		listItemSelected: {
			backgroundColor: theme.palette.table.hover,
		},
	}
})
const ListItem = ({ data, config, keyItem, onClickRow, rowSelected, order, orderBy, stylesRow }) => {
	const classes = useStyles()
	const [className, setClassName] = useState(`${classes.rootListItem}`)

	useEffect(() => {
		let className = `${classes.rootListItem}`
		if (config.selectableRow) className += ` ${classes.listItemSelectable}`
		if (rowSelected === data[config.rowId]) {
			className += ` ${classes.rootListItem} ${classes.listItemSelected} ${config.selectedItemClass}`
		} else {
			className += ` ${classes.rootListItem}`
		}
		setClassName(className)
	}, [rowSelected, order, orderBy])

	const onClick = () => {
		console.log("list_item.jsx -> 44: onClickRow")
		onClickRow(data)
	}
	return (
		<div className={className} style={stylesRow} onClick={onClickRow ? onClick : null}>
			{config.items.map((itemConfig, index) => {
				if (itemConfig.body) {
					return (
						<itemConfig.body
							key={`${index}-item.body-${keyItem}`}
							itemKey={`${index}-item.body-${keyItem}`}
							data={data}
							config={config}
							itemConfig={itemConfig}
						/>
					)
				} else {
					return (
						<ListItemAttribut
							key={`${index}-ListItemAttribut-${keyItem}`}
							data={data}
							config={config}
							itemConfig={itemConfig}
						/>
					)
				}
			})}
		</div>
	)
}

export default ListItem
