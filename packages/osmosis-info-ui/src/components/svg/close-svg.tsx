import * as React from "react";
import { SVGProps } from "react";

export const CloseSvg = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 24 24" width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M18 6 6 18M6 6l12 12" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);
