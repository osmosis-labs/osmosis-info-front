import React from "react";

export interface DivMaxWidthProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactElement | React.ReactElement[];
	classNameRoot?: string;
	classNameContainer?: string;
}

export const DivMaxWidth = ({ children, classNameContainer = "", classNameRoot = " ", ...rest }: DivMaxWidthProps) => {
	return (
		<div className={"flex flex-col justify-center items-center " + classNameRoot} {...rest}>
			<div className={"max-w-container w-full " + classNameContainer}>{children}</div>
		</div>
	);
};
