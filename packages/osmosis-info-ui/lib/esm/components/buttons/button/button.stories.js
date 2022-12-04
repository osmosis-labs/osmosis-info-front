import { __assign } from "tslib";
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
var Template = function (args) {
    var onClick = function () { return undefined; };
    return (React.createElement("div", null,
        React.createElement("div", { className: "grid grid-cols-6 items-center justify-items-center" },
            React.createElement(Button, { onClick: onClick }, "Default"),
            React.createElement(Button, { onClick: onClick, size: "small" }, "Small"),
            React.createElement(Button, { onClick: onClick, variant: "secondary" }, "Secondary"),
            React.createElement(Button, { onClick: onClick, variant: "warning" }, "Warning"),
            React.createElement(Button, { onClick: onClick, disabled: true, variant: "secondary" }, "Secondary disabled"),
            React.createElement(Button, { onClick: onClick, disabled: true }, "Disabled")),
        React.createElement("div", { className: "flex items-center justify-center m-2 p-4" },
            React.createElement(Button, __assign({}, args), args.children))));
};
Template.args = {};
export var Default = Template.bind({});
Default.args = { children: "Button" };
Default.storyName = "Button";
//# sourceMappingURL=button.stories.js.map