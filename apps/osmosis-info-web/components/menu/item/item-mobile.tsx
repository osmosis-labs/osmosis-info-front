import React from "react";
import { useRouter } from "next/router";
import { Item } from "./types";

export function ItemMobile({ name, path, Icon, selectionTest }: Item) {
	const router = useRouter();
	const goTo = () => {
		router.push(path);
	};

	const active = selectionTest.test(router.pathname);

	let className = "";
	const defaultclassName = "grid grid-rows-itemMenu items-center justify-center m-2 p-2 rounded";
	if (active) className = `${defaultclassName} bg-main-500 fill-white-full `;
	else className = `${defaultclassName} fill-main-500 hover:bg-main-700 hover:fill-main-400`;
	return (
		<div className={className} onClick={goTo}>
			<span className="mx-auto">
				<Icon height={30} width={30} />
			</span>
			<p className="text-xs text-center mt-0.5">{name}</p>
		</div>
	);
}
