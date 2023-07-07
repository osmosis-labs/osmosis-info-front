import React, { ChangeEvent, InputHTMLAttributes } from "react";
import { CloseSvg, SearchSVG } from "../svg";
import { IconButton } from "../buttons/icon-button/icon-button";

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
	/** if input can be cleared and callback.*/
	onClear?: () => void;
	/** If the input is required.*/
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;

	/** if display a search icon */
	searchIcon?: boolean;
}

export const Input = ({
	className,
	variant = "default",
	disabled,
	label,
	error,
	onClear,
	onChange,
	searchIcon = false,
	...rest
}: InputProps) => {
	const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		if (!disabled && onChange) {
			onChange(event);
		}
	};

	const onClearInput = () => {
		if (!disabled && onClear) {
			onClear();
		}
	};
	let defaultClass = ` ${className} rounded-lg border-[1px] bg-osmosverse-900 px-2  h-[45px] w-fit flex items-center`;
	const classInput = `!outline-none pr -2 h-full w-fit py-4 bg-osmosverse-900`;
	let classClear = `bg-osmosverse-700  rounded-full flex items-center justify-center ml-2 h-6 w-6  transition-colors duration-default`;

	if (variant === "outlined") defaultClass += `${defaultClass}  border-frontier-200 `;
	else defaultClass += `${defaultClass} border-background `;
	if (error) defaultClass += `${defaultClass}  border-error `;
	if (disabled) {
		classClear += " ";
		defaultClass += `${defaultClass}   opacity-50 border-white-disabled`;
	} else {
		classClear +=
			" hover:bg-osmosverse-500 cursor-pointer [&>svg]:hover:stroke-white-50 [&>svg]:stroke-osmosverse-400 [&>svg]:transition-colors";
	}

	let labels: string[] = [];
	if (label && !Array.isArray(label)) labels = [label];
	else if (label && Array.isArray(label)) labels = label;

	return (
		<div className={defaultClass}>
			{searchIcon && <SearchSVG className="stroke-osmosverse-300 mr-1" height={22} width={24} />}
			<input type="text" className={classInput} onChange={onChangeInput} {...rest} disabled={disabled} />
			<div className="flex justify-end items-center">
				{labels &&
					labels.map((label, index) => {
						return (
							<span
								className="border-2 border-wosmongton-200 bg-wosmongton-200 bg-opacity-30 px-2 py-1 text-xs rounded-lg ml-2 flex items-center"
								key={index}
							>
								{label}
							</span>
						);
					})}
				{onClear && (
					<span className={classClear} onClick={onClearInput}>
						<CloseSvg width={16} height={16} />
					</span>
				)}
			</div>
		</div>
	);
};
