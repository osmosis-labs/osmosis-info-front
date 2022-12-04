import { observer } from "mobx-react-lite";
import React, { PropsWithChildren, FunctionComponent, useMemo } from "react";
import { useIsMobile } from "../../hooks/use-is-mobile";
import { useStore } from "../../stores";
import BottomMenu from "../menu/bottom-menu";
import SideMenu from "../menu/side-menu";

import TopMenu from "../menu/top-menu";
import { MainLayoutProps } from "./types";
import { Item } from "../menu/item/types";
import { DashboardSvg, OverviewSvg, PoolSvg, TokensSvg } from "@latouche/osmosis-info-ui";

const MainLayout: FunctionComponent<PropsWithChildren<MainLayoutProps>> = ({ children, className }) => {
	const isMobile = useIsMobile();
	const {
		menuStore: { open },
	} = useStore();

	const items = useMemo<Item[]>(() => {
		const its: Item[] = [];
		its.push({
			name: "Overview",
			path: "/",
			Icon: OverviewSvg,
			selectionTest: /\/$/,
		});

		its.push({
			name: "Pools",
			path: "/pools",
			Icon: PoolSvg,
			selectionTest: /\/pools/,
		});

		its.push({
			name: "Tokens",
			path: "/tokens",
			Icon: TokensSvg,
			selectionTest: /\/tokens/,
		});
		its.push({
			name: "Dashboard",
			path: "/dashboard",
			Icon: DashboardSvg,
			selectionTest: /\/dashboard/,
		});

		return its;
	}, []);

	let childrenClassName = ``;
	const defaultChildrenClassName = "min-h-screen w-full transition-colors";
	if (isMobile !== null && !isMobile) {
		if (open) childrenClassName = `${defaultChildrenClassName} p-childrenOpen`;
		else childrenClassName = `${defaultChildrenClassName} p-childrenClose`;
	} else {
		childrenClassName = `${defaultChildrenClassName} p-childrenBottomMenu`;
	}
	return (
		<div className="bg-main-900 flex">
			<TopMenu />
			<BottomMenu items={items} />
			<SideMenu items={items} />
			<div className={childrenClassName}>
				<div className={`${className} max-w-container min-h-full p-2`}>{children}</div>
			</div>
		</div>
	);
};

export default observer(MainLayout);
