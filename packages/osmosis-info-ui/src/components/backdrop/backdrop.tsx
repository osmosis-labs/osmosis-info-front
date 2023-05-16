import React from "react";
import Portal from "../portal/portal";

/**
 * Backdrop is used for dialog, dropdown menu, popover...
 */

export interface BackdropProps {
	/** React element displayed in the backdrop. */
	children?: React.ReactElement;
	/** ClassName passed to the backdrop, can be used to change the background color for example. */
	className?: string;
	/** Boolean to show or hide the backdrop. */
	open: boolean;
	/** Calback when the backdrop was clicked */
	onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const Backdrop = ({ children, className, open, onClick }: BackdropProps) => {
	const classNameDefault = `fixed inset-0 overflow-hidden`;
	const classNameOpen = `${classNameDefault} ${className} z-50 opacity-100 dialogTransitionOpen`;
	const classNameClose = `${classNameDefault} ${className} -z-50 opacity-0 dialogTransitionClose`;

	const onClickBackdrop = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			if (onClick) onClick(event);
		}
	};
	return (
		<Portal>
			<div onClick={onClickBackdrop} className={open ? classNameOpen : classNameClose}>
				{children}
			</div>
		</Portal>
	);
};
