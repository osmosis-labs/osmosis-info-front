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

	const defaultclassName =
		"bg-osmosverse-800 transition-all fixed left-0 h-screen overflow-x-hidden border-osmosverse-700 top-0";

	const classNameShowOpen = `${defaultclassName} border-r-[1px] px-2 w-sideMenuOpen`;
	const classNameShowClose = `${defaultclassName}  border-r-[1px] px-2 w-sideMenuClose `;
	const classNameHide = `${defaultclassName} px-0 w-0 border-r-0`;

	return (
		<div className={isMobile || isMobile === null ? classNameHide : open ? classNameShowOpen : classNameShowClose}>
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
