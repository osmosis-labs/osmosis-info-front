import React from "react";
/** Dialog can be use to display some informations or forms... */
export interface DialogProps {
	/** Element to display on the dialog. */
	children?: React.ReactElement;
	/** ClassName passed to the paper, can be used to change the border radius, backgournd color for example. */
	classNamePaper?: string;
	/** ClassName passed to the backdrop, can be used to change the background color for example. */
	classNameBackdrop?: string;
	/** Boolean to show or hide the popover. */
	open: boolean;
	/** Calback used to close the dialog. */
	onClose: () => void;
	/** Allow to close the dialog when the user click outside */
	closeOnClickAway?: boolean;
}
export declare const Dialog: ({
	open,
	onClose,
	closeOnClickAway,
	children,
	classNamePaper,
	classNameBackdrop,
}: DialogProps) => JSX.Element;
