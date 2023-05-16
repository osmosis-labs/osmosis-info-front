import React from "react";
import { observer } from "mobx-react-lite";
import { ItemMobile } from "./item/item-mobile";
import { useIsMobile } from "../../hooks/use-is-mobile";
import { Item } from "./item/types";
export interface BottomMenuProps {
	items: Item[];
}

function BottomMenu({ items }: BottomMenuProps) {
	const isMobile = useIsMobile();
	const className =
		"w-full grid grid-cols-4 bg-background bg-opacity-50 h-bottomMenu fixed bottom-0 left-0 transition-all backdrop-blur-[2px] z-10 border-t-[1px] border-primary-800";

	const classNameHide =
		"w-full grid grid-cols-4 bg-background bg-opacity-50 fixed bottom-0 left-0 transition-all backdrop-blur-[2px] z-10 border-t-[1px] border-primary-800 h-0";

	return (
		<div className={isMobile === null || !isMobile ? classNameHide : className}>
			{items.map((item) => {
				return (
					<ItemMobile
						name={item.name}
						key={item.name}
						path={item.path}
						Icon={item.Icon}
						selectionTest={item.selectionTest}
					/>
				);
			})}
		</div>
	);
}
export default observer(BottomMenu);
