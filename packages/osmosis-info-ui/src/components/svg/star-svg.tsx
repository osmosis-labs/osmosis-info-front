import * as React from "react";
import { SVGProps } from "react";

export const StarSVG = (props: SVGProps<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height={20} width={20} fill="none" {...props}>
		<g clipPath="url(#a)">
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.583}
				d="m10.416 2.084 2.447 4.956 5.47.8-3.958 3.855.934 5.447-4.893-2.573-4.892 2.572.934-5.446L2.5 7.839l5.47-.8 2.446-4.955Z"
			/>
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M.917.501h19v19h-19z" />
			</clipPath>
		</defs>
	</svg>
);
