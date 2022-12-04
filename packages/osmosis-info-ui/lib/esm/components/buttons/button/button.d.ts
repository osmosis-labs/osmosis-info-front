import React from "react";
/**
 * Buttons are used to catch user's actions.
 */
export interface ButtonProps {
	onClick?: React.MouseEventHandler<HTMLDivElement>;
	/** Classname passed to the button.*/
	className?: string;
	/** Text to display on the button.*/
	children?: React.ReactElement | string;
	/** Type of the button.*/
	variant?: "primary" | "secondary" | "warning";
	/** If the button can be used.*/
	disabled?: boolean;
	/** Used to reduce the size of the button.*/
	size?: "small" | "medium";
}
export declare const Button: ({ children, onClick, className, variant, size, disabled }: ButtonProps) => JSX.Element;
