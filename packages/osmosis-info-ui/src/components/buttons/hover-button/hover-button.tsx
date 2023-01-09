import React, { useState } from "react";
import { Button, ButtonProps } from "../button/button";

/**
 * HoverButton is used to display an other component when it is hovered .
 */

export interface HoverButtonProps extends ButtonProps {
	/** Component to display when it's hovered.*/
	hoverContent: React.ReactElement | string;

	/** If true then hover conponent is shown else is children component*/
	defaultSelected?: boolean;
}

export const HoverButton = ({ children, hoverContent, defaultSelected, ...rest }: HoverButtonProps) => {
	const [isHovered, setisHovered] = useState(defaultSelected ?? false);
	const classDefaultContent = `transition-all text-center`;
	const classDefaultContentNotHovered = `${classDefaultContent} opacity-100`;
	const classDefaultContentHovered = `${classDefaultContent} opacity-0`;

	const classDefaultContentHover = `absolute inset-0 m-auto text-center transition-all`;
	const classDefaultContentHoverNotHovered = `${classDefaultContentHover} opacity-0`;
	const classDefaultContentHoverHovered = `${classDefaultContentHover} opacity-100`;

	const hover = () => {
		setisHovered(() => !isHovered);
	};
	return (
		<Button {...rest} onMouseEnter={hover} onMouseLeave={hover}>
			<div className="relative h-fit w-fit">
				<div className={isHovered ? classDefaultContentHovered : classDefaultContentNotHovered}>{children}</div>
				<div className={isHovered ? classDefaultContentHoverHovered : classDefaultContentHoverNotHovered}>
					{hoverContent}
				</div>
			</div>
		</Button>
	);
};
