import React from "react";
import { Button } from "./button";
export default {
    title: "Components/Inputs/Buttons/Button",
    component: Button,
    parameters: {
        docs: {
            description: {
                component: "Button is used to catch user action."
            }
        }
    }
};
var Template = function () {
    return (React.createElement("div", null,
        React.createElement("div", { className: "grid grid-cols-6 items-center justify-items-center" },
            React.createElement(Button, null))));
};
Template.args = {};
export var Default = Template.bind({});
Default.args = { children: "Button" };
Default.storyName = "Button";
//# sourceMappingURL=button.stories.js.map