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

export const IconButton = ({ Icon, onClick, className }: IconButtonProps) => {
	const classIconButton = `
    px-4 py-3 bg-main-700 rounded-xl h-fit w-fit cursor-pointer transition-colors hover:bg-main-600 [&>svg]:hover:fill-white-full 
    [&>svg]:fill-main-400 
    ${className}`;

	return (
		<div onClick={onClick} className={classIconButton}>
			<Icon height={20} width={21} className="duration-default" />
		</div>
	);
};
