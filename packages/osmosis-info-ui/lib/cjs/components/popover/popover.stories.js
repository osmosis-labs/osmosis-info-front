"use strict";
exports.__esModule = true;
exports.Custom = exports.Default = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var popover_1 = require("./popover");
var button_1 = require("../buttons/button/button");
exports["default"] = {
    title: "Components/Surfaces/Popover",
    component: popover_1.Popover
};
var Template = function () {
    var _a = (0, react_1.useState)(null), anchorElPopover = _a[0], setAnchorElPopover = _a[1];
    var onClickOpen = function (event) {
        setAnchorElPopover(event.currentTarget);
    };
    var onClose = function () { return setAnchorElPopover(null); };
    var openPopover = Boolean(anchorElPopover);
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "flex items-center justify-items-center my-2" },
            react_1["default"].createElement(button_1.Button, { className: "mx-auto", onClick: onClickOpen }, "Open Popover"),
            react_1["default"].createElement(popover_1.Popover, { onClose: onClose, open: openPopover, anchorElement: anchorElPopover },
                react_1["default"].createElement("p", null, "Pop over")))));
};
Template.args = {};
exports.Default = Template.bind({});
exports.Default.args = { children: react_1["default"].createElement("p", null, "Popover custom") };
exports.Default.storyName = "Popover";
var TemplateCustom = function (args) {
    var _a = (0, react_1.useState)(null), anchorElPopoverCustom = _a[0], setAnchorElPopoverCustom = _a[1];
    var _b = (0, react_1.useState)("center"), anchorPositionX = _b[0], setAnchorPositionX = _b[1];
    var _c = (0, react_1.useState)("center"), anchorPositionY = _c[0], setAnchorPositionY = _c[1];
    var _d = (0, react_1.useState)("center"), popoverPositionX = _d[0], setPopoverPositionX = _d[1];
    var _e = (0, react_1.useState)("center"), popoverPositionY = _e[0], setPopoverPositionY = _e[1];
    var onClickOpenCustom = function (event) {
        setAnchorElPopoverCustom(event.currentTarget);
    };
    var onCloseCustom = function () { return setAnchorElPopoverCustom(null); };
    var openPopoverCustom = Boolean(anchorElPopoverCustom);
    var onChangeRadio = function (event) {
        var _a = event.target, name = _a.name, value = _a.value;
        if (name === "anchorPositionLeft")
            setAnchorPositionX(value);
        else if (name === "anchorPositionRight")
            setAnchorPositionX(value);
        else if (name === "anchorPositionCenter")
            setAnchorPositionX(value);
        else if (name === "anchorPositionTop")
            setAnchorPositionY(value);
        else if (name === "anchorPositionBottom")
            setAnchorPositionY(value);
        else if (name === "anchorPositionCenterY")
            setAnchorPositionY(value);
        else if (name === "popoverPositionLeft")
            setPopoverPositionX(value);
        else if (name === "popoverPositionRight")
            setPopoverPositionX(value);
        else if (name === "popoverPositionCenter")
            setPopoverPositionX(value);
        else if (name === "popoverPositionTop")
            setPopoverPositionY(value);
        else if (name === "popoverPositionBottom")
            setPopoverPositionY(value);
        else if (name === "popoverPositionCenterY")
            setPopoverPositionY(value);
    };
    var classNameInput = "grid grid-cols-2 p-1";
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "flex items-center justify-center py-4 m-5 " },
            react_1["default"].createElement(button_1.Button, { className: "mx-auto", onClick: onClickOpenCustom }, "Open custom popover"),
            react_1["default"].createElement(popover_1.Popover, { anchorPosition: { x: anchorPositionX, y: anchorPositionY }, popoverPosition: { x: popoverPositionX, y: popoverPositionY }, onClose: onCloseCustom, open: openPopoverCustom, anchorElement: anchorElPopoverCustom }, args.children)),
        react_1["default"].createElement("div", { className: "grid grid-cols-4 items-center justify-items-center mt-5 " },
            react_1["default"].createElement("div", { className: "flex flex-col" },
                react_1["default"].createElement("p", null, "Anchor Horizontal Position"),
                react_1["default"].createElement("div", { className: classNameInput },
                    react_1["default"].createElement("input", { type: "radio", id: "anchorPositionLeft", name: "anchorPositionLeft", value: "left", checked: anchorPositionX === "left", onChange: onChangeRadio }),
                    react_1["default"].createElement("label", { htmlFor: "anchorPositionLeft" }, "Left")),
                react_1["default"].createElement("div", { className: classNameInput },
                    react_1["default"].createElement("input", { type: "radio", id: "anchorPositionCenter", name: "anchorPositionCenter", value: "center", checked: anchorPositionX === "center", onChange: onChangeRadio }),
                    react_1["default"].createElement("label", { htmlFor: "anchorPositionCenter" }, "Center")),
                react_1["default"].createElement("div", { className: classNameInput },
                    react_1["default"].createElement("input", { type: "radio", id: "anchorPositionRight", name: "anchorPositionRight", value: "right", checked: anchorPositionX === "right", onChange: onChangeRadio }),
                    react_1["default"].createElement("label", { htmlFor: "anchorPositionRight" }, "Right"))),
            react_1["default"].createElement("div", { className: "flex flex-col" },
                react_1["default"].createElement("p", null, "Anchor Vertical Position"),
                react_1["default"].createElement("div", { className: classNameInput },
                    react_1["default"].createElement("input", { type: "radio", id: "anchorPositionTop", name: "anchorPositionTop", value: "top", checked: anchorPositionY === "top", onChange: onChangeRadio }),
                    react_1["default"].createElement("label", { htmlFor: "anchorPositionTop" }, "Top")),
                react_1["default"].createElement("div", { className: classNameInput },
                    react_1["default"].createElement("input", { type: "radio", id: "YY", name: "anchorPositionCenterY", value: "center", checked: anchorPositionY === "center", onChange: onChangeRadio }),
                    react_1["default"].createElement("label", { htmlFor: "anchorPositionCenterY" }, "Center")),
                react_1["default"].createElement("div", { className: classNameInput },
                    react_1["default"].createElement("input", { type: "radio", id: "anchorPositionBottom", name: "anchorPositionBottom", value: "bottom", checked: anchorPositionY === "bottom", onChange: onChangeRadio }),
                    react_1["default"].createElement("label", { htmlFor: "anchorPositionBottom" }, "Bottom"))),
            react_1["default"].createElement("div", { className: "flex flex-col" },
                react_1["default"].createElement("p", null, "Popover Horizontal Position"),
                react_1["default"].createElement("div", { className: classNameInput },
                    react_1["default"].createElement("input", { type: "radio", id: "popoverPositionLeft", name: "popoverPositionLeft", value: "left", checked: popoverPositionX === "left", onChange: onChangeRadio }),
                    react_1["default"].createElement("label", { htmlFor: "popoverPositionLeft" }, "Left")),
                react_1["default"].createElement("div", { className: classNameInput },
                    react_1["default"].createElement("input", { type: "radio", id: "popoverPositionCenter", name: "popoverPositionCenter", value: "center", checked: popoverPositionX === "center", onChange: onChangeRadio }),
                    react_1["default"].createElement("label", { htmlFor: "popoverPositionCenter" }, "Center")),
                react_1["default"].createElement("div", { className: classNameInput },
                    react_1["default"].createElement("input", { type: "radio", id: "popoverPositionRight", name: "popoverPositionRight", value: "right", checked: popoverPositionX === "right", onChange: onChangeRadio }),
                    react_1["default"].createElement("label", { htmlFor: "popoverPositionRight" }, "Right"))),
            react_1["default"].createElement("div", { className: "flex flex-col" },
                react_1["default"].createElement("p", null, "Popover Vertical Position"),
                react_1["default"].createElement("div", { className: classNameInput },
                    react_1["default"].createElement("input", { type: "radio", id: "popoverPositionTop", name: "popoverPositionTop", value: "top", checked: popoverPositionY === "top", onChange: onChangeRadio }),
                    react_1["default"].createElement("label", { htmlFor: "popoverPositionTop" }, "Top")),
                react_1["default"].createElement("div", { className: classNameInput },
                    react_1["default"].createElement("input", { type: "radio", id: "popoverPositionCenterY", name: "popoverPositionCenterY", value: "center", checked: popoverPositionY === "center", onChange: onChangeRadio }),
                    react_1["default"].createElement("label", { htmlFor: "popoverPositionCenterY" }, "Center")),
                react_1["default"].createElement("div", { className: classNameInput },
                    react_1["default"].createElement("input", { type: "radio", id: "popoverPositionBottom", name: "popoverPositionBottom", value: "bottom", checked: popoverPositionY === "bottom", onChange: onChangeRadio }),
                    react_1["default"].createElement("label", { htmlFor: "popoverPositionBottom" }, "Bottom"))))));
};
TemplateCustom.args = {};
exports.Custom = TemplateCustom.bind({});
exports.Custom.args = { children: react_1["default"].createElement("p", null, "Popover custom") };
exports.Custom.storyName = "Popover with custom position";
//# sourceMappingURL=popover.stories.js.map