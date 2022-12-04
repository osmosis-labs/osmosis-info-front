import { SVGProps } from "react";

export type Item = {
	name: string;
	path: string;
	Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
	selectionTest: RegExp;
};
