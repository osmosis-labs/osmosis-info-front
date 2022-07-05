import React from "react"
import { makeStyles, useTheme } from "@material-ui/core"
import Image from "../../../components/image/Image"
import Paper from "../../../components/paper/Paper"
import {
	formateNumberDecimalsAuto,
	formateNumberPrice,
	formateNumberPriceDecimals,
	formaterNumber,
} from "../../../helpers/helpers"

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import CustomSkeleton from "../../../components/skeleton/custom_skeleton"
import { useAssets } from "../../../hooks/data/assets.hook"

const useStyles = makeStyles((theme) => {
	return {
		details: {
			display: "flex",
			flexDirection: "column",
			[theme.breakpoints.down("xs")]: {
				width: "100%",
			},
		},
		detail: {
			padding: theme.spacing(2),
		},
		loaderDetails: {
			height: "100%",
			width: "100%",
			display: "flex",
			flexDirection: "column",
		},
		pooledTokens: {
			backgroundColor: theme.palette.primary.dark2,
			fontSize: theme.fontSize.small,
			padding: theme.spacing(2),
			borderRadius: theme.spacing(2),
		},
		pooledTokensTitle: {
			fontWeight: "600",
		},
		pooledTokensImages: {
			width: "25px",
		},
		pooledTokensNumber: {
			textAlign: "right",
		},
		image: {
			width: "30px",
			marginRight: theme.spacing(1),
		},
		token: {
			display: "grid",
			padding: `${theme.spacing(1)}px 0 `,
			gridTemplateColumns: "repeat(auto-fit, minmax(20px, 1fr))",
			rowGap: theme.spacing(2),
			color: theme.palette.gray.contrastText,
			alignItems: "center",
		},
		tokenName: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
		},
		titleDetail: {
			fontWeight: "600",
		},
		dataDetail: {
			color: theme.palette.gray.contrastText,
			fontSize: "1.5rem",
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

const PoolInfo = ({ loadingPoolInfo, tokens, pool }) => {
	const classes = useStyles()
	const { data: assets } = useAssets()

	const formatPercent = (value) => {
		return formateNumberDecimalsAuto({ price: value, minDecimal: 0, minPrice: 1, maxDecimal: 2, unit: "%" })
	}
	const theme = useTheme()

	return (
		<div className={classes.details}>
			<Paper className={classes.detailPaper}>
				<div className={classes.loaderDetails}>
					<div className={classes.pooledTokens}>
						<p className={classes.pooledTokensTitle}>Pooled tokens</p>
						<div className={classes.tokensContainer}>
							{loadingPoolInfo ? (
								<>
									<div style={{ margin: "4px 0" }} className={classes.rowSkeleton}>
										<CustomSkeleton
											animation="wave"
											variant="rectangular"
											width={22}
											height={22}
											sx={{ bgcolor: theme.palette.primary.main, padding: "0px 0", margin: "4px 0 4px 0" }}
										/>
										<CustomSkeleton
											animation="wave"
											variant="rectangular"
											width={40}
											height={22}
											sx={{ bgcolor: theme.palette.primary.main, padding: "0px 0", margin: "4px 0 4px 10px" }}
										/>
										<CustomSkeleton
											animation="wave"
											variant="rectangular"
											width={50}
											height={22}
											sx={{ bgcolor: theme.palette.primary.main, padding: "0px 0", margin: "4px 0 4px 40px" }}
										/>
										<CustomSkeleton
											animation="wave"
											variant="rectangular"
											width={50}
											height={22}
											sx={{ bgcolor: theme.palette.primary.main, padding: "0px 0", margin: "4px 0 4px 40px" }}
										/>
									</div>
									<div style={{ margin: "4px 0" }} className={classes.rowSkeleton}>
										<CustomSkeleton
											animation="wave"
											variant="rectangular"
											width={22}
											height={22}
											sx={{ bgcolor: theme.palette.primary.main, padding: "0px 0", margin: "4px 0 4px 0" }}
										/>
										<CustomSkeleton
											animation="wave"
											variant="rectangular"
											width={40}
											height={22}
											sx={{ bgcolor: theme.palette.primary.main, padding: "0px 0", margin: "4px 0 4px 10px" }}
										/>
										<CustomSkeleton
											animation="wave"
											variant="rectangular"
											width={50}
											height={22}
											sx={{ bgcolor: theme.palette.primary.main, padding: "0px 0", margin: "4px 0 4px 40px" }}
										/>
										<CustomSkeleton
											animation="wave"
											variant="rectangular"
											width={50}
											height={22}
											sx={{ bgcolor: theme.palette.primary.main, padding: "0px 0", margin: "4px 0 4px 40px" }}
										/>
									</div>
								</>
							) : (
								tokens.map((token, i) => {
									return (
										<div className={classes.token} key={token.denom}>
											<div className={classes.tokenName}>
												<Image
													className={`${classes.image} ${classes.pooledTokensImages}`}
													assets={true}
													alt={`${token.symbol}`}
													src={assets[token.symbol]?.image}
													srcFallback="../assets/default.png"
													pathAssets=""
												/>
												<p>{token.symbolDisplay}</p>
											</div>
											<p className={classes.pooledTokensNumber}>{formaterNumber(token.amount, 0)}</p>
											<p className={classes.pooledTokensNumber}>{formateNumberDecimalsAuto({ price: token.price })}</p>
										</div>
									)
								})
							)}
						</div>
					</div>
					<div className={classes.detail}>
						<p className={classes.titleDetail}>Liquidity</p>
						<div className={classes.detailsValues}>
							{loadingPoolInfo ? (
								<>
									<div style={{ margin: "0px 0" }} className={classes.rowSkeleton}>
										<CustomSkeleton
											animation="wave"
											variant="rectangular"
											width={120}
											height={30}
											sx={{ bgcolor: theme.palette.primary.main, padding: "0px 0", margin: "2px 0 2px 0" }}
										/>
									</div>
									<div style={{ margin: "0px 0" }} className={classes.rowSkeleton}>
										<CustomSkeleton
											animation="wave"
											variant="rectangular"
											width={80}
											height={22}
											sx={{ bgcolor: theme.palette.primary.main, padding: "0px 0", margin: "2px 0 2px 0" }}
										/>
									</div>
								</>
							) : (
								<>
									<p className={classes.dataDetail}>{formateNumberPrice(pool.liquidity)}</p>

									<p
										className={
											pool.liquidity24hChange === 0
												? classes.dataDetailChange
												: pool.liquidity24hChange > 0
												? `${classes.dataDetailChange} ${classes.colorUp} ${classes.containerUpDown}`
												: `${classes.dataDetailChange} ${classes.colorDown} ${classes.containerUpDown}`
										}
									>
										{pool.liquidity24hChange > 0 ? "↑" : pool.liquidity24hChange < 0 ? "↓" : <span />}
										{formatPercent(Math.abs(pool.liquidity24hChange))}
									</p>
								</>
							)}
						</div>
					</div>
					<div className={classes.detail}>
						<p className={classes.titleDetail}>Volume (24hrs)</p>

						<div className={classes.detailsValues}>
							{loadingPoolInfo ? (
								<>
									<div style={{ margin: "0px 0" }} className={classes.rowSkeleton}>
										<CustomSkeleton
											animation="wave"
											variant="rectangular"
											width={120}
											height={30}
											sx={{ bgcolor: theme.palette.primary.main, padding: "0px 0", margin: "2px 0 2px 0" }}
										/>
									</div>
									<div style={{ margin: "0px 0" }} className={classes.rowSkeleton}>
										<CustomSkeleton
											animation="wave"
											variant="rectangular"
											width={80}
											height={22}
											sx={{ bgcolor: theme.palette.primary.main, padding: "0px 0", margin: "2px 0 2px 0" }}
										/>
									</div>
								</>
							) : (
								<>
									<p className={classes.dataDetail}>{formateNumberPrice(pool.volume24h)}</p>
									<p
										className={
											pool.volume24hChange === 0
												? classes.dataDetailChange
												: pool.volume24hChange > 0
												? `${classes.dataDetailChange} ${classes.colorUp} ${classes.containerUpDown}`
												: `${classes.dataDetailChange} ${classes.colorDown} ${classes.containerUpDown}`
										}
									>
										{pool.volume24hChange > 0 ? "↑" : pool.volume24hChange < 0 ? "↓" : <span />}
										{formatPercent(Math.abs(pool.volume24hChange))}
									</p>
								</>
							)}
						</div>
					</div>

					<div className={classes.detail}>
						<p className={classes.titleDetail}>Volume (7d)</p>
						{loadingPoolInfo ? (
							<>
								<div style={{ margin: "0px 0" }} className={classes.rowSkeleton}>
									<CustomSkeleton
										animation="wave"
										variant="rectangular"
										width={120}
										height={30}
										sx={{ bgcolor: theme.palette.primary.main, padding: "0px 0", margin: "4px 0 4px 0" }}
									/>
								</div>
							</>
						) : (
							<>
								<p className={classes.dataDetail}>{formateNumberPrice(pool.volume7d)}</p>
							</>
						)}
					</div>
					<div className={classes.detail}>
						<p className={classes.titleDetail}>Fees</p>

						{loadingPoolInfo ? (
							<>
								<div style={{ margin: "0px 0" }} className={classes.rowSkeleton}>
									<CustomSkeleton
										animation="wave"
										variant="rectangular"
										width={80}
										height={22}
										sx={{ bgcolor: theme.palette.primary.main, padding: "0px 0", margin: "4px 0 4px 0" }}
									/>
								</div>
							</>
						) : (
							<>
								<p className={classes.dataDetail}>{formatPercent(parseFloat(pool.fees))}</p>
							</>
						)}
					</div>
				</div>
			</Paper>
		</div>
	)
}

export default React.memo(PoolInfo)
