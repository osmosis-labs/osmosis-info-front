import React, { useCallback } from "react";

/**
 * Button with only one icon
 */

import { SVGProps } from "react";

export interface IconButtonProps {
	/** Icon to display on the button. */
	Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
	/** Calback when the button was clicked. */
	onClick?: React.MouseEventHandler<HTMLDivElement>;
	/** use stroke animation*/
	strokeAnimation?: boolean;
	/** use fill animation*/
	fillAnimation?: boolean;
	/** If the button can be used.*/
	disabled?: boolean;
	/** If flat then remove background, just display icon.*/
	variant?: "default" | "flat" | "secondary";
	/** Classname passed to the button.*/
	className?: string;
}

export const IconButton = ({
	Icon,
	onClick,
	className,
	strokeAnimation,
	fillAnimation = true,
	disabled,
	variant = "default",
}: IconButtonProps) => {
	const onClickButton = useCallback(
		(e: any) => {
			if (!disabled && onClick) onClick(e);
		},
		[onClick, disabled]
	);

	let classIconButton = `
    px-4 py-3 rounded-xl h-fit w-fit cursor-pointer transition-colors 
    ${className}`;

	let fillAnime = `[&>svg]:hover:fill-osmosverse-300 [&>svg]:fill-osmosverse-400 `;
	let fill = `[&>svg]:fill-osmosverse-400 [&>svg]:transition-colors`;
	let strokeAnime = `[&>svg]:hover:stroke-osmosverse-300 [&>svg]:stroke-osmosverse-400 `;
	let stroke = `[&>svg]:stroke-osmosverse-400 [&>svg]:transition-colors`;
	if (variant === "default") {
		classIconButton = `bg-wosmongton-200 hover:bg-wosmongton-300 ${classIconButton}`;
	}
	if (variant === "secondary") {
		classIconButton = `bg-osmosverse-700 hover:bg-osmosverse-600 ${classIconButton}`;
		stroke = "[&>svg]:stroke-white-50 [&>svg]:transition-colors";
		strokeAnime = "[&>svg]:hover:stroke-osmosverse-400 [&>svg]:stroke-white-50";
		fill = "[&>svg]:fill-osmosverse-400 [&>svg]:transition-colors";
		fillAnime = "[&>svg]:hover:fill-white-50 [&>svg]:fill-osmosverse-400";
	}
	if (fillAnimation) {
		classIconButton = `${fill} ${classIconButton}`;
		if (!disabled) classIconButton = ` ${fillAnime} ${classIconButton}`;
		else classIconButton = `opacity-50 ${classIconButton}`;
	}
	if (strokeAnimation) {
		classIconButton = `${stroke} ${classIconButton}`;

		if (!disabled) classIconButton = ` ${strokeAnime} ${classIconButton} `;
		else classIconButton = `opacity-50 ${classIconButton}`;
	}
	return (
		<div onClick={onClickButton} className={classIconButton}>
			<Icon height={20} width={21} className="" />
		</div>
	);
};
