import { makeStyles, useTheme } from "@material-ui/core"
import Paper from "../../../components/paper/Paper"
import CustomSkeleton from "../../../components/skeleton/custom_skeleton"
import { formateNumberPrice, formateNumberPriceDecimals, formaterNumber, getPercent } from "../../../helpers/helpers"

const TokenInfo = ({ token, isLoading, priceDecimals }) => {
	const classes = useStyles()
	const theme = useTheme()
	return (
		<Paper className={classes.loaderDetails}>
			<div className={classes.details}>
				<div className={classes.detail}>
					<p className={classes.titleDetail}>Liquidity</p>
					<div className={classes.detailsValues}>
						{isLoading ? (
							<>
								<div style={{ margin: "0px 0" }} className={classes.rowSkeleton}>
									<CustomSkeleton
										animation="wave"
										variant="rectangular"
										width={120}
										height={30}
										sx={{ padding: "0px 0", margin: "2px 0 2px 0" }}
									/>
								</div>
								<div style={{ margin: "0px 0" }} className={classes.rowSkeleton}>
									<CustomSkeleton
										animation="wave"
										variant="rectangular"
										width={80}
										height={22}
										sx={{ padding: "0px 0", margin: "2px 0 2px 0" }}
									/>
								</div>
							</>
						) : (
							<>
								<p className={classes.dataDetail}>{formateNumberPrice(token.liquidity)}</p>
								<p
									className={
										token.liquidity24hChange < 0
											? `${classes.dataDetailChange} ${classes.colorDown} ${classes.containerUpDown}`
											: token.liquidity24hChange > 0
											? `${classes.dataDetailChange} ${classes.colorUp} ${classes.containerUpDown}`
											: classes.dataDetailChange
									}
								>
									{token.liquidity24hChange > 0 ? "↑" : token.liquidity24hChange < 0 ? "↓" : <span />}
									{getPercent(Math.abs(token.liquidity24hChange))}
								</p>
							</>
						)}
					</div>
				</div>
				<div className={classes.detail}>
					<p className={classes.titleDetail}>Volume (24hrs)</p>
					<div className={classes.detailsValues}>
						{isLoading ? (
							<>
								<div style={{ margin: "0px 0" }} className={classes.rowSkeleton}>
									<CustomSkeleton
										animation="wave"
										variant="rectangular"
										width={120}
										height={30}
										sx={{ padding: "0px 0", margin: "2px 0 2px 0" }}
									/>
								</div>
								<div style={{ margin: "0px 0" }} className={classes.rowSkeleton}>
									<CustomSkeleton
										animation="wave"
										variant="rectangular"
										width={80}
										height={22}
										sx={{ padding: "0px 0", margin: "2px 0 2px 0" }}
									/>
								</div>
							</>
						) : (
							<>
								<p className={classes.dataDetail}>{formateNumberPrice(token.volume24h)}</p>
								<p
									className={
										token.volume24hChange > 0
											? `${classes.dataDetailChange} ${classes.colorUp} ${classes.containerUpDown}`
											: token.volume24hChange < 0
											? `${classes.dataDetailChange} ${classes.colorDown} ${classes.containerUpDown}`
											: classes.dataDetailChange
									}
								>
									{token.volume24hChange > 0 ? "↑" : token.volume24hChange < 0 ? "↓" : <span />}
									{getPercent(Math.abs(token.volume24hChange))}
								</p>
							</>
						)}
					</div>
				</div>

				<div className={classes.detail}>
					<p className={classes.titleDetail}>Price</p>
					<div className={classes.detailsValues}>
						{isLoading ? (
							<>
								<div style={{ margin: "0px 0" }} className={classes.rowSkeleton}>
									<CustomSkeleton
										animation="wave"
										variant="rectangular"
										width={120}
										height={30}
										sx={{ padding: "0px 0", margin: "2px 0 2px 0" }}
									/>
								</div>
								<div style={{ margin: "0px 0" }} className={classes.rowSkeleton}>
									<CustomSkeleton
										animation="wave"
										variant="rectangular"
										width={80}
										height={22}
										sx={{ padding: "0px 0", margin: "2px 0 2px 0" }}
									/>
								</div>
							</>
						) : (
							<>
								<p className={classes.dataDetail}>{formateNumberPriceDecimals(token.price, priceDecimals.current)}</p>
								<p
									className={
										token.price24hChange === 0
											? classes.dataDetailChange
											: token.price24hChange > 0
											? `${classes.dataDetailChange} ${classes.colorUp} ${classes.containerUpDown}`
											: `${classes.dataDetailChange} ${classes.colorDown} ${classes.containerUpDown}`
									}
								>
									{token.price24hChange > 0 ? "↑" : token.price24hChange < 0 ? "↓" : <span />}
									{getPercent(Math.abs(token.price24hChange))}
								</p>
							</>
						)}
					</div>
				</div>
				<div className={classes.detail}>
					<p className={classes.titleDetail}>Market cap</p>
					<div className={classes.detailsValues}>
						{isLoading ? (
							<>
								<div style={{ margin: "0px 0" }} className={classes.rowSkeleton}>
									<CustomSkeleton
										animation="wave"
										variant="rectangular"
										width={120}
										height={30}
										sx={{ padding: "0px 0", margin: "2px 0 2px 0" }}
									/>
								</div>
							</>
						) : (
							<>
								<p className={classes.dataDetail}>
									{token.mcap === 0 || !token.mcap ? "-" : `$${formaterNumber(token.mcap)}`}
								</p>
							</>
						)}
					</div>
				</div>
			</div>
		</Paper>
	)
}

const useStyles = makeStyles((theme) => {
	return {
		loaderDetails: {
			position: "relative",
			height: "100%",
			width: "100%",
			display: "flex",
		},

		details: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			minHeight: "350px",
		},
		detail: {
			width: "100%",
			padding: "0px 0px 50px 0",
		},
		dataDetail: {
			fontSize: "1.5rem",
			color: theme.palette.gray.contrastText,
		},
		detailsValues: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
			paddingTop: "10px",
			width: "100%",
		},
		dataDetailChange: {
			fontSize: "1.2rem",
		},
		titleDetail: {
			fontWeight: "600",
		},
		colorUp: { color: theme.palette.green.text },
		colorDown: { color: theme.palette.error.main },
		containerUpDown: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
		},
		rowSkeleton: {
			display: "flex",
			flexDirection: "row",
		},
	}
})

export default TokenInfo
