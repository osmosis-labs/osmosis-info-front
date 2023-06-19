import * as React from "react";
import { SVGProps } from "react";

export const LoadingSVG = (props: SVGProps<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve" {...props} width={24} height={24}>
		<path d="M12 2C7.252 2 3.268 5.325 2.256 9.78a1 1 0 0 0 1.951.44A7.987 7.987 0 0 1 12 4a7.987 7.987 0 0 1 7.793 6.22 1 1 0 0 0 1.951-.44C20.733 5.324 16.748 2 12 2ZM3.19 12.986a1 1 0 0 0-.934 1.235 9.967 9.967 0 0 0 1.234 3.015 1 1 0 1 0 1.704-1.047 7.961 7.961 0 0 1-.987-2.41 1 1 0 0 0-1.017-.793Zm15.334 4.162a1 1 0 0 0-.768.348c-.132.149-.23.262-.299.326a1 1 0 1 0 1.37 1.46c.189-.178.321-.34.425-.458a1 1 0 0 0-.728-1.676ZM7.244 18.65a1 1 0 0 0-.482 1.858A9.983 9.983 0 0 0 9.02 21.53a.998.998 0 0 0 1.255-.653 1 1 0 0 0-.654-1.255 7.991 7.991 0 0 1-1.806-.816 1 1 0 0 0-.57-.157Zm7.405.93a.999.999 0 0 0-.264.049 8.015 8.015 0 0 1-1.137.267 1 1 0 1 0 .31 1.977 9.988 9.988 0 0 0 1.42-.336 1 1 0 0 0-.33-1.957Z" />
	</svg>
);