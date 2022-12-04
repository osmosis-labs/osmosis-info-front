"use strict";
exports.__esModule = true;
exports.Default = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var button_1 = require("./button");
exports["default"] = {
    title: "Components/Inputs/Buttons/Button",
    component: button_1.Button,
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
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "grid grid-cols-6 items-center justify-items-center" },
            react_1["default"].createElement(button_1.Button, { onClick: onClick }, "Default"),
            react_1["default"].createElement(button_1.Button, { onClick: onClick, size: "small" }, "Small"),
            react_1["default"].createElement(button_1.Button, { onClick: onClick, variant: "secondary" }, "Secondary"),
            react_1["default"].createElement(button_1.Button, { onClick: onClick, variant: "warning" }, "Warning"),
            react_1["default"].createElement(button_1.Button, { onClick: onClick, disabled: true, variant: "secondary" }, "Secondary disabled"),
            react_1["default"].createElement(button_1.Button, { onClick: onClick, disabled: true }, "Disabled")),
        react_1["default"].createElement("div", { className: "flex items-center justify-center m-2 p-4" },
            react_1["default"].createElement(button_1.Button, tslib_1.__assign({}, args), args.children))));
};
Template.args = {};
exports.Default = Template.bind({});
exports.Default.args = { children: "Button" };
exports.Default.storyName = "Button";
//# sourceMappingURL=button.stories.js.map