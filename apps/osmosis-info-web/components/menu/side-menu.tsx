import { observer } from "mobx-react-lite";
import React from "react";
import { useIsMobile } from "../../hooks/use-is-mobile";
import { useStore } from "../../stores";
import ItemMenu from "./item/item-menu";
import { ItemMenuTitle } from "./item/item-title";
import { Item } from "./item/types";

export interface SideMenuProps {
	items: Item[];
}

const SideMenu = ({ items }: SideMenuProps) => {
	const isMobile = useIsMobile();
	const {
		menuStore: { open },
	} = useStore();

	let className = "";
	const defaultclassName =
		"bg-main-800 transition-all fixed left-0 h-screen overflow-x-hidden border-r-[1px] border-main-700 px-2 top-0";
	if (isMobile || isMobile === null) {
		className = `${defaultclassName} px-0 w-0 border-r-0`;
	}
	if (isMobile !== null && !isMobile) {
		if (open) className = `${defaultclassName} w-sideMenuOpen`;
		else className = `${defaultclassName} w-sideMenuClose`;
	}
	return (
		<div className={className}>
			<ItemMenuTitle />
			{items.map((item) => {
				return (
					<ItemMenu
						key={item.name}
						name={item.name}
						path={item.path}
						Icon={item.Icon}
						selectionTest={item.selectionTest}
					/>
				);
			})}
		</div>
	);
};

export default observer(SideMenu);
