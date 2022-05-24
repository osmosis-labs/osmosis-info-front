import { useQuery } from "react-query"
import { useDebug } from "../../contexts/debug.provider"
import { defaultMessage, formatMessage } from "../../formaters/message.formatter"
import useRequest from "../request.hook"

export const useMessage = () => {
	const request = useRequest()
	const { message: messageValue, messageLevel, MODE } = useDebug()

	const getter = async ({ queryKey }) => {
		const [_, {}] = queryKey
		const response = await request({
			url: `https://api-osmosis.imperator.co/apr/v2/all`,
			method: "GET",
		})
		return formatMessage(response.data)
	}

	const { data, isLoading, isFetching } = useQuery(["message", {}], getter, {})

	let message = data ? data : defaultMessage
	message.value =
		"The Terra blockchain has resumed with on-chain swaps disabled and IBC channels closed. LUNA and UST pools rewards will drain shortly"
	message.level = "info"

	if (MODE === "dev") {
		message.value = messageValue
		message.level = messageLevel
	}
	return { data: message, isLoading, isFetching }
}
