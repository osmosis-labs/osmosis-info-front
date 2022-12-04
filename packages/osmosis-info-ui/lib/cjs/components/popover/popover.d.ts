import React from "react";
/**
 * Component used to display a somes informations in popover, like menu, tooltips...
 */
export type PopoverPosisitonX = "right" | "left" | "center";
export type PopoverPosisitonY = "top" | "bottom" | "center";
export interface PopoverPosisiton {
	x: PopoverPosisitonX;
	y: PopoverPosisitonY;
}
export interface PopoverProps {
	/** React element displayed in the popover. */
	children?: React.ReactElement;
	/** ClassName passed to the backdrop, can be used to change the background color for example. */
	classNameBackdrop?: string;
	/** ClassName passed to the paper, can be used to change the border radius, backgournd color for example. */
	classNamePaper?: string;
	/** Boolean to show or hide the popover. */
	open: boolean;
	/** The relative element anchor. It's used to set the position of the popover.*/
	anchorElement: HTMLElement | null;
	/** Calback used to close the popover, like click outside. */
	onClose: () => void;
	/** The point relative to the anchor where the popover will be displayed. */
	anchorPosition?: PopoverPosisiton;
	/** the place where the popover will be positioned in relation to the anchor */
	popoverPosition?: PopoverPosisiton;
}
export declare const Popover: ({
	open,
	anchorElement,
	onClose,
	children,
	classNamePaper,
	classNameBackdrop,
	anchorPosition,
	popoverPosition,
}: PopoverProps) => JSX.Element;
