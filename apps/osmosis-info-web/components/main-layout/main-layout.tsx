import { observer } from "mobx-react-lite";
import React, { PropsWithChildren, FunctionComponent, useMemo, useEffect } from "react";
import { useIsMobile } from "../../hooks/use-is-mobile";
import { useStore } from "../../stores";
import BottomMenu from "../menu/bottom-menu";
import SideMenu from "../menu/side-menu";
import { setLanguage, useTranslation } from "react-multi-lang";

import { MainLayoutProps } from "./types";
import { Item } from "../menu/item/types";
import { DashboardSvg, OverviewSvg, PoolSvg, TokensSvg } from "@latouche/osmosis-info-ui";
import { TopMenu } from "../menu/top-menu";

const MainLayout: FunctionComponent<PropsWithChildren<MainLayoutProps>> = observer(({ children, className }) => {
	const isMobile = useIsMobile();
	const {
		menuStore: { open },
		settingsStore,
	} = useStore();
	const language = settingsStore.getSettingById("language")?.state.value;

	// useLanguage();
	const t = useTranslation();
	const items = useMemo<Item[]>(() => {
		const its: Item[] = [];
		its.push({
			name: t("menu.overview"),
			path: "/",
			Icon: OverviewSvg,
			selectionTest: /\/$/,
		});

		its.push({
			name: t("menu.pools"),
			path: "/pools",
			Icon: PoolSvg,
			selectionTest: /\/pools/,
		});

		its.push({
			name: t("menu.tokens"),
			path: "/tokens",
			Icon: TokensSvg,
			selectionTest: /\/tokens/,
		});
		its.push({
			name: t("menu.dashboard"),
			path: "/dashboard",
			Icon: DashboardSvg,
			selectionTest: /\/dashboard/,
		});

		return its;
	}, [t]);
	useEffect(() => {
		setLanguage(language);
	}, [language]);

	let childrenClassName = ``;
	const defaultChildrenClassName = "min-h-screen w-full transition-colors";
	if (isMobile !== null && !isMobile) {
		if (open) childrenClassName = `${defaultChildrenClassName} p-childrenOpen`;
		else childrenClassName = `${defaultChildrenClassName} p-childrenClose`;
	} else {
		childrenClassName = `${defaultChildrenClassName} p-childrenBottomMenu`;
	}

	return (
		<div className="bg-background flex">
			<TopMenu />
			<BottomMenu items={items} />
			<SideMenu items={items} />
			<div className={childrenClassName}>
				<div className={`${className} min-h-full p-2`}>{children}</div>
			</div>
		</div>
	);
});

export default MainLayout;
