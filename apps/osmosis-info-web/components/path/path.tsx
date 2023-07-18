import { LeftSvg } from "@latouche/osmosis-info-ui";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { twMerge } from "tailwind-merge";

export type Path = {
	name: string;
	href: string;
};
export type PathsProps = {
	paths: Path[];
	selected: number;
	className?: string;
};

export const Paths = ({ paths, selected, className }: PathsProps) => {
	return (
		<div className={twMerge("flex items-center", className)}>
			{paths.map((path, index) => {
				const isLast = index === paths.length - 1;
				return <PathElt path={path} isSelected={index === selected} isLast={isLast} key={index} />;
			})}
		</div>
	);
};

const PathElt = ({ path, isSelected, isLast }: { path: Path; isSelected: boolean; isLast: boolean }) => {
	const router = useRouter();

	const onClick = useCallback(() => {
		router.push(path.href);
	}, [path.href, router]);

	const defaultClassName = "cursor-pointer";
	const className = isSelected ? `text-osmosverse-200 ${defaultClassName}` : `text-osmosverse-400 ${defaultClassName}`;
	return (
		<div className="flex items-center">
			<span className={className} onClick={onClick}>
				{path.name}
			</span>
			{isLast ? (
				""
			) : (
				<LeftSvg className="mx-2 rotate-180 stroke-osmosverse-400 " height={24} width={24} strokeWidth="2" />
			)}
		</div>
	);
};
