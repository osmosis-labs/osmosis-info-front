import * as React from "react";
import { SVGProps } from "react";

export const PoolSvg = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		style={{
			fillRule: "evenodd",
			clipRule: "evenodd",
			strokeLinejoin: "round",
			strokeMiterlimit: 2,
		}}
		{...props}
	>
		<path d="M11.581 9.655c0-1.31.815-3.106 1.46-4.326C11.747 3.398 10.508 2 9.901 2 8.334 2 2.52 11.342 2.52 15.133 2.52 18.924 5.823 22 9.901 22c4.075 0 7.381-3.076 7.381-6.867 0-.087-.007-.181-.013-.275-.029 0-.059.004-.091.004-3.085.003-5.597-2.334-5.597-5.207Z" />
		<path d="M21.48 9.655c0 2.209-1.927 4.002-4.302 4.002-2.375 0-4.302-1.793-4.302-4.002 0-2.21 3.39-7.655 4.302-7.655.915 0 4.302 5.445 4.302 7.655Z" />
	</svg>
);
