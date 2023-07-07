import { SearchSVG } from "@latouche/osmosis-info-ui";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { DialogSearch } from "./dialog-search";
import { useTranslation } from "react-multi-lang";

export const Search = observer(() => {
	const [openSearch, setOpenSearch] = useState(false);

	const t = useTranslation();

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === "k") {
				event.preventDefault();
				setOpenSearch(true);
			}
			if (event.key === "Escape") {
				onClose();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	const onClose = () => {
		setOpenSearch(false);
	};

	const onOpen = () => {
		setOpenSearch(true);
	};

	return (
		<div className="flex mr-4 md:mr-2">
			<DialogSearch open={openSearch} onClose={onClose} />
			<div
				className="flex items-center border-[1px] border-osmosverse-500 rounded-xl px-4 md:px-2 py-2"
				onClick={onOpen}
			>
				<SearchSVG className="stroke-osmosverse-300 w-[32px]" height={22} width={24} />
				<span className="ml-1 bloc w-fit md:max-w-[140px] text-osmosverse-400 overflow-hidden text-ellipsis whitespace-nowrap md:text-sm">
					{t("search.placeholderBar")}
				</span>
				<span className="ml-16 md:hidden text-osmosverse-500 bg-osmosverse-800 rounded-lg px-2 py-1 text-sm">
					{t("search.shortcutOpen")}
				</span>
			</div>
		</div>
	);
});
