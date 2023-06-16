import * as React from "react";
import { SVGProps } from "react";

export const SwapSVG = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 20 24" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path strokeLinecap="round" fill="none" strokeWidth={3} d="M6.625 2v17.438l-4.5-4.05M13.375 21.687V4.25l4.5 4.05" />
	</svg>
);
