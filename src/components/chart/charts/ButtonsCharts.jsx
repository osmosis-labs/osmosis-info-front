import ButtonsLiquidity from "../liquidity/ButtonsLiquidity"
import ButtonsPrice from "../price/ButtonsPrice"
import ButtonsVolume from "../volume/ButtonsVolume"

const ButtonsCharts = ({
	onChangeRangePrice,
	onChangeRangeVolume,
	onChangeRangeLiquidity,
	rangePrice,
	rangeVolume,
	rangeLiquidity,
	typeChart,
}) => {
	if (typeChart === "price") {
		return <ButtonsPrice onChangeRange={onChangeRangePrice} range={rangePrice} />
	} else if (typeChart === "volume") {
		return <ButtonsVolume onChangeRange={onChangeRangeVolume} range={rangeVolume} />
	} else {
		return <ButtonsLiquidity onChangeRange={onChangeRangeLiquidity} range={rangeLiquidity} />
	}
}

export default ButtonsCharts
