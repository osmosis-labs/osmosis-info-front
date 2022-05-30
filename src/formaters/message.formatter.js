export const defaultMessage = { value: "", level: "info" }
export const formatMessage = (data) => {
	let res = { ...defaultMessage }
    if (data) {
        res.value = data.message
        res.level = data.status
    }
	return res
}
