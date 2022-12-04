import * as React from "react";
import { SVGProps } from "react";

export const OsmosisSvg = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<g clipPath="url(#a)">
			<path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0Z" fill="url(#b)" />
			<mask
				id="d"
				style={{
					maskType: "alpha",
				}}
				maskUnits="userSpaceOnUse"
				x={1}
				y={1}
				width={30}
				height={30}
			>
				<path
					d="M1.905 16C1.905 8.215 8.215 1.905 16 1.905c7.785 0 14.095 6.31 14.095 14.095 0 7.785-6.31 14.095-14.095 14.095-7.785 0-14.095-6.31-14.095-14.095Z"
					fill="url(#c)"
				/>
			</mask>
			<g mask="url(#d)">
				<path
					d="M16.072 30.021c7.906 0 14.225-7.053 14.225-15.149-1.989 1.751-8.406 4.08-15.407-1.727C7.764 7.233 1.761 9.76 1.761 14.431c0 0-.005.671-.005.932 0 8.096 6.41 14.659 14.316 14.659Z"
					fill="url(#e)"
				/>
				<path
					d="M19.859 15.732c2.656.447 4.638.273 6.283-.92 1.474-1.067 3.692-2.028 3.913.14.373 3.666-6.92 6.742-13.203 6.98-6.284.237-15.54-3.979-14.338-9.97.137-.683.47-1.37 1.305-2.38.881-1.066 3.832-2.791 6.57-1.68 4.329 1.334 4.672 7.023 9.47 7.83Z"
					fill="url(#f)"
				/>
				<path
					opacity={0.3}
					fillRule="evenodd"
					clipRule="evenodd"
					d="M12.346 12.444a4.56 4.56 0 1 0-4.793-7.729l-.06-.092c-10.956 7.54-4.8 20.917.163 23.582.875.203.623-.617.186-2.04-.965-3.14-2.831-9.214 4.504-13.721Z"
					fill="url(#g)"
				/>
			</g>
		</g>
		<defs>
			<linearGradient id="b" x1={9.948} y1={0.69} x2={21.362} y2={29.918} gradientUnits="userSpaceOnUse">
				<stop stopColor="#fff" />
				<stop offset={1} stopColor="#FAE7FD" />
			</linearGradient>
			<linearGradient id="c" x1={16} y1={30.095} x2={16} y2={1.905} gradientUnits="userSpaceOnUse">
				<stop stopColor="#fff" />
				<stop offset={1} stopColor="#FAE7FD" />
			</linearGradient>
			<linearGradient id="g" x1={8.053} y1={3.759} x2={9.19} y2={29.171} gradientUnits="userSpaceOnUse">
				<stop stopColor="#fff" />
				<stop offset={1} stopColor="#fff" stopOpacity={0} />
			</linearGradient>
			<radialGradient
				id="e"
				cx={0}
				cy={0}
				r={1}
				gradientUnits="userSpaceOnUse"
				gradientTransform="matrix(33.86668 1.02857 -1.50905 49.68679 4.762 21.296)"
			>
				<stop stopColor="#2D01E2" />
				<stop offset={0.602} stopColor="#DD4AC8" />
			</radialGradient>
			<radialGradient
				id="f"
				cx={0}
				cy={0}
				r={1}
				gradientUnits="userSpaceOnUse"
				gradientTransform="rotate(62.23 5.74 11.364) scale(28.5431 61.2321)"
			>
				<stop offset={0.505} stopColor="#DD4AC8" />
				<stop offset={0.918} stopColor="#2D01E2" />
			</radialGradient>
			<clipPath id="a">
				<path fill="#fff" d="M0 0h32v32H0z" />
			</clipPath>
		</defs>
	</svg>
);
