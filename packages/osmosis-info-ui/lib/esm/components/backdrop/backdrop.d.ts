import React from "react";
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
export declare const Backdrop: ({ children, className, open, onClick }: BackdropProps) => JSX.Element;
