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
			onSymbolResolvedCallback({ ...token, has_intraday: true, timezone: "Etc/UTC" })
		},
		getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
			const { from, to } = periodParams
			try {
				let tf = resolution
				if (resolution === "1D") {
					tf = 1_440
				}
				let data = await getHistoricalChartToken({ symbol: token.symbol, tf })
				// console.log("%cgetDataFeed.js -> 28 TEAL: data", "background: #009688; color:#FFFFFF", data)
				let dateFrom = new Date(from * 1000)
				let dateTo = new Date(to * 1000)
				const formater = new Intl.DateTimeFormat("fr", { dateStyle: "short", timeStyle: "long" })
				
				if (data.length === 0) {
					onHistoryCallback([], { noData: true })
					return
				}
				let bars = []
				data.forEach((bar) => {
					// console.log("getDataFeed.js -> 29: bar time:", bar.time, "->", formater.format( new Date(bar.time * 1000)))
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
				// console.log("getDataFeed.js -> 29: from:", from, "->", formater.format(dateFrom))
				// console.log("getDataFeed.js -> 29: ..to:", to, "->", formater.format(dateTo))
				// console.log("%cgetDataFeed.js -> 45 YELLOW: bars", "background: #fff176; color:#212121", bars)
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
