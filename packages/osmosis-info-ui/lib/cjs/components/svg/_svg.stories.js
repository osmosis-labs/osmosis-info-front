"use strict";
exports.__esModule = true;
exports.Settings = exports.Tokens = exports.Pools = exports.Overview = exports.Menu = exports.Left = exports.Dashboard = exports.Osmosis = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var _1 = require("./");
exports["default"] = {
    title: "Assets/Icons",
    subcomponents: {
        DashboardSvg: _1.DashboardSvg,
        MenuSvg: _1.MenuSvg,
        TokensSvg: _1.TokensSvg,
        LeftSvg: _1.LeftSvg,
        OsmosisSvg: _1.OsmosisSvg,
        OverviewSvg: _1.OverviewSvg,
        PoolSvg: _1.PoolSvg,
        SettingsSvg: _1.SettingsSvg
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
var Osmosis = function (args) { return react_1["default"].createElement(_1.OsmosisSvg, tslib_1.__assign({}, args)); };
exports.Osmosis = Osmosis;
exports.Osmosis.args = {
    height: 60,
    width: 60
};
var Dashboard = function (args) { return react_1["default"].createElement(_1.DashboardSvg, tslib_1.__assign({}, args)); };
exports.Dashboard = Dashboard;
exports.Dashboard.args = argsFill;
exports.Dashboard.argTypes = argsTypeFill;
var Left = function (args) { return react_1["default"].createElement(_1.LeftSvg, tslib_1.__assign({}, args)); };
exports.Left = Left;
exports.Left.args = argsStroke;
exports.Left.argTypes = argsTypeStroke;
var Menu = function (args) { return react_1["default"].createElement(_1.MenuSvg, tslib_1.__assign({}, args)); };
exports.Menu = Menu;
exports.Menu.args = argsFill;
exports.Menu.argTypes = argsTypeFill;
var Overview = function (args) { return react_1["default"].createElement(_1.OverviewSvg, tslib_1.__assign({}, args)); };
exports.Overview = Overview;
exports.Overview.args = argsFill;
exports.Overview.argTypes = argsTypeFill;
var Pools = function (args) { return react_1["default"].createElement(_1.PoolSvg, tslib_1.__assign({}, args)); };
exports.Pools = Pools;
exports.Pools.args = argsFill;
exports.Pools.argTypes = argsTypeFill;
var Tokens = function (args) { return react_1["default"].createElement(_1.TokensSvg, tslib_1.__assign({}, args)); };
exports.Tokens = Tokens;
exports.Tokens.args = argsFill;
exports.Tokens.argTypes = argsTypeFill;
var Settings = function (args) { return react_1["default"].createElement(_1.SettingsSvg, tslib_1.__assign({}, args)); };
exports.Settings = Settings;
exports.Settings.args = argsFill;
exports.Settings.argTypes = argsTypeFill;
//# sourceMappingURL=_svg.stories.js.map