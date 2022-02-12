import { makeStyles } from "@material-ui/core"
import { useCallback, useState, useRef, forwardRef } from "react"
import { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import ButtonGroup from "../../../components/buttonGroup/ButtonGroup"
import Image from "../../../components/image/Image"
import ContainerLoader from "../../../components/loader/ContainerLoader"
import Paper from "../../../components/paper/Paper"
import { usePools } from "../../../contexts/PoolsProvider"
import {
	formatDate,
	formatDateHours,
	formateNumberDecimals,
	formateNumberPrice,
	formateNumberPriceDecimals,
	detectBestDecimalsDisplay,
	formaterNumber,
	getInclude,
	twoNumber,
	getDates,
} from "../../../helpers/helpers"
import PoolPath from "./PoolPath"
import PoolSelect from "./PoolSelect"
import PoolTitle from "./PoolTitle"
import { CSSTransitionGroup } from "react-transition-group"
import ChartLiquidity from "../../../components/chart/liquidity/ChartLiquidity"
import ChartVolume from "../../../components/chart/volume/ChartVolume"
import ChartPrice from "../../../components/chart/price/ChartPrice"
import ContainerCharts from "./ContainerCharts"
import Charts from "../../../components/chart/charts/Charts"
import ButtonsCharts from "../../../components/chart/charts/ButtonsCharts"
import ButtonsTypeChart from "../../../components/chart/charts/ButtonsTypeChart"
import InfoCharts from "../../../components/chart/charts/InfoCharts"

const useStyles = makeStyles((theme) => {
	return {
		poolRoot: {
			display: "grid",
			gridAutoRows: "auto",
			rowGap: theme.spacing(2),
		},
		containerInfo: {
			display: "grid",
			gridAutoRows: "auto",
			rowGap: theme.spacing(2),
			minHeight: "180px",
		},
		charts: {
			display: "grid",
			gridTemplateColumns: "300px 1fr",
			gap: theme.spacing(1),

			[theme.breakpoints.down("xs")]: {
				gridTemplateColumns: "1fr",
				gridTemplateRows: "1fr 1fr",
			},
		},
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
		textBig: {
			fontSize: theme.fontSize.big,
			color: theme.palette.gray.contrastText,
			fontVariantNumeric: "tabular-nums",
		},
		detailPaper: {},
		dataDetail: {
			fontSize: theme.fontSize.big,
			color: theme.palette.gray.contrastText,
		},
		titleDetail: {
			fontWeight: "600",
		},
		right: {
			zIndex: "0",
			height: "100%",
			[theme.breakpoints.down("xs")]: {
				width: "100%",
			},
		},
		chart: {
			width: "100%",
			height: "80%",
		},
		groupButtons: {
			display: "flex",
			alignItems: "flex-end",
			flexDirection: "column",
			justifyContent: "flex-end",
			padding: theme.spacing(1),
		},
		groupButton: {
			marginBottom: theme.spacing(1),
		},
		token: {
			display: "grid",
			padding: `${theme.spacing(1)}px 0 `,
			gridTemplateColumns: "repeat(auto-fit, minmax(20px, 1fr))",
			rowGap: theme.spacing(2),
			color: theme.palette.gray.contrastText,
			alignItems: "center",
		},
		image: {
			width: "30px",
			marginRight: theme.spacing(1),
		},
		tokenName: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
		},
		poolName: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
		},
		convertContainer: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			width: "fit-content",
			padding: "6px 10px",
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
		chartHeader: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		},
		chartData: {},
		containerErrorChart: {
			height: "100%",
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		errorChart: {
			margin: "auto",
		},
		chartContainer: {
			position: "relative",
			height: "100%",
			width: "100%",
		},
		chartRoot: {
			position: "absolute",
			top: "0",
			right: "0",
			bottom: "0",
			left: "0",
			height: "100%",
			width: "100%",
		},
		header: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			height: "25%",
			alignItems: "center",
			[theme.breakpoints.down("xs")]: {
				flexDirection: "column",
				alignItems: "flex-start",
				height: "35%",
			},
		},
		charts: {
			height: "75%",
			[theme.breakpoints.down("xs")]: {
				height: "65%",
			},
		},
		headerInfo: {
			padding: "0 0 0 2px",
			display: "flex",
			flexDirection: "column",
		},
		currentTitle: {},
		currentInfo: {
			fontSize: theme.fontSize.veryBig,
			color: theme.palette.gray.contrastText,
			fontVariantNumeric: "tabular-nums",
			margin: "4px 0",
		},
		currentSubInfo: {
			fontSize: "12px",
		},
		headerActions: {
			alignSelf: "flex-end",
			display: "flex",
			alignItems: "flex-end",
			flexDirection: "column",
			justifyContent: "flex-end",
			paddingTop: theme.spacing(1),
			paddingBottom: theme.spacing(1),
			[theme.breakpoints.down("xs")]: {
				flexDirection: "row",
				justifyContent: "space-between",
				width: "100%",
			},
		},
	}
})

const Pool = ({ showToast }) => {
	const classes = useStyles()
	const history = useHistory()
	const { id } = useParams()
	const { pools, getPoolData, getChartPool, getVolumeChartPool, getLiquidityChartPool } = usePools()

	//save data here to avoid to re fetching data if is already fetched
	const [pool, setPool] = useState({})
	
	useEffect(() => {
		// get pool from history state
		if (!id) {
			showToast({
				severity: "warning",
				text: "Pool not find, you are redirected to pools page.",
			})
			history.push("/pools")
		} else {
			if (pools.length > 0) {
				let indexPool = getInclude(pools, (pool) => pool.id === id)
				if (indexPool >= 0) {
					setPool({ ...pools[indexPool] })
				} else {
					showToast({
						severity: "warning",
						text: "Pool not find, you are redirected to pools page.",
					})
					history.push("/pools")
				}
			}
		}
	}, [id, showToast, history, pools])


	return (
		<div className={classes.poolRoot}>
			<ContainerLoader className={classes.containerInfo} isLoading={loadingPoolDetails}>
				<PoolPath pool={pool} />
				<PoolTitle pool={pool} tokens={tokens} />

				<Paper className={classes.convertContainer}>
					<Image
						className={`${classes.image}`}
						assets={true}
						alt={`${selectedTokens.two.symbol}`}
						src={`https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/${selectedTokens.two?.symbol?.toLowerCase()}.png`}
						srcFallback="../assets/default.png"
						pathAssets=""
					/>
					<p>
						1 {selectedTokens.two.symbol} = {convertData} {selectedTokens.one.symbol}{" "}
					</p>
				</Paper>
				<PoolSelect tokens={tokens} setSelectedTokens={onChangeSeletedToken} selectedTokens={selectedTokens} />
			</ContainerLoader>
			<div className={classes.charts}>
				<ContainerLoader isLoading={loadingPoolInfo}>
					<div className={classes.details}>
						<Paper className={classes.detailPaper}>
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
						</Paper>
					</div>
				</ContainerLoader>
				<Paper className={classes.right}>
					<ContainerLoader className={classes.chartContainer} isLoading={!dataIsLoaded}>
						<div className={classes.header}>
							<InfoCharts
								data={currentItem}
								typeChart={typeChart}
								rangeLiquidity={rangeLiquidity}
								rangeVolume={rangeVolume}
								rangePrice={rangePrice}
							/>
							<div className={classes.headerActions}>
								<ButtonsTypeChart type={typeChart} onChangeType={onChangeTypeChart} />
								<ButtonsCharts
									typeChart={typeChart}
									onChangeRangeLiquidity={onChangeRangeLiquidity}
									onChangeRangePrice={onChangeRangePrice}
									onChangeRangeVolume={onChangeRangeVolume}
									rangeLiquidity={rangeLiquidity}
									rangeVolume={rangeVolume}
									rangePrice={rangePrice}
								/>
							</div>
						</div>
						<div className={classes.charts}>
							<Charts
								dataPrice={currentDataPrice}
								dataVolume={currentDataVolume}
								dataLiquidity={currentDataLiquidity}
								crossMove={crossMove}
								onMouseLeave={onMouseLeave}
								onClick={onClick}
								typeChart={typeChart}
								rangeLiquidity={rangeLiquidity}
								rangeVolume={rangeVolume}
								rangePrice={rangePrice}
								isLoading={isLoading}
							/>
						</div>
					</ContainerLoader>
				</Paper>
			</div>
		</div>
	)
}

export default Pool
