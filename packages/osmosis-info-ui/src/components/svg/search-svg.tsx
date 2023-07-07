import * as React from "react";
import { SVGProps } from "react";

export const SearchSVG = (props: SVGProps<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
		<g strokeWidth={2}>
			<circle cx={8.308} cy={8.615} r={7.308} />
			<path strokeLinecap="round" d="M13.876 14.154 18 18.278" />
		</g>
	</svg>
);
