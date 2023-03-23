module.exports = {
    type: 'module',
    "stories": [
        "../apps/**/*.stories.mdx",
        "../packages/**/*.stories.mdx",
        "../apps/**/*.stories.@(js|jsx|ts|tsx)",
        "../packages/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        {
            name: '@storybook/addon-postcss',
            options: {
                postcssLoaderOptions: {
                    implementation: require('postcss'),
                },
            },
        },
    ],
    "framework": "@storybook/react",
    "core": {
        "builder": "@storybook/builder-webpack5"
    },
    typescript: {
        check: false,
        checkOptions: {},
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
        },
    },
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.m?js/,
            resolve: {
                fullySpecified: false,
            },
        });

        config.module.rules.push({
            test: /\.m?js/,
            resolve: {
                fullySpecified: false,
            },
        });

        config.module.rules.push({
            test: /\.m?js$/,
            resolve: {
                fullySpecified: false,
            },
        });

        config.module.rules.push({
            test: /\.m?js$/,
            resolve: {
                fullySpecified: false,
            },
        });

        config.resolve.fallback = {
            path: require.resolve("path-browserify"),
            buffer: require.resolve("buffer/"),
            crypto: require.resolve("crypto-browserify"),
            stream: require.resolve("stream-browserify"),
            util: require.resolve("util/"),
            assert: require.resolve("assert/"),
            https: require.resolve("https-browserify"),
            http: require.resolve("stream-http"),
            os: require.resolve("os-browserify/browser"),
            vm: require.resolve("vm-browserify"),
            process: require.resolve("process/browser"),
            constants: require.resolve("constants-browserify"),
        };

        config.resolve.alias = {
            path: require.resolve("path-browserify"),
            buffer: require.resolve("buffer/"),
            crypto: require.resolve("crypto-browserify"),
            stream: require.resolve("stream-browserify"),
            util: require.resolve("util/"),
            assert: require.resolve("assert/"),
            https: require.resolve("https-browserify"),
            http: require.resolve("stream-http"),
            os: require.resolve("os-browserify/browser"),
            vm: require.resolve("vm-browserify"),
            process: require.resolve("process/browser"),
            constants: require.resolve("constants-browserify"),
        };

        return config;
    },
}