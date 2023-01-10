import React from "react";
import { useTranslation } from "react-multi-lang";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores";

const Overview = observer(() => {
	const t = useTranslation();
	const { userStore } = useStore();

	return (
		<div>
			<h1 className="text-2xl">{t("overview.title")}</h1>
			{userStore.name ? <p className="text-lg">Hello {userStore.name}</p> : ""}
		</div>
	);
});

export default Overview;
