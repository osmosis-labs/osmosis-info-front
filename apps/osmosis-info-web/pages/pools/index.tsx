import React from "react";
import { useTranslation } from "react-multi-lang";
export default function Pools() {
	const t = useTranslation();
	return (
		<div className="w-full">
			<h1 className="text-2xl">{t("pools.title")}</h1>
		</div>
	);
}
