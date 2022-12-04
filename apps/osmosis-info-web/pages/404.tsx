import Image from "next/image";
import Link from "next/link";
import React from "react";
export default function NotFound() {
	return (
		<div className="w-full flex items-center justify-center flex-col m-auto">
			<h1 className="text-2xl text-center">Page not found</h1>
			<p className="mt-4 text-center">
				Oops, we could not find the page you were looking for. Come back to
				<Link className="text-ammelia-500" href="/">
					{" "}
					Overview
				</Link>
				.
			</p>
			<Image alt="Ion" src="/images/ion.svg" width="200" height="200" />
		</div>
	);
}
