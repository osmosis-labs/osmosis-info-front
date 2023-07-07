import React from "react";
import { useRouter } from "next/router";
import { Item } from "./types";
import { useTranslation } from "react-multi-lang";

export default function ItemMenu({ name, path, Icon, selectionTest }: Item) {
	const router = useRouter();
	const t = useTranslation();
	const goTo = () => {
		router.push(path);
	};
	const active = selectionTest.test(router.pathname);

	let className = "";
	const defaultclassName =
		"flex items-center overflow-x-hidden rounded my-2 cursor-pointer transition-colors duration-default  ";
	if (active) className = `${defaultclassName} bg-osmosverse-700 fill-white-50 text-white-50 `;
	else
		className = `${defaultclassName} fill-osmosverse-400 text-osmosverse-400 hover:text-white-50 hover:bg-osmosverse-700 hover:fill-white-50`;

	return (
		<div className={className} onClick={goTo}>
			<span className="my-2 mx-[11px]">
				<Icon height={30} width={30} />
			</span>
			<p className="">{t(name)}</p>
		</div>
	);
}
