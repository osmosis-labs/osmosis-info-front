import React, { useRef } from "react";
import { Paper } from "../paper/paper";
import { Backdrop } from "../backdrop/backdrop";

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

export const Dialog = ({
	open,
	onClose,
	closeOnClickAway,
	children,
	classNamePaper,
	classNameBackdrop,
}: DialogProps) => {
	const refPaper = useRef<HTMLDivElement>(null);

	const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (refPaper.current) {
			const rectDialog = refPaper.current.getBoundingClientRect();
			const isInDialog =
				rectDialog.top <= event.clientY &&
				event.clientY <= rectDialog.top + rectDialog.height &&
				rectDialog.left <= event.clientX &&
				event.clientX <= rectDialog.left + rectDialog.width;
			if (!isInDialog && closeOnClickAway) onClose();
		}
	};
	return (
		<Backdrop
			open={open}
			onClick={onClick}
			className={`${classNameBackdrop} bg-backdrop-main flex items-center justify-center`}
		>
			<Paper className={classNamePaper} ref={refPaper}>
				{children}
			</Paper>
		</Backdrop>
	);
};
