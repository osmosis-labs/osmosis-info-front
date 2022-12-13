import { useEffect, useState } from "react";

interface SizeState {
	width: number | null;
	height: number | null;
}

export const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState<SizeState>({
		width: null,
		height: null,
	});

	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return windowSize;
};
