import React from "react";
import { useRouter } from "next/router";
import { Item } from "./types";

export default function ItemMenu({ name, path, Icon, selectionTest }: Item) {
	const router = useRouter();
	const goTo = () => {
		router.push(path);
	};
	const active = selectionTest.test(router.pathname);

	let className = "";
	const defaultclassName =
		"flex items-center overflow-x-hidden rounded my-2 cursor-pointer transition-colors duration-default  ";
	if (active) className = `${defaultclassName} bg-main-500 fill-white-full `;
	else className = `${defaultclassName} fill-main-500 hover:bg-main-700 hover:fill-main-400`;
	return (
		<div className={className} onClick={goTo}>
			<span className="my-2 mx-[11px]">
				<Icon height={30} width={30} />
			</span>
			<p className="">{name}</p>
		</div>
	);
}
