import { useEffect, useState } from "react"

const PREFIX = "OSMOSIS-"
const useLocalStorage = (key, initialValue, version) => {
	let prefixedKey = PREFIX + key
	let prefixedKeyVersion = PREFIX + key + "-VERSION"

	const [value, setValue] = useState(() => {
		const jsonValue = localStorage.getItem(prefixedKey)
		if (jsonValue !== null) return JSON.parse(jsonValue)
		else return initialValue
	})

	useEffect(() => {
		const versionStorage = localStorage.getItem(prefixedKeyVersion)
		if (version && (!versionStorage || versionStorage !== version)) {
			console.log(`%c Update setting from ${versionStorage} to ${version}`,'background: #cddc39; color:#212121'  )
			localStorage.setItem(prefixedKey, JSON.stringify(initialValue))
			localStorage.setItem(prefixedKeyVersion, version)
			setValue(initialValue)
		} else {
			localStorage.setItem(prefixedKey, JSON.stringify(value))
			setValue(value)
		}
	}, [prefixedKey, value, version, prefixedKeyVersion])

	return [value, setValue]
}

export default useLocalStorage
