import { __assign } from "tslib";
import React from "react";
import { SettingsSvg, DashboardSvg, MenuSvg, TokensSvg, LeftSvg, OsmosisSvg, OverviewSvg, PoolSvg } from "./";
export default {
    title: "Assets/Icons",
    subcomponents: {
        DashboardSvg: DashboardSvg,
        MenuSvg: MenuSvg,
        TokensSvg: TokensSvg,
        LeftSvg: LeftSvg,
        OsmosisSvg: OsmosisSvg,
        OverviewSvg: OverviewSvg,
        PoolSvg: PoolSvg,
        SettingsSvg: SettingsSvg
    }
};
var argsFill = {
    fill: "#736CA3",
    height: 60,
    width: 60
};
var argsTypeFill = {
    fill: {
        control: { type: "color", presetColors: ["#736CA3", "green"] }
    }
};
var argsStroke = {
    stroke: "#736CA3",
    height: 60,
    width: 60
};
var argsTypeStroke = {
    stroke: {
        control: { type: "color", presetColors: ["#736CA3", "green"] }
    }
};
export var Osmosis = function (args) { return React.createElement(OsmosisSvg, __assign({}, args)); };
Osmosis.args = {
    height: 60,
    width: 60
};
export var Dashboard = function (args) { return React.createElement(DashboardSvg, __assign({}, args)); };
Dashboard.args = argsFill;
Dashboard.argTypes = argsTypeFill;
export var Left = function (args) { return React.createElement(LeftSvg, __assign({}, args)); };
Left.args = argsStroke;
Left.argTypes = argsTypeStroke;
export var Menu = function (args) { return React.createElement(MenuSvg, __assign({}, args)); };
Menu.args = argsFill;
Menu.argTypes = argsTypeFill;
export var Overview = function (args) { return React.createElement(OverviewSvg, __assign({}, args)); };
Overview.args = argsFill;
Overview.argTypes = argsTypeFill;
export var Pools = function (args) { return React.createElement(PoolSvg, __assign({}, args)); };
Pools.args = argsFill;
Pools.argTypes = argsTypeFill;
export var Tokens = function (args) { return React.createElement(TokensSvg, __assign({}, args)); };
Tokens.args = argsFill;
Tokens.argTypes = argsTypeFill;
export var Settings = function (args) { return React.createElement(SettingsSvg, __assign({}, args)); };
Settings.args = argsFill;
Settings.argTypes = argsTypeFill;
//# sourceMappingURL=_svg.stories.js.map