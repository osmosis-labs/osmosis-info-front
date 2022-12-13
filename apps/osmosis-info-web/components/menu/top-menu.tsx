import React from "react";
import { useIsMobile } from "../../hooks/use-is-mobile";
import { useStore } from "../../stores";
import { SettingsPopover } from "../settings/settings-popover";

export default function TopMenu() {
	const isMobile = useIsMobile();
	const {
		menuStore: { open },
	} = useStore();

	let childrenClassName = "";
	const defaultChildrenClassName =
		"bg-main-900 bg-opacity-50 h-topMenu fixed right-0 transition-all backdrop-blur-[2px] z-10 border-b-[1px] border-main-800";
	if (isMobile !== null && !isMobile) {
		if (open) childrenClassName = `${defaultChildrenClassName} w-childrenOpen`;
		else childrenClassName = `${defaultChildrenClassName} w-childrenClose`;
	} else {
		childrenClassName = `${defaultChildrenClassName} w-full`;
	}
	return (
		<div className={childrenClassName}>
			<div className="flex items-center justify-end h-full w-full p-2">
				<span className="my-auto">TopMenu</span>
				<SettingsPopover />
			</div>
		</div>
	);
}
