import React from "react";

/**
 * Buttons are used to catch user's actions.
 */

export interface SwitchProps {
	onChange?: (value: boolean, name: string | undefined) => void;
	/** Classname passed to the button.*/
	className?: string;
	/** Text to display on the button.*/
	disabled?: boolean;
	/** Text to display on the button.*/
	name?: string;
	/** Name of switch can be use to know who is clicked.*/
	value: boolean;
	/** Value of switch.*/
}

export const Switch = ({ onChange, className, disabled, value, name }: SwitchProps) => {
	const onClick = () => {
		if (onChange && !disabled) onChange(!value, name);
	};

	let classNameDefault = ` ${className}  rounded-full p-[2px] h-[32px] w-[52px] relative`;

	let classPin = "h-[28px] w-[28px] block rounded-full absolute top-[2px] transition-all ";
	if (!disabled) {
		classNameDefault += " transition-colors cursor-pointer";
		classPin += " bg-white-full";
	} else {
		classNameDefault += " opacity-[0.38] bg-wosmongton-600";
		classPin += " bg-wosmongton-500";
	}

	if (value) {
		classPin += " translate-x-[20px] ";
		if (!disabled) classNameDefault += " bg-wosmongton-500 hover:bg-wosmongton-400";
	} else {
		if (!disabled) classNameDefault += " bgosmosverse-400 hover:bgosmosverse-300";
	}

	return (
		<div onClick={onClick} className={classNameDefault}>
			<span className={classPin} />
		</div>
	);
};
