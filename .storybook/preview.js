import "../apps/osmosis-info-web/styles/globals.css";
export const parameters = {
    layout: 'centered',
    backgrounds: {
        default: 'dark',
        values: [
            {
                name: 'gray',
                value: '#eceff1',
            },
            {
                name: 'light',
                value: '#fff',
            },
            {
                name: 'dark',
                value: '#140F34',
            },
        ],
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}