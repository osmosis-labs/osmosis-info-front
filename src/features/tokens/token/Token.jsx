import { makeStyles } from "@material-ui/core"
import { useEffect, useState, useRef } from "react"
import { useHistory, useParams } from "react-router-dom"
import ContainerLoader from "../../../components/loader/ContainerLoader"
import Paper from "../../../components/paper/Paper"
import { useTokens } from "../../../contexts/TokensProvider"
import {
	detectBestDecimalsDisplay,
	formateNumberPrice,
	formateNumberPriceDecimals,
	getInclude,
} from "../../../helpers/helpers"
import TokenPath from "./TokenPath"
import TokenTitle from "./TokenTitle"
import ContainerCharts from "./ContainerCharts"

const useStyles = makeStyles((theme) => {
	return {
		tokenRoot: {
			margin: `${theme.spacing(2)}px 0`,
			display: "grid",
			gridAutoRows: "auto",
			rowGap: theme.spacing(2),
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
		right: {
			zIndex: "0",
			height: "100%",
			width: "100%",
		},

		details: {
			display: "flex",
			flexDirection: "column",
			minHeight: "350px",
			[theme.breakpoints.down("xs")]: {
				width: "100%",
			},
		},
		detail: {
			padding: theme.spacing(2),
			width: "100%",
		},
		dataDetail: {
			fontSize: theme.fontSize.big,
			color: theme.palette.gray.contrastText,
		},
		titleDetail: {
			fontWeight: "600",
		},
		tokenPrice: {
			marginTop: "20px",
			fontWeight: "500",
			fontSize: "36px",
			paddingLeft: "10px",
			color: theme.palette.gray.contrastText,
		},

		containerInfo: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-around",
			alignItems: "flex-start",
			minHeight: "180px",
		},
		loaderDetails: {
			height: "100%",
			width: "100%",
			display: "flex",
		},
	}
})

const Token = ({ showToast }) => {
	const classes = useStyles()
	const history = useHistory()
	const { symbol } = useParams()
	const { getTokenData, getChartToken, tokens, getVolumeChartToken, getLiquidityChartToken } = useTokens()
	const [token, setToken] = useState({})
	const priceDecimals = useRef(2)

	const [dataIsLoaded, setDataIsLoaded] = useState(false) // data is loaded

	useEffect(() => {
		// get token from history state
		if (!symbol) {
			showToast({
				severity: "warning",
				text: "Token not find, you are redirected to tokens page.",
			})
			history.push("/tokens")
		} else {
			if (tokens.length > 0) {
				let indexToken = getInclude(tokens, (token) => token.symbol === symbol)
				if (indexToken >= 0) {
					setToken({ ...tokens[indexToken] })
				} else {
					showToast({
						severity: "warning",
						text: "Token not find, you are redirected to tokens page.",
					})
					history.push("/tokens")
				}
			}
		}
	}, [symbol, showToast, history, tokens])

	useEffect(() => {
		let fetch = async () => {
			try {
				setDataIsLoaded(false)
				let tokenData = await getTokenData(token.symbol)
				let dataPrice = await getDataPrice("7d")
				priceDecimals.current = dataPrice.length > 0 ? detectBestDecimalsDisplay(dataPrice[0].close) : 2
				setToken({ ...tokenData, price: dataPrice[dataPrice.length - 1].close })
				setDataIsLoaded(true)
			} catch (e) {
				console.log("%cToken.jsx -> 171 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
				setDataIsLoaded(true)
			}
		}
		if (token.id) {
			fetch()
		}
	}, [token, getTokenData])

	const getDataPrice = async (range) => {
		let data = await getChartToken({ symbol: token.symbol, range })
		return data
	}

	const getDataLiquidity = async (range) => {
		let data = await getLiquidityChartToken({ symbol: token.symbol, range })
		return data
	}

	const getDataVolume = async (range) => {
		let data = await getVolumeChartToken({ symbol: token.symbol, range })
		return data
	}

	return (
		<div className={classes.tokenRoot}>
			<ContainerLoader className={classes.containerInfo} isLoading={!dataIsLoaded}>
				<TokenPath token={token} />
				<TokenTitle token={token} />
				<p className={classes.tokenPrice}>{formateNumberPriceDecimals(token.price, priceDecimals.current)}</p>
			</ContainerLoader>
			<div className={classes.charts}>
				<Paper>
					<ContainerLoader classChildren={classes.loaderDetails} isLoading={!dataIsLoaded}>
						<div className={classes.details}>
							<div className={classes.detail}>
								<p className={classes.titleDetail}>Liquidity</p>
								<p variant="body2" className={classes.dataDetail}>
									{formateNumberPrice(token.liquidity)}
								</p>
							</div>
							<div className={classes.detail}>
								<p className={classes.titleDetail}>Volume (24hrs)</p>
								<p variant="body2" className={classes.dataDetail}>
									{formateNumberPrice(token.volume_24h)}
								</p>
							</div>
							<div className={classes.detail}>
								<p className={classes.titleDetail}>Price</p>
								<p variant="body2" className={classes.dataDetail}>
									{formateNumberPriceDecimals(token.price, priceDecimals.current)}
								</p>
							</div>
						</div>
					</ContainerLoader>
				</Paper>
				<Paper className={classes.right}>
					<ContainerCharts
						getDataPrice={getDataPrice}
						getDataVolume={getDataVolume}
						getDataLiquidity={getDataLiquidity}
						dataIsLoaded={dataIsLoaded}
					/>
				</Paper>
			</div>
		</div>
	)
}

export default Token
