import ButtonsLiquidity from "../liquidity/ButtonsLiquidity"
import ButtonsPrice from "../price/ButtonsPrice"
import ButtonsPriceV1 from "../price/ButtonsPriceV1"
import ButtonsVolume from "../volume/ButtonsVolume"

const ButtonsCharts = ({
	onChangeRangePrice,
	onChangeRangeVolume,
	onChangeRangeLiquidity,
	rangePrice,
	rangeVolume,
	rangeLiquidity,
	typeChart,
	priceV1
}) => {
	if (typeChart === "price") {
		if(priceV1){

			return <ButtonsPriceV1 onChangeRange={onChangeRangePrice} range={rangePrice} />
		}else{
			return <ButtonsPrice onChangeRange={onChangeRangePrice} range={rangePrice} />

		}
	} else if (typeChart === "volume") {
		return <ButtonsVolume onChangeRange={onChangeRangeVolume} range={rangeVolume} />
	} else {
		return <ButtonsLiquidity onChangeRange={onChangeRangeLiquidity} range={rangeLiquidity} />
	}
}

export default ButtonsCharts
