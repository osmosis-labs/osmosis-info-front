import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import ListFooter from "./list_footer"
import ListHeader from "./list_header"
import ListItem from "./list_item"

const useStyles = makeStyles((theme) => {
	return {
		rootList: {
			overflow: "auto",
			[theme.breakpoints.down("xs")]: {},
		},
	}
})
const List = ({ data, config, isLoading }) => {
	const classes = useStyles()
	const { defaultSort, defaultOrder, scrollOnIt, onLoadMore, items } = config
	const [order, setOrder] = useState(defaultOrder)
	const [orderBy, setOrderBy] = useState(defaultSort)

	const [rowSelected, setRowSelected] = useState(null)

	const sortString = (a, b, orderBy) => {
		let res = 0
		if (b[orderBy].length === 0 || a[orderBy].length === 0) {
			if (a[orderBy].length <= 0) res = 1
			if (b[orderBy].length <= 0) res = -1
		} else {
			if (b[orderBy] < a[orderBy]) {
				res = 1
			}
			if (b[orderBy] > a[orderBy]) {
				res = -1
			}
		}
		return res
	}

	const sortNumber = (a, b, orderBy) => {
		let res = 0
		if (b[orderBy] < a[orderBy]) {
			res = -1
		}
		if (b[orderBy] > a[orderBy]) {
			res = 1
		}
		return res
	}

	useEffect(() => {
		if (defaultSort) {
			setOrderBy(defaultSort)
		}
	}, [defaultSort])

	useEffect(() => {
		if (defaultOrder) {
			setOrder(defaultOrder)
		}
	}, [defaultOrder])

	const onSort = (configCell) => {
		const isAsc = orderBy === configCell.key && order === "asc"
		setOrder(isAsc ? "desc" : "asc")
		setOrderBy(configCell.key)
	}

	const getCurrentConfig = (key) => {
		return items.find((itemConfig) => itemConfig.key === key)
	}

	const displayData = (data) => {
		if (!order) {
			return data
		} else {
			let res = [...data]
			let currentConfig = getCurrentConfig(orderBy)
			let sortMethod = currentConfig ? currentConfig.onSort : () => {}
			if (!sortMethod) {
				if (typeof data[0][currentConfig.key] === "string") {
					sortMethod = sortString
				} else {
					sortMethod = sortNumber
				}
			}
			res.sort((a, b) => {
				if (order === "asc") {
					return sortMethod(a, b, orderBy, order)
				} else {
					return -sortMethod(a, b, orderBy, order)
				}
			})
			return res
		}
	}

	const onClickRow = (data) => {
		if (config.onClickRow) {
			config.onClickRow(data)
		}
		if (config.selectableRow) {
			setRowSelected(data[config.rowId])
		}
	}

	const stylesRow = {
		display: "grid",
		gridTemplateColumns: config.items.reduce((acc, item) => `${acc} ${item.space}`, ""),
	}

	return (
		<div className={classes.rootList}>
			<ListHeader config={config} onSort={onSort} orderBy={orderBy} order={order} stylesRow={stylesRow} />
			{displayData(data).map((item, index) => {
				return (
					<ListItem
						stylesRow={stylesRow}
						orderBy={orderBy}
						order={order}
						key={index + "listItem"}
						keyItem={index + "listItem"}
						config={config}
						data={item}
						onClickRow={config.onClickRow ? onClickRow : null}
						rowSelected={rowSelected}
					/>
				)
			})}
			{config.showFooter && <ListFooter onLoadMore={onLoadMore} isLoading={isLoading}/>}
		</div>
	)
}

export default List
