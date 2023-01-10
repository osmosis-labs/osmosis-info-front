import React from "react";
import { useIsMobile } from "../../hooks/use-is-mobile";
import { useStore } from "../../stores";
import { SettingsPopover } from "../settings/settings-popover";
import { observer } from "mobx-react-lite";
import { ConnectButton } from "../connect-button/connect-button";

export const TopMenu = observer(() => {
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
				<ConnectButton />
				<SettingsPopover />
			</div>
		</div>
	);
});
