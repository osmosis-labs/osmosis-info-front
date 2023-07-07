import React, { useState } from "react";
import { Dropdown, IconButton, ItemDropdown, Popover, SettingsSvg } from "@latouche/osmosis-info-ui";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores";
import { SUPPORTED_LANGUAGES } from "../../stores/app/settings-store/language";
import { useTranslation } from "react-multi-lang";

export const SettingsPopover = observer(() => {
	const [anchorElPopover, setAnchorElPopover] = useState<null | HTMLElement>(null);
	const { settingsStore } = useStore();
	const language = settingsStore.getSettingById("language")?.state.value;
	const t = useTranslation();

	const onClickOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElPopover(event.currentTarget);
	};
	const onClose = () => setAnchorElPopover(null);

	const openPopover = Boolean(anchorElPopover);

	const onChangeLanguage = (item: ItemDropdown<string>) => {
		settingsStore.getSettingById("language")?.setState({ value: item.value });
	};

	return (
		<>
			<IconButton onClick={onClickOpen} Icon={SettingsSvg} className="ml-2" variant="secondary" />
			<Popover
				onClose={onClose}
				open={openPopover}
				anchorElement={anchorElPopover}
				anchorPosition={{ x: "right", y: "bottom" }}
				popoverPosition={{
					x: "right",
					y: "top",
				}}
				classNamePaper="border-osmosverse-700 border-[2px] "
			>
				<div className="p-4">
					<p className="mb-4 text-xl">{t("settings.title")}</p>
					<div className="flex items-center">
						<p className="mr-4">{t("settings.language")}</p>
						<Dropdown<string>
							onChange={onChangeLanguage}
							value={language}
							items={SUPPORTED_LANGUAGES as ItemDropdown<string>[]}
							size="small"
							variant={"icon"}
						/>
					</div>
				</div>
			</Popover>
		</>
	);
});
