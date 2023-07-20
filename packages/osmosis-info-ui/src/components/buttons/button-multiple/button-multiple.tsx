import React from "react";

/**
 *ButtonMultiple is a component that displays a group of buttons, where only one button can be selected at a time.
 */

/**
 * ItemButtonMultiple is a generic type that represents an item in a ButtonMultiple component.
 * It has a label property of type string and a value property of type T.
 */
export type ItemButtonMultiple<T> = {
	/** The current label of item. */
	label: string;
	/** The current value of item. */
	value: T;
};

type ButtonMultipleProps = {
	/** The currently selected item. */
	selected: ItemButtonMultiple<any>;
	/**
	 * A callback function to handle the click event when a button is selected.
	 * The selected item value is passed as a parameter to the callback function.
	 */
	onClick: (value: ItemButtonMultiple<any>) => void;
	/**
	 * An array of items to be rendered as buttons.
	 */
	items: ItemButtonMultiple<any>[];
	/**
	 * Optional class name for the component.
	 */
	className?: string;
};

export const ButtonMultiple = ({ selected, onClick, items, className }: ButtonMultipleProps) => {
	const onClickItem = (item: ItemButtonMultiple<any>) => {
		onClick(item);
	};

	const currentClassName = `${className} flex w-full justify-center items-center bg-osmosverse-900 rounded-full select-none`;

	const classItem =
		"flex justify-center items-center cursor-pointer rounded-full px-3 min-w-[36px] py-[6px] w-full transition-all duration-300 ease-in-out whitespace-nowrap";
	const classItemSelected = classItem + " bg-wosmongton-700 hover:bg-wosmongton-400 ";
	const classItemNotSelected = classItem + " text-osmosverse-400 hover:text-osmosverse-200 ";
	return (
		<div className={currentClassName}>
			{items.map((item) => {
				return (
					<div
						key={item.value}
						className={item.value === selected.value ? classItemSelected : classItemNotSelected}
						onClick={() => {
							onClickItem(item);
						}}
					>
						{item.label}
					</div>
				);
			})}
		</div>
	);
};
