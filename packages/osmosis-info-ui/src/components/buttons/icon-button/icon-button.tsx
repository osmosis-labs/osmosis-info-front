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
	variant?: "default" | "flat";
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

	const fillAnime = `[&>svg]:hover:fill-white-full [&>svg]:fill-main-400 `;
	const fill = `[&>svg]:fill-main-400 [&>svg]:transition-colors`;
	const strokeAnime = `[&>svg]:hover:stroke-white-full [&>svg]:stroke-main-400 `;
	const stroke = `[&>svg]:stroke-main-400 [&>svg]:transition-colors`;
	if (variant === "default") {
		classIconButton = `bg-main-700 hover:bg-main-600 ${classIconButton}`;
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
