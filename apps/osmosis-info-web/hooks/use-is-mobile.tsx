import { useWindowSize } from "./use-window-size";

const SIZE = 800;

export const useIsMobile = (): boolean | null => {
	const { width } = useWindowSize();
	return width ? width <= SIZE : null;
};
