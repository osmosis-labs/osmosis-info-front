import { useQuery } from "react-query"
import { useDebug } from "../../contexts/debug.provider"
import { defaultMessage, formatMessage } from "../../formaters/message.formatter"
import useRequest from "../request.hook"
const API_URL = process.env.REACT_APP_API_URL

export const useMessage = () => {
	const request = useRequest()
	const { message: messageValue, messageLevel, MODE } = useDebug()

	const getter = async ({ queryKey }) => {
		const [_, {}] = queryKey
		const response = await request({
			url: `${API_URL}/overview/v1/message`,
			method: "GET",
		})
		return formatMessage(response.data)
	}

	const { data, isLoading, isFetching } = useQuery(["message", {}], getter, {})

	let message = data ? data : defaultMessage

	return { data: message, isLoading, isFetching }
}
