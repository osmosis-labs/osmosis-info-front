import React, { SVGProps } from "react";
import { ItemDropdown } from "./dropdown";

/**
 * DropdownItem are used in Dropdown.
 */

export interface DropdownItemProps<T> {
	/** Text to display on the dropdown.*/
	display: string;
	/** Icon to display.*/
	Icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
	/** Vairant determine if we use icon or not */
	variant?: "icon" | "default";
	/** Determine if is the current element */
	selected?: boolean;
	/** Used to determine if the first element, for style*/
	isFirst?: boolean;
	/** Used to determine if the last element, for style*/
	isLast?: boolean;
	/** Used to feeback user choice*/
	onClickItem: (item: ItemDropdown<T>) => void;
	/** Used to rebuild item for onClickItem*/
	value: T;
}

export function DropdownItem<T>({
	display,
	Icon,
	variant,
	selected,
	isLast,
	isFirst,
	value,
	onClickItem,
}: DropdownItemProps<T>) {
	const classNameDefault = `	duration-default transition-colors cursor-pointer h-fit whitespace-nowrap max-w-full 
								overflow-hidden text-ellipsis py-2 px-4`;
	const classNamehover = `	hover:bg-osmosverse-500 transition-colors`;
	const classNameWithIcon = `	flex items-center`;
	const classNameSelected = `	bg-osmosverse-700`;
	const classNameLast = `		rounded-b-lg`;
	const classNameFirst = `	rounded-t-lg`;
	const classNameIcon = `		mr-2 duration-default`;

	let classNameDropdownItem = `${classNameDefault} ${classNamehover}`;
	if (isFirst) classNameDropdownItem = `${classNameDropdownItem} ${classNameFirst}`;
	if (isLast) classNameDropdownItem = `${classNameDropdownItem} ${classNameLast}`;
	if (variant === "icon") classNameDropdownItem = `${classNameDropdownItem} ${classNameWithIcon}`;
	if (selected) classNameDropdownItem = `${classNameDropdownItem} ${classNameSelected}`;

	const onClick = () => {
		onClickItem({ display, value } as ItemDropdown<T>);
	};

	if (variant === "icon") {
		return (
			<div className={classNameDropdownItem} onClick={onClick}>
				{Icon && <Icon height={20} width={21} className={classNameIcon} />}
				<p>{display}</p>
			</div>
		);
	}
	return (
		<div className={classNameDropdownItem} onClick={onClick}>
			<p>{display}</p>
		</div>
	);
}
