import React from "react";
import { useTranslation } from "react-multi-lang";
export default function Tokens() {
	const t = useTranslation();
	return (
		<div>
			<h1 className="text-2xl">{t("tokens.title")}</h1>
			<div></div>
		</div>
	);
}
