import React from "react";
/**
 * Button with only one icon
 */
import { SVGProps } from "react";
export interface IconButtonProps {
	/** Icon to display on the button. */
	Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
	/** Calback when the button was clicked. */
	onClick?: React.MouseEventHandler<HTMLDivElement>;
	/** Classname passed to the button.*/
	className?: string;
}
export declare const IconButton: ({ Icon, onClick, className }: IconButtonProps) => JSX.Element;
