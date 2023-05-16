import React, { InputHTMLAttributes } from "react";

/**
 * Inputs are used to catch user's actions.
 */

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	/** Classname passed to the input.*/
	className?: string;
	/** Label of the input.*/
	label?: string | string[];
	/** Type of the input.*/
	variant?: "default" | "outlined";
	/** If the input can be used.*/
	disabled?: boolean;
	/** If the input contains an error.*/
	error?: boolean;
	/** If the input is required.*/
	onClear?: () => void;
}

export const Input = ({ className, variant = "default", disabled, label, error, onClear, ...rest }: InputProps) => {
	let defaultClass = ` ${className} rounded-lg border-[1px] bg-main-500`;

	if (variant === "outlined") defaultClass += `${defaultClass}  border-frontier-200 `;
	if (error) defaultClass += `${defaultClass}  border-error-main `;

	return <input type="text" className={defaultClass} {...rest} />;
};
