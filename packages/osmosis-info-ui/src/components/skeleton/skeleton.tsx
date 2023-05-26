import React from "react";

/**

Skeletons are used to provide a temporary visual representation of a loading state or placeholder for content.
*/
export interface SkeletonProps {
	/** The height of the skeleton. Can be a number or a string with a valid CSS unit (e.g., "50px", "25%"). */
	height: number | string;

	/** The width of the skeleton. Can be a number or a string with a valid CSS unit (e.g., "50px", "25%"). */
	width: number | string;

	/** The color of the skeleton. Can be any valid CSS color value (e.g., "#ffffff", "rgba(0, 0, 0, 0.5)"). */
	color?: string;

	/** Determines whether the skeleton should have rounded corners. */
	rounded?: boolean;

	/** Additional class name(s) to apply to the skeleton. */
	className?: string;
}

export const Skeleton = ({ height, width, color, rounded, className }: SkeletonProps) => {
	const skeletonStyle: React.CSSProperties = {
		height,
		width,
		backgroundColor: color,
		borderRadius: rounded ? "50%" : "0",
		display: "block",
	};

	const classNameSkeleton = `animate-pulse ${className}`;

	return <div style={skeletonStyle} className={classNameSkeleton} />;
};
