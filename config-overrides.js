module.exports = function override(webpackConfig) {
	webpackConfig.resolve.alias = {
		...webpackConfig.resolve.alias,
		"@ledgerhq/devices/hid-framing": "@ledgerhq/devices/lib/hid-framing",
	}

	return webpackConfig
}
