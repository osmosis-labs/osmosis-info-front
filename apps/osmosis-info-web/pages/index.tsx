import React from "react";
import { useTranslation } from "react-multi-lang";
import { observer } from "mobx-react-lite";

const Overview = observer(() => {
	const t = useTranslation();

	return (
		<div>
			<h1 className="text-2xl">{t("overview.title")}</h1>
			<div></div>
		</div>
	);
});

export default Overview;
