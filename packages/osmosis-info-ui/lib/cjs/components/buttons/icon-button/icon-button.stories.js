"use strict";
exports.__esModule = true;
exports.Default = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var icon_button_1 = require("./icon-button");
var svg_1 = require("../../svg");
exports["default"] = {
    title: "Components/Inputs/Buttons/IconButton",
    component: icon_button_1.IconButton
};
var Template = function (args) { return react_1["default"].createElement(icon_button_1.IconButton, tslib_1.__assign({}, args)); };
Template.args = {};
exports.Default = Template.bind({});
exports.Default.args = {
    Icon: svg_1.SettingsSvg
};
exports.Default.storyName = "IconButton";
//# sourceMappingURL=icon-button.stories.js.map