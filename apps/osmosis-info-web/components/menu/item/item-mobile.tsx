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
	if (active) className = `${defaultclassName} bg-osmosverse-700 fill-white-50 `;
	else className = `${defaultclassName} fill-osmosverse-400 hover:bg-osmosverse-700 hover:fill-osmosverse-500`;
	return (
		<div className={className} onClick={goTo}>
			<span className="mx-auto">
				<Icon height={30} width={30} />
			</span>
			<p className="text-xs text-center mt-0.5">{name}</p>
		</div>
	);
}
