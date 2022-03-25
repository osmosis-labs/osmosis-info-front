const getDataFeed = ({ token, chartReady, getHistoricalChartToken }) => {
	return {
		onReady: (callback) => {
			callback({
				exchanges: [],
				symbols_types: [],
				currency_codes: [],
				units: [],
				supported_resolutions: ["5", "15", "30", "60", "120", "240", "720", "1d", "1W", "1M"],
			})
			chartReady()
		},
		searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
			onResultReadyCallback([])
		},
		resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
			onSymbolResolvedCallback({ ...token, has_intraday: true, timezone: "Etc/UTC", session: "24x7" })
		},
		getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
			const { from, to } = periodParams
			try {
				let tf = resolution
				if (resolution === "1D") {
					tf = 1_440
				}
				let data = await getHistoricalChartToken({ symbol: token.symbol, tf })
				if (data.length === 0) {
					onHistoryCallback([], { noData: true })
					return
				}
				let bars = []
				data.forEach((bar) => {
					
					if (bar.time >= from && bar.time < to) {
						bars.push({
							time: bar.time * 1000,
							low: bar.low,
							high: bar.high,
							open: bar.open,
							close: bar.close,
							volume: bar.volume,
						})
					}
				})
				onHistoryCallback(bars, { noData: bars.length < 300 })
			} catch (error) {
				onHistoryCallback([], { noData: true })
				console.log("%cgetDataFeed.js -> 48 ERROR: error", "background: #FF0000; color:#FFFFFF", error)
				onErrorCallback(error)
			}
		},
		subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {},
		unsubscribeBars: (subscriberUID) => {},
	}
}
export default getDataFeed
