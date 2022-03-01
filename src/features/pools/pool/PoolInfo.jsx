import React from "react"
import { makeStyles } from "@material-ui/core"
import Image from "../../../components/image/Image"
import ContainerLoader from "../../../components/loader/ContainerLoader"
import Paper from "../../../components/paper/Paper"
import { formateNumberPrice, formateNumberPriceDecimals, formaterNumber } from "../../../helpers/helpers"

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
			fontSize: theme.fontSize.big,
			color: theme.palette.gray.contrastText,
		},
	}
})

const PoolInfo = ({ loadingPoolInfo, tokens, pool, fees, pricesDecimals }) => {
	const classes = useStyles()
	return (
		<div className={classes.details}>
			<Paper className={classes.detailPaper}>
				<ContainerLoader classChildren={classes.loaderDetails} isLoading={loadingPoolInfo}>
					<div className={classes.pooledTokens}>
						<p className={classes.pooledTokensTitle}>Pooled tokens</p>
						<div className={classes.tokensContainer}>
							{tokens.map((token, i) => {
								return (
									<div className={classes.token} key={token.denom}>
										<div className={classes.tokenName}>
											<Image
												className={`${classes.image} ${classes.pooledTokensImages}`}
												assets={true}
												alt={`${token.symbol}`}
												src={`https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/${token.symbol.toLowerCase()}.png`}
												srcFallback="../assets/default.png"
												pathAssets=""
											/>
											<p>{token.symbol}</p>
										</div>
										<p className={classes.pooledTokensNumber}>{formaterNumber(token.amount, 0)}</p>
										<p className={classes.pooledTokensNumber}>
											{formateNumberPriceDecimals(token.price, pricesDecimals.current[i])}
										</p>
									</div>
								)
							})}
						</div>
					</div>
					<div className={classes.detail}>
						<p className={classes.titleDetail}>Liquidity</p>
						<p variant="body2" className={classes.dataDetail}>
							{formateNumberPrice(pool.liquidity)}
						</p>
					</div>
					<div className={classes.detail}>
						<p className={classes.titleDetail}>Volume (24hrs)</p>
						<p variant="body2" className={classes.dataDetail}>
							{formateNumberPrice(pool.volume_24h)}
						</p>
					</div>
					<div className={classes.detail}>
						<p className={classes.titleDetail}>Volume (7d)</p>
						<p variant="body2" className={classes.dataDetail}>
							{formateNumberPrice(pool.volume_7d)}
						</p>
					</div>
					<div className={classes.detail}>
						<p className={classes.titleDetail}>Fees</p>
						<p variant="body2" className={classes.dataDetail}>
							{fees}
						</p>
					</div>
				</ContainerLoader>
			</Paper>
		</div>
	)
}

export default React.memo(PoolInfo)
