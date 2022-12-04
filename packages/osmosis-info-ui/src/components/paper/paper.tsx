import React, { forwardRef } from "react";

/** Paper is a basic component highlight other elements */

export interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
	/** React element displayed in the paper. */
	children?: React.ReactElement | React.ReactElement[];
	/** ClassName passed to the paper, can be used to change the background color for example. */
	className?: string;
}

export const Paper = forwardRef<HTMLDivElement, PaperProps>(({ children, className, ...props }: PaperProps, ref) => {
	return (
		<div ref={ref} className={`${className} p-2 bg-main-800 rounded-xl`} {...props}>
			{children}
		</div>
	);
});
Paper.displayName = "Paper";
