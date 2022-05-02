import { makeStyles } from "@material-ui/core"
import ListHeaderAttribut from "./list_header_attribut"

const useStyles = makeStyles((theme) => {
	return {
		rootListHeader: {
			width: "100%",
			backgroundColor: theme.palette.primary.light,
			fontSize: "15px",
			borderRadius: "20px 20px 0 0",
			padding: "4px 12px",
			lineHeight: "23px",
			borderBottom: `1px solid ${theme.palette.table.border}`,
			[theme.breakpoints.down("xs")]: {},
		},
	}
})
const ListHeader = ({ config, onSort, orderBy, order, stylesRow }) => {
	const classes = useStyles()

	return (
		<div className={classes.rootListHeader} style={stylesRow} >
			{config.items.map((itemConfig, index) => {
				return (
					<ListHeaderAttribut
						key={`${index}-ListHeaderAttribut`}
						config={config}
						itemConfig={itemConfig}
						onSort={onSort}
						orderBy={orderBy}
						order={order}
					/>
				)
			})}
		</div>
	)
}

export default ListHeader
