import React, { ChangeEvent, InputHTMLAttributes } from "react";
import { CloseSvg } from "../svg";

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
}

export const Input = ({
	className,
	variant = "default",
	disabled,
	label,
	error,
	onClear,
	onChange,
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
	let defaultClass = ` ${className} rounded-lg border-[1px] bg-background px-2  h-[45px] w-fit flex items-center`;
	const classInput = `!outline-none pr -2 h-full w-fit py-4 bg-background`;
	let classClear = ` bg-primary-200 rounded-full flex items-center justify-center ml-2 h-6 w-6  transition-colors duration-default`;

	if (variant === "outlined") defaultClass += `${defaultClass}  border-frontier-200 `;
	else defaultClass += `${defaultClass} border-background `;
	if (error) defaultClass += `${defaultClass}  border-error `;
	if (disabled) {
		classClear += " ";
		defaultClass += `${defaultClass}   opacity-50 border-white-disabled`;
	} else {
		classClear += " hover:bg-primary-300 cursor-pointer";
	}

	let labels: string[] = [];
	if (label && !Array.isArray(label)) labels = [label];
	else if (label && Array.isArray(label)) labels = label;

	return (
		<div className={defaultClass}>
			<input type="text" className={classInput} onChange={onChangeInput} {...rest} disabled={disabled} />
			<div className="flex justify-end items-center">
				{labels &&
					labels.map((label, index) => {
						return (
							<span
								className="border-2 border-primary-200 bg-primary-200 bg-opacity-30 px-2 py-1 text-xs rounded-lg ml-2 flex items-center"
								key={index}
							>
								{label}
							</span>
						);
					})}
				{onClear && (
					<span className={classClear} onClick={onClearInput}>
						<CloseSvg className="stroke-white-full" width={16} height={16} />
					</span>
				)}
			</div>
		</div>
	);
};
