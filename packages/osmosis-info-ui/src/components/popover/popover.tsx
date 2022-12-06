import React, { useRef } from "react";
import { Paper } from "../paper/paper";
import { Backdrop } from "../backdrop/backdrop";

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

export const Popover = ({
	open,
	anchorElement,
	onClose,
	children,
	classNamePaper,
	classNameBackdrop,
	anchorPosition = { x: "left", y: "bottom" },
	popoverPosition = { x: "left", y: "top" },
}: PopoverProps) => {
	const refPaper = useRef<any>(null);
	let x = 0;
	let y = 0;
	if (refPaper.current && anchorElement) {
		const rect = anchorElement.getBoundingClientRect();
		if (anchorPosition.x === "right") x = rect.x + rect.width;
		else if (anchorPosition.x === "left") x = rect.x;
		else x = rect.x + rect.width / 2;

		if (anchorPosition.y === "bottom") y = rect.y + rect.height;
		else if (anchorPosition.y === "top") y = rect.y;
		else y = rect.y + rect.height / 2;

		if (refPaper.current) {
			const rectPaper = refPaper.current.getBoundingClientRect();
			if (popoverPosition.x === "right") x = x - rectPaper.width;
			else if (popoverPosition.x === "center") x = x - rectPaper.width / 2;

			if (popoverPosition.y === "bottom") y = y - rectPaper.height;
			else if (popoverPosition.y === "center") y = y - rectPaper.height / 2;
		}
	}
	const classNameDefault = `${classNamePaper} fixed `;
	const classNameOpen = `${classNameDefault} popoverTransitionOpen`;
	const classNameClose = `${classNameDefault} popoverTransitionClose`;

	return (
		<Backdrop open={open} onClick={onClose} className={classNameBackdrop}>
			<Paper ref={refPaper} className={open ? classNameOpen : classNameClose} style={{ top: y, left: x }}>
				{children}
			</Paper>
		</Backdrop>
	);
};
