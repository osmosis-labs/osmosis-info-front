import * as React from "react";
import { SVGProps } from "react";

export const LeftSvg = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 24 24" width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="m15 18-6-6 6-6" />
	</svg>
);
