import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

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
	const [mountNode, setMountNode] = useState<null | HTMLElement>(null);
	useEffect(() => {
		setMountNode(document.body);
	}, []);

	const classNameDefault = `fixed inset-0 overflow-hidden`;
	const classNameOpen = `${classNameDefault} ${className} z-50 opacity-100 dialogTransitionOpen`;
	const classNameClose = `${classNameDefault} ${className} -z-50 opacity-0 dialogTransitionClose`;
	return (
		<React.Fragment>
			{mountNode
				? createPortal(
						<div onClick={onClick} className={open ? classNameOpen : classNameClose}>
							{children}
						</div>,
						mountNode
				  )
				: null}
		</React.Fragment>
	);
};
