import { useEffect, useState } from "react"


const PREFIX = "OSMOSIS-"
const useLocalStorage = (key, initialValue) => {
    let prefixedKey = PREFIX + key

    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey)
        if (jsonValue !== null) return JSON.parse(jsonValue)
        else return initialValue
    })

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
        setValue(value)
    }, [prefixedKey, value])

    return [value, setValue]

}

export default useLocalStorage