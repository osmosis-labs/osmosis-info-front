import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-multi-lang";
import { Formatted } from "../components/localization/formatted";
export default function NotFound() {
	const [title, setTitle] = useState<string>("");
	const t = useTranslation();
	useEffect(() => {
		// Used to refresh this page, need to fixe it.
		setTitle(() => t("404.title"));
	}, [t]);
	return (
		<div className="w-full flex items-center justify-center flex-col m-auto">
			<h1 className="text-2xl text-center">{title}</h1>
			<p className="mt-4 text-center">
				<Formatted
					translationKey="404.body"
					components={{
						"<link>": <Link className="text-ammelia-500" href="/" />,
					}}
				/>
			</p>

			<Image alt="Ion" src="/images/ion.svg" width="200" height="200" />
		</div>
	);
}
