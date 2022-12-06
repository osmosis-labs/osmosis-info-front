import React, { useState } from "react";
import { IconButton, Popover, SettingsSvg } from "@latouche/osmosis-info-ui";

export const SettingsPopover = () => {
	const [anchorElPopover, setAnchorElPopover] = useState<null | HTMLElement>(null);

	const onClickOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElPopover(event.currentTarget);
	};
	const onClose = () => setAnchorElPopover(null);

	const openPopover = Boolean(anchorElPopover);
	return (
		<>
			<IconButton onClick={onClickOpen} Icon={SettingsSvg} className="ml-2" />
			<Popover
				onClose={onClose}
				open={openPopover}
				anchorElement={anchorElPopover}
				anchorPosition={{ x: "left", y: "bottom" }}
				popoverPosition={{
					x: "left",
					y: "top",
				}}
			>
				<p>Hello</p>
			</Popover>
		</>
	);
};
