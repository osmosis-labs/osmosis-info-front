import { makeStyles } from "@material-ui/core"
import { useState } from "react"
import { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import Paper from "../../../components/paper/Paper"
import { formateNumberDecimalsAuto } from "../../../helpers/helpers"
import PoolInfo from "./PoolInfo"
import { useCallback } from "react"
import BlocLoaderOsmosis from "../../../components/loader/BlocLoaderOsmosis"
import TrxTable from "./trxTable/trxTable"
import { useSettings } from "../../../contexts/SettingsProvider"
import { useToast } from "../../../contexts/Toast.provider"
import { useHistoricalPool, usePool, usePoolTrx, useTokensPool } from "../../../hooks/data/pools.hook"
import ChartContainer from "./chart_container"
import PoolHeader from "./PoolHeader"

const useStyles = makeStyles((theme) => {
	return {
		poolRoot: {
			margin: `${theme.spacing(2)}px 0`,
			display: "grid",
			gridAutoRows: "auto",
			rowGap: theme.spacing(2),
		},

		charts: {
			display: "grid",
			gridTemplateColumns: "350px 1fr",
			gap: theme.spacing(1),

			[theme.breakpoints.down("xs")]: {
				gridTemplateColumns: "1fr",
				gridTemplateRows: "1fr 1fr",
			},
		},

		trxContainer: {
			marginBottom: `${theme.spacing(2)}px`,
			position: "relative",
			overflow: "hidden",
		},
	}
})

const Pool = () => {
	const classes = useStyles()
	const history = useHistory()
	const { showToast } = useToast()
	const { id } = useParams()

	const { settings, updateSettings } = useSettings()
	const [selectedTokens, setSelectedTokens] = useState({ one: {}, two: {} })
	const [pricesInfo, setPriceInfo] = useState(0)
	const [fees, setFees] = useState("0.0%")
	const [currency, setCurrency] = useState({ before: true, value: "$" })

	//Get data of current pool
	const { data: tokensPool, isLoading: isLoadingTokensPool } = useTokensPool({ poolId: id })

	const { data: pool, isLoading: isLoadingDataPool, isFetching: isFetchingDataPool } = usePool({ poolId: id })

	const isLoadingPool = isLoadingTokensPool || isLoadingDataPool

	//Trx
	const { data: trx, isLoading: isLoadingTrx } = usePoolTrx({ poolId: id, limit: 100 })

	const { data: historical } = useHistoricalPool({
		poolId: id,
		denomIn: selectedTokens.one?.denom,
		denomOut: selectedTokens.two?.denom,
		range: 60,
	})

	useEffect(() => {
		// Check if we have a id
		if (!id) {
			showToast({
				severity: "warning",
				text: "Pool not found, you are redirected to pools page.",
			})
			history.push("/tokens")
		}
	}, [id, showToast, history])

	useEffect(() => {
		//check if pool exist
		if (id && !isLoadingDataPool && !isFetchingDataPool) {
			if (pool.id) {
				//update fees
				setFees((f) => pool.fees)
				//Frontier --> all data
				if (settings.type === "app" && !pool.main) {
					// Only on frontier -> need to change
					// needed because conflict with theme button
					window.setTimeout(() => {
						updateSettings({ type: "frontier" })
						showToast({
							severity: "info",
							text: "You are redirected to frontier because the pool does not exist on main.",
						})
					}, 500)
				}
			} else {
				showToast({
					severity: "warning",
					text: "Pool not found, you are redirected to pools page.",
				})
				history.push("/pools")
			}
		}
	}, [pool, isLoadingDataPool, isFetchingDataPool, id, settings.type])

	useEffect(() => {
		// Set tokens
		if (id && !isLoadingPool) {
			if (tokensPool.length > 0) {
				setSelectedTokens((ps) => ({
					one: { ...tokensPool[0] },
					two: { ...tokensPool[1] },
				}))
			}
		}
	}, [tokensPool, isLoadingTokensPool, id])

	useEffect(() => {
		// needed to update price of pool and fee
		if (tokensPool.length > 0) {
			setSelectedTokens((ps) => ({ one: tokensPool[0], two: tokensPool[1] }))
			setCurrency((ps) => ({ before: false, value: tokensPool[0].symbolDisplay }))
		}
	}, [tokensPool])

	useEffect(() => {
		if (historical.length > 0) {
			const lastItem = historical[historical.length - 1]
			setPriceInfo(formateNumberDecimalsAuto({ price: lastItem.close }))
		}
	}, [historical])

	const onChangeSeletedTokens = useCallback(
		(selectedTokens) => {
			setCurrency({ before: false, value: selectedTokens.one.symbolDisplay })
			setSelectedTokens(selectedTokens)
		},
		[selectedTokens]
	)

	return (
		<div className={classes.poolRoot}>
			<PoolHeader
				pool={pool}
				tokens={tokensPool}
				selectedTokens={selectedTokens}
				onChangeSeletedTokens={onChangeSeletedTokens}
				loadingPoolDetails={isLoadingPool}
				pricesInfo={pricesInfo}
			/>
			<div className={classes.charts}>
				<PoolInfo loadingPoolInfo={isLoadingPool} pool={pool} tokens={tokensPool} fees={fees} />
				<ChartContainer currency={currency} selectedTokens={selectedTokens} poolId={id} />
			</div>
			<Paper className={classes.trxContainer}>
				<BlocLoaderOsmosis open={isLoadingTrx} classNameLoading={classes.loading} borderRadius={true} />
				<TrxTable data={trx} />
			</Paper>
		</div>
	)
}

export default Pool
