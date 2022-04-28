import { makeStyles } from "@material-ui/core"
const useStyles = makeStyles((theme) => {
	return {
		rootWalletHeader: {
			width: "100%",
			display: "grid",
			gridTemplateColumns: "2fr repeat(3, 1fr)",
            paddingBottom: "8px",
			borderBottom: `1px solid ${theme.palette.table.hover}`,
			[theme.breakpoints.down("xs")]: {},
		},
		name: {
            color: theme.palette.table.cellDark
        },
	}
})

const WalletHeader = ({}) => {
	const classes = useStyles()

	return (
		<div className={classes.rootWalletHeader}>
			<span className={classes.name}>Name</span>
			<span className={classes.name}>Balance</span>
			<span className={classes.name}>Price</span>
			<span className={classes.name}>Value (USD)</span>
		</div>
	)
}

export default WalletHeader
