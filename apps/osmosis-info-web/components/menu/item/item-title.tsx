import { useRouter } from "next/router";
import { LeftSvg, MenuSvg, OsmosisSvg } from "@latouche/osmosis-info-ui";
import React from "react";
import { useStore } from "../../../stores";

export function ItemMenuTitle() {
	const router = useRouter();
	const {
		menuStore: { open, toggle },
	} = useStore();

	const onClick = () => {
		toggle();
	};

	const goTo = () => {
		router.push("/");
	};

	const goToOsmosis = () => {
		window?.open("https://app.osmosis.zone/", "_blank")?.focus();
	};

	let className = "";
	const defaultclassName = "flex items-center justify-between overflow-x-hidden mt-2 mb-3 w-[240px] transition-all";
	if (open) className = `${defaultclassName} -translate-x-[50px] `;
	else className = `${defaultclassName} translate-x-0`;
	return (
		<div className={className}>
			<div className="flex items-center">
				<MenuSvg
					onClick={onClick}
					width={40}
					height={40}
					className="my-2 ml-2 pr-2 cursor-pointer fill-main-400 hover:fill-wosmongton-100 duration-300"
				/>
				<OsmosisSvg className="my-2 ml-3 pr-2 cursor-pointer" width={40} onClick={goToOsmosis} />
				<p className="text-xl ml-2 cursor-pointer" onClick={goTo}>
					Info
				</p>
			</div>
			<LeftSvg
				onClick={onClick}
				strokeWidth={2}
				className="my-2 ml-2 pr-2 cursor-pointer stroke-main-400 scale-150 duration-300 hover:stroke-wosmongton-100 hover:-translate-x-2"
			/>
		</div>
	);
}
