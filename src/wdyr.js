import React from "react"

if (process.env.NODE_ENV === "development") {
	const whyDidYouRender = require("@welldone-software/why-did-you-render")
	whyDidYouRender(React, {
		collapseGroups: true,
		trackAllPureComponents: true,
		logOnDifferentValues: true,
		trackHooks: true,
		logOwnerReasons: true,
		exclude: [/^n/],
	})
}
