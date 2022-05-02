import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

const useStyles = makeStyles((theme) => {
	return {
		rootItemSelectDashboard: {
			width: "125px",
			cursor: "pointer",
			color: theme.palette.gray.dark,
            padding: "4px 8px",
			[theme.breakpoints.down("xs")]: {},
		},
		itemSelectDashboardActived: {
			color: theme.palette.gray.contrastText,
			[theme.breakpoints.down("xs")]: {},
		},
	}
})
const ItemSelectDashboard = ({ name, path, exact = "false", onClickItem }) => {
	const classes = useStyles()
	const location = useLocation()
	const [actived, setActived] = useState(false)

	useEffect(() => {
		let condition = exact ? path === location.pathname : location.pathname.includes(path)
		if (condition) {
			setActived(true)
		} else {
			setActived(false)
		}
	}, [location.pathname])

	const onClick = () => {
		onClickItem(path)
	}
	return (
		<p
			onClick={onClick}
			className={
				actived
					? `${classes.rootItemSelectDashboard} ${classes.itemSelectDashboardActived}`
					: `${classes.rootItemSelectDashboard} `
			}
		>
			{name}
		</p>
	)
}

export default ItemSelectDashboard
