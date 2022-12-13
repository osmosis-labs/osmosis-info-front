import React, { SVGProps, useState } from "react";
import { Popover } from "../popover/popover";
import { BottomSvg } from "../svg";
import { DropdownItem } from "./dropdown-item";

/**
 * Dropdown are used select on value into list.
 */

export interface ItemDropdown<T> {
	/** To be used in onChange function and to check is element was selected */
	value: T;
	/** Display of the value */
	display: string;
	/** Icon to display */
	Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

export interface DropdownProps<T> {
	/** Classname passed to the dropdown.*/
	className?: string;
	/** Text to display on the dropdown.*/
	items: ItemDropdown<T>[];
	/** If the dropdown can be used.*/
	disabled?: boolean;
	/** Callback for when the value change */
	onChange?: (item: ItemDropdown<T>) => void;
	/** Value was selected */
	value: T;
	/** Vairant determine if we use icon or not */
	variant?: "icon" | "default";
	/** Used to reduce the size of the dropdown.*/
	size?: "small" | "medium";
}

export function Dropdown<T>({ className, items, disabled, onChange, value, variant, size }: DropdownProps<T>) {
	const [anchorElPopover, setAnchorElPopover] = useState<null | HTMLElement>(null);

	const onClickOpen = (event: React.MouseEvent<HTMLElement>) => {
		if (!disabled) setAnchorElPopover(event.currentTarget);
	};
	const onClose = () => setAnchorElPopover(null);

	const onClickItem = (item: ItemDropdown<T>) => {
		if (onChange && !disabled) onChange(item);
		onClose();
	};
	const openPopover = Boolean(anchorElPopover);
	const itemSelected = items?.length > 0 ? items.find((item) => item.value === value) : null;

	const classNameDefault = `	duration-default rounded-lg w-fit transition-colors cursor-pointer h-fit whitespace-nowrap max-w-full 
								overflow-hidden text-ellipsis inline-flex items-center justify-center`;
	const classNameSmall = `	px-4 py-2`;
	const classNameMedium = `	px-4 py-4`;
	const classNameOutlined = `	border-2 border-main-600 `;
	const classNameIconHover = `[&>svg]:hover:fill-wosmongton-100 [&>svg]:fill-main-400`;
	const classNameDisabled = `	cursor-not-allowed cursor-not-allowed text-main-100 [&>svg]:fill-main-100 `;
	const classNameWithIcon = `	`;
	const classNameHover = `	hover:border-wosmongton-200 transition-colors`;

	const classNameIcon = `		ml-2 duration-default`;
	const classNameIconLeft = `	mr-2 rounded-full flex items-center justify-center`;

	let classNameDropdown = `${className} ${classNameDefault} ${classNameOutlined}`;
	if (variant === "icon") classNameDropdown = `${classNameDropdown} ${classNameWithIcon}`;
	if (size === "small") classNameDropdown = `${classNameDropdown} ${classNameSmall}`;
	else classNameDropdown = `${classNameDropdown} ${classNameMedium}`;
	if (disabled) classNameDropdown = `${classNameDropdown} ${classNameDisabled}`;
	else classNameDropdown = `${classNameDropdown} ${classNameHover} ${classNameIconHover}`;
	return (
		<div className="w-fit h-fit inline-flex">
			<div onClick={onClickOpen} className={classNameDropdown}>
				{variant === "icon" && itemSelected?.Icon ? (
					<span className={classNameIconLeft}>
						<itemSelected.Icon height={24} width={24} />
					</span>
				) : null}
				<p>{itemSelected?.display ?? ""}</p>
				<BottomSvg className={classNameIcon} height={8} width={14} />
			</div>
			<Popover
				open={openPopover}
				onClose={onClose}
				anchorElement={anchorElPopover}
				anchorPosition={{ x: "right", y: "bottom" }}
				popoverPosition={{ x: "right", y: "top" }}
				classNamePaper={`p-0 bg-main-800 rounded-xl`}
			>
				<div>
					{items.map(({ value, display, Icon }, index) => {
						return (
							<DropdownItem
								isFirst={index === 0}
								isLast={index === items.length - 1}
								key={`${index}-${display}`}
								variant={variant}
								selected={itemSelected?.value === value}
								Icon={Icon}
								display={display}
								onClickItem={onClickItem}
								value={value}
							/>
						);
					})}
				</div>
			</Popover>
		</div>
	);
}
