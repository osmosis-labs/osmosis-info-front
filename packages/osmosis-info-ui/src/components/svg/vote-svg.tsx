import * as React from "react";
import { SVGProps } from "react";

export const VoteSVG = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
		<g clipPath="url(#a)">
			<path d="M5.6 3.2c-.874 0-1.6.726-1.6 1.6v12.8a1.6 1.6 0 0 0 0 3.2h16a1.6 1.6 0 0 0 0-3.2V4.8c0-.874-.726-1.6-1.6-1.6H5.6Zm0 1.6h12.8v14.4H5.6V4.8Zm8.792 3.192a.8.8 0 0 0-.558 1.374l.235.234-.235.235a.8.8 0 1 0 1.132 1.13l.234-.234.234.235a.8.8 0 1 0 1.132-1.131L16.33 9.6l.235-.234a.8.8 0 1 0-1.132-1.131l-.234.234-.234-.234a.8.8 0 0 0-.574-.243ZM8 8.8a.8.8 0 1 0 0 1.6h3.2a.8.8 0 1 0 0-1.6H8Zm7.2 4.4a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Zm-7.2.4a.8.8 0 1 0 0 1.6h3.2a.8.8 0 1 0 0-1.6H8Z" />
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
