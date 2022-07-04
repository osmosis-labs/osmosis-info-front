import { makeStyles } from "@material-ui/core"
import Image from "../../../../components/image/Image"
import CustomSkeleton from "../../../../components/skeleton/custom_skeleton"
import { formateNumberDecimalsAuto, getPercent } from "../../../../helpers/helpers"
const useStyles = makeStyles((theme) => {
	return {
		rootWalletItemSkeleton: {
			width: "100%",
			display: "grid",
			gridTemplateColumns: "1fr 1fr 1fr 1fr",
			padding: "8px 0",
			borderBottom: `1px solid ${theme.palette.table.hover}`,
			color: theme.palette.primary.contrastText,
			fontSize: "14px",
			[theme.breakpoints.down("xs")]: {},
		},
		nameContainer: {
			display: "flex",
			alignItems: "center",
		},
		image: {
			width: "32px",
			marginRight: "8px",
			padding: "2px",
			borderRadius: "50%",
			border: `1px solid ${theme.palette.yellow.gold}`,
		},
		names: {
			marginLeft: "4px",
			display: "flex",
			flexDirection: "column",
		},
		name: {
			fontSize: "12px",
			color: theme.palette.table.cellDark,
		},
		data: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
		},
		up: {
			color: theme.palette.green.text,
		},
		down: {
			color: theme.palette.error.main,
		},
	}
})

const WalletItemSkeleton = () => {
	const classes = useStyles()

	return (
		<div className={classes.rootWalletItemSkeleton}>
			<div className={classes.nameContainer}>
				<CustomSkeleton height={50} width={30} />
				<div className={classes.names}>
					<CustomSkeleton height={30} width={50} />
					<CustomSkeleton height={20} width={60} />
				</div>
			</div>
			<CustomSkeleton height={30} width={50} />
			<CustomSkeleton height={30} width={50} />
			<CustomSkeleton height={30} width={50} />
		</div>
	)
}

export default WalletItemSkeleton
