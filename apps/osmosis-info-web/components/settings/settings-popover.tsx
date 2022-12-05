import React, { useEffect, useState } from "react";
import { Backdrop, IconButton, Popover, SettingsSvg } from "@latouche/osmosis-info-ui";
import { createPortal } from "react-dom";
import Portal from "@latouche/osmosis-info-ui/lib/esm/components/portal/portal";

//TO DO SSR MODAL
export const SettingsPopover = () => {
	const [anchorElPopover, setAnchorElPopover] = useState<null | HTMLElement>(null);
	const [isMounted, setIsMounted] = useState<boolean>(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const onClickOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElPopover(event.currentTarget);
	};
	console.log("settings-popover.tsx -> 12: anchorElPopover", anchorElPopover);
	const onClose = () => setAnchorElPopover(null);

	const openPopover = Boolean(anchorElPopover);
	return (
		<>
			<IconButton onClick={onClickOpen} Icon={SettingsSvg} className="ml-2" />

			<Popover
				onClose={onClose}
				open={openPopover}
				anchorElement={anchorElPopover}
				anchorPosition={{ x: "center", y: "center" }}
				popoverPosition={{
					x: "center",
					y: "center",
				}}
				classNameBackdrop="bg-main-200"
			>
				<div>
					<p>Hello</p>
				</div>
			</Popover>
		</>
	);
};
