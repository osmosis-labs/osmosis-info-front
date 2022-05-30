import { formateNumberPriceDecimals } from "../helpers/helpers"

export const defaultValuePrice = { priceOsmoBrut: 0, priceOsmo: 0, priceIonBrut: 0, priceIon: 0 }
export const formatPrice = ({ dataOsmo, dataIon }) => {
	let prices = { ...defaultValuePrice }
	prices.priceOsmoBrut = parseFloat(dataOsmo.price)
	prices.priceOsmo = formateNumberPriceDecimals(prices.priceOsmoBrut)
	prices.priceIonBrut = parseFloat(dataIon.price)
	prices.priceIon = formateNumberPriceDecimals(prices.priceIonBrut)
	return prices
}
