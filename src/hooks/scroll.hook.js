import { useEffect } from "react"

export const useScrollTop = () => {
	useEffect(() => {
		setTimeout(() => {
			document.querySelector("#mainContainer").scrollTo(0, 0)
		})
	}, [])
}
