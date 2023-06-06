export const detectBestDecimalsDisplay = ({
	price,
	minDecimal = 2,
	minPrice = 1,
	maxDecimal,
}: {
	price: number | undefined;
	minDecimal?: number;
	minPrice?: number;
	maxDecimal?: number;
}): number => {
	if (price !== undefined && price > minPrice) {
		return minDecimal;
	}

	let decimals: number = minDecimal;

	if (price !== undefined) {
		const priceSplit: string[] = price.toString().split(".");

		if (priceSplit.length === 2 && priceSplit[0] === "0") {
			const leadingZeros: RegExpMatchArray | null = priceSplit[1].match(/^0+/);
			decimals += leadingZeros ? leadingZeros[0].length + 1 : 1;
		}
	}

	if (maxDecimal !== undefined && decimals > maxDecimal) {
		decimals = maxDecimal;
	}

	return decimals;
};

export const formaterNumber = (num: number) => {
	if (Math.abs(num) < 1_000) {
		return formateNumberDecimals(num); // if value < 1000, nothing to do
	} else if (Math.abs(num) < 1_000_000) {
		return parseFloat((num / 1000).toFixed(1)) + "K"; // convert to K for number from > 1000 < 1 million
	} else if (Math.abs(num) < 1_000_000_000) {
		return parseFloat((num / 1_000_000).toFixed(1)) + "M"; // convert to M for number from > 1 million
	} else {
		return parseFloat((num / 1_000_000_000).toFixed(1)) + "B"; // convert to M for number from > 1 billion
	}
};

export const formatAutoPrice = (price: number) => {
	const decimals = detectBestDecimalsDisplay({ price });
	return formateNumberPriceDecimals(price, decimals);
};

export const formateNumberDecimals = (price: number, decimals = 2) => {
	return new Intl.NumberFormat("en-US", {
		currency: "USD",
		maximumFractionDigits: decimals,
	}).format(price);
};

export const formateNumberPriceDecimals = (price: number, decimals = 2) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: decimals,
	}).format(price);
};
