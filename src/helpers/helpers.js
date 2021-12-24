
export const formateNumberPrice = (price) => {
    return new Intl.NumberFormat('en-US',
        {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0, maximumFractionDigits: 0
        }).format(price)
}

export const formatDate = (date) => {
    let options = { month: "short", day: "numeric", year: "numeric" }
    return new Intl.DateTimeFormat('en-US', options).format(date);

}

export const formatDateHours = (date) => {
    let options = { month: "short" }
    let month = new Intl.DateTimeFormat('en-US', options).format(date);
    let year = date.getUTCFullYear()
    let day = date.getUTCDate()
    let hour = date.getUTCHours()
    let mer = "am"
    if (hour > 12) {
        hour = hour - 12
        mer = "pm"
    }
    return `${month} ${day}, ${year}, ${hour}:00 ${mer}`
}


export const detectBestDecimalsDisplay = (price) => {
    let decimals = 2;
    if (price !== undefined) {
        // Find out the number of leading floating zeros via regex
        const priceSplit = price.toString().split('.');
        if (priceSplit.length === 2 && priceSplit[0] === '0') {
            const leadingZeros = priceSplit[1].match(/^0+/);
            decimals += leadingZeros ? leadingZeros[0].length + 1 : 1;
        }
    }
    return decimals;
}

export const formateNumberPriceDecimals = (price, decimals = 2) => {
    return new Intl.NumberFormat('en-US',
        {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: decimals
        }).format(price)
}

export const formateNumberPriceDecimalsAuto = (price) => {
    return formateNumberPriceDecimals(
        price,
        detectBestDecimalsDisplay(price),
    );
}

export const formateNumberDecimals = (price, decimals = 2) => {
    return new Intl.NumberFormat('en-US',
        {
            currency: 'USD',
            maximumFractionDigits: decimals
        }).format(price)
}

export const formaterNumber = (num) => {

    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    } else if (num > 1000000) {
        return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    } else if (num < 900) {
        return formateNumberDecimals(num); // if value < 1000, nothing to do
    }
}

export const getInclude = (list, condition) => {
    let i = 0;
    while (i < list.length) {
        if (condition(list[i])) return i;
        i++;
    }
    return -1;
};

export const float2Numbers = (num) => Math.round(num * 100) / 100

export const twoNumber = (num) => {
    num = num + ""
    return num.length === 1 ? "0" + num : num
}

export const normalize = (string) => {
    if (string) {

        return string
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    } else {
        return ""
    }
};