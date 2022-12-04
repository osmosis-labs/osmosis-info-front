import React, { useState } from "react";
import { IconButton, SettingsSvg } from "@latouche/osmosis-info-ui";

//TO DO SSR MODAL
export const SettingsPopover = () => {
	const [anchorElPopover, setAnchorElPopover] = useState<null | HTMLElement>(null);

	const onClickOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElPopover(event.currentTarget);
	};
	console.log("settings-popover.tsx -> 12: anchorElPopover", anchorElPopover);
	// const onClose = () => setAnchorElPopover(null);

	// const openPopover = Boolean(anchorElPopover);
	return (
		<>
			<IconButton onClick={onClickOpen} Icon={SettingsSvg} className="ml-2" />
			{/* <Popover
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
			</Popover> */}
		</>
	);
};
