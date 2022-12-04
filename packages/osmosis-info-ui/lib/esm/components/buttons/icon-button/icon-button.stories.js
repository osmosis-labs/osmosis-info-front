import { __assign } from "tslib";
import React from "react";
import { IconButton } from "./icon-button";
import { SettingsSvg } from "../../svg";
export default {
    title: "Components/Inputs/Buttons/IconButton",
    component: IconButton
};
var Template = function (args) { return React.createElement(IconButton, __assign({}, args)); };
Template.args = {};
export var Default = Template.bind({});
Default.args = {
    Icon: SettingsSvg
};
Default.storyName = "IconButton";
//# sourceMappingURL=icon-button.stories.js.map