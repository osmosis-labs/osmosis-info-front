import InfoLiquidity from "../liquidity/InfoLiquidity"
import InfoPrice from "../price/InfoPrice"
import InfoVolume from "../volume/InfoVolume"

const InfoCharts = ({ data, rangePrice, rangeVolume, rangeLiquidity, typeChart }) => {
	
	if (typeChart === "price") {
		return <InfoPrice data={data} range={rangePrice} />
	} else if (typeChart === "volume") {
		return <InfoVolume data={data} range={rangeVolume} />
	} else {
		return <InfoLiquidity data={data} range={rangeLiquidity} />
	}
}

export default InfoCharts
