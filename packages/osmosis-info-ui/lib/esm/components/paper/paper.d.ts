import React from "react";
/** Paper is a basic component highlight other elements */
export interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
	/** React element displayed in the paper. */
	children?: React.ReactElement | React.ReactElement[];
	/** ClassName passed to the paper, can be used to change the background color for example. */
	className?: string;
}
export declare const Paper: React.ForwardRefExoticComponent<PaperProps & React.RefAttributes<HTMLDivElement>>;
