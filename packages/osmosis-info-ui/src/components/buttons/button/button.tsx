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

export const Button = ({
	children,
	onClick,
	className,
	variant = "primary",
	size = "medium",
	disabled,
}: ButtonProps) => {
	let classNameDefaut = ` ${className} rounded-xl w-fit transition-colors cursor-pointer h-fit whitespace-nowrap max-w-full overflow-hidden text-ellipsis	`;

	if (size === "medium") classNameDefaut += `${classNameDefaut} px-5 py-4 `;
	else if (size === "small") classNameDefaut += `${classNameDefaut} px-5 py-2.5 `;

	if (variant === "secondary") {
		if (disabled) {
			classNameDefaut += `${classNameDefaut} border-2 border-main-600 text-main-600 cursor-not-allowed py-3.5`;
		} else {
			classNameDefaut += `${classNameDefaut} border-2 border-wosmongton-400 hover:border-wosmongton-200 transition-all py-3.5`;
		}
	} else {
		if (disabled) classNameDefaut += `${classNameDefaut} bg-main-500 cursor-not-allowed text-main-100`;
		else if (variant === "primary") classNameDefaut += `${classNameDefaut} bg-wosmongton-700 hover:bg-wosmongton-400`;
		else if (variant === "warning")
			classNameDefaut += `${classNameDefaut} bg-gradient-to-r from-rust-800 to-rust-500 transition-all duration-default bg-size-x-200 bg-pos-0 hover:bg-pos-100`;
	}

	return (
		<div onClick={onClick} className={classNameDefaut}>
			{children}
		</div>
	);
};
