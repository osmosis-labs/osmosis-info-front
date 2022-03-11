import { useEffect, useState } from "react"

const useAudio = (url) => {
	const [audio] = useState(new Audio(url))
	const [playing, setPlaying] = useState(false)

	const toggle = () => setPlaying(!playing)

	useEffect(() => {
		playing ? audio.play() : audio.pause()
	}, [playing])

	useEffect(() => {
		audio.addEventListener("ended", () => setPlaying(false))
		return () => {
			audio.removeEventListener("ended", () => setPlaying(false))
		}
	}, [])

	return [playing, toggle]
}

export default useAudio
