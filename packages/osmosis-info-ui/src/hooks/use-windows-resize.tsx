import { useEffect } from "react";

interface Config {
	delay?: number;
}

type Callback = () => void;

const useResizeObserver = (ref: React.RefObject<HTMLElement>, callback: Callback, config?: Config): void => {
	useEffect(() => {
		let timeoutId: NodeJS.Timeout | null = null;

		const handleResize = (): void => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}

			timeoutId = setTimeout(() => {
				callback();
			}, config?.delay || 100);
		};

		const resizeObserver = new ResizeObserver(handleResize);

		if (ref.current) {
			resizeObserver.observe(ref.current);
		}

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}

			resizeObserver.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

export default useResizeObserver;
