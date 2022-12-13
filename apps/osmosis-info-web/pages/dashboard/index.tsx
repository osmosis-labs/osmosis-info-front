import React from "react";
import { useTranslation } from "react-multi-lang";
export default function Dashboard() {
	const t = useTranslation();

	return (
		<div>
			<h1 className="text-2xl">{t("dashboard.title")}</h1>
			<div></div>
		</div>
	);
}
