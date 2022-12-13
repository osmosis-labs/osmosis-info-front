import * as React from "react";
import { SVGProps } from "react";

export const FrenchSvg = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
		<circle cx={256} cy={256} fill="#f0f0f0" r={256} />
		<path
			d="M512 256c0-110.071-69.472-203.906-166.957-240.077v480.155C442.528 459.906 512 366.071 512 256z"
			fill="#d80027"
		/>
		<path d="M0 256c0 110.071 69.473 203.906 166.957 240.077V15.923C69.473 52.094 0 145.929 0 256z" fill="#0052b4" />
	</svg>
);
