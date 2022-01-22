import { useEffect, useState } from "react"

const PREFIX = "OSMOSIS-"
const useSessionStorage = (key, initialValue) => {
	let prefixedKey = PREFIX + key

	const [value, setValue] = useState(() => {
		const jsonValue = sessionStorage.getItem(prefixedKey)
		if (jsonValue !== null) return JSON.parse(jsonValue)
		else return initialValue
	})

	useEffect(() => {
		sessionStorage.setItem(prefixedKey, JSON.stringify(value))
		setValue(value)
	}, [prefixedKey, value])

	return [value, setValue]
}

export default useSessionStorage
