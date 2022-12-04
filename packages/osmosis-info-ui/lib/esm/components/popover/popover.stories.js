import React, { useState } from "react";
import { Popover } from "./popover";
import { Button } from "../buttons/button/button";
export default {
    title: "Components/Surfaces/Popover",
    component: Popover
};
var Template = function () {
    var _a = useState(null), anchorElPopover = _a[0], setAnchorElPopover = _a[1];
    var onClickOpen = function (event) {
        setAnchorElPopover(event.currentTarget);
    };
    var onClose = function () { return setAnchorElPopover(null); };
    var openPopover = Boolean(anchorElPopover);
    return (React.createElement("div", null,
        React.createElement("div", { className: "flex items-center justify-items-center my-2" },
            React.createElement(Button, { className: "mx-auto", onClick: onClickOpen }, "Open Popover"),
            React.createElement(Popover, { onClose: onClose, open: openPopover, anchorElement: anchorElPopover },
                React.createElement("p", null, "Pop over")))));
};
Template.args = {};
export var Default = Template.bind({});
Default.args = { children: React.createElement("p", null, "Popover custom") };
Default.storyName = "Popover";
var TemplateCustom = function (args) {
    var _a = useState(null), anchorElPopoverCustom = _a[0], setAnchorElPopoverCustom = _a[1];
    var _b = useState("center"), anchorPositionX = _b[0], setAnchorPositionX = _b[1];
    var _c = useState("center"), anchorPositionY = _c[0], setAnchorPositionY = _c[1];
    var _d = useState("center"), popoverPositionX = _d[0], setPopoverPositionX = _d[1];
    var _e = useState("center"), popoverPositionY = _e[0], setPopoverPositionY = _e[1];
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
    return (React.createElement("div", null,
        React.createElement("div", { className: "flex items-center justify-center py-4 m-5 " },
            React.createElement(Button, { className: "mx-auto", onClick: onClickOpenCustom }, "Open custom popover"),
            React.createElement(Popover, { anchorPosition: { x: anchorPositionX, y: anchorPositionY }, popoverPosition: { x: popoverPositionX, y: popoverPositionY }, onClose: onCloseCustom, open: openPopoverCustom, anchorElement: anchorElPopoverCustom }, args.children)),
        React.createElement("div", { className: "grid grid-cols-4 items-center justify-items-center mt-5 " },
            React.createElement("div", { className: "flex flex-col" },
                React.createElement("p", null, "Anchor Horizontal Position"),
                React.createElement("div", { className: classNameInput },
                    React.createElement("input", { type: "radio", id: "anchorPositionLeft", name: "anchorPositionLeft", value: "left", checked: anchorPositionX === "left", onChange: onChangeRadio }),
                    React.createElement("label", { htmlFor: "anchorPositionLeft" }, "Left")),
                React.createElement("div", { className: classNameInput },
                    React.createElement("input", { type: "radio", id: "anchorPositionCenter", name: "anchorPositionCenter", value: "center", checked: anchorPositionX === "center", onChange: onChangeRadio }),
                    React.createElement("label", { htmlFor: "anchorPositionCenter" }, "Center")),
                React.createElement("div", { className: classNameInput },
                    React.createElement("input", { type: "radio", id: "anchorPositionRight", name: "anchorPositionRight", value: "right", checked: anchorPositionX === "right", onChange: onChangeRadio }),
                    React.createElement("label", { htmlFor: "anchorPositionRight" }, "Right"))),
            React.createElement("div", { className: "flex flex-col" },
                React.createElement("p", null, "Anchor Vertical Position"),
                React.createElement("div", { className: classNameInput },
                    React.createElement("input", { type: "radio", id: "anchorPositionTop", name: "anchorPositionTop", value: "top", checked: anchorPositionY === "top", onChange: onChangeRadio }),
                    React.createElement("label", { htmlFor: "anchorPositionTop" }, "Top")),
                React.createElement("div", { className: classNameInput },
                    React.createElement("input", { type: "radio", id: "YY", name: "anchorPositionCenterY", value: "center", checked: anchorPositionY === "center", onChange: onChangeRadio }),
                    React.createElement("label", { htmlFor: "anchorPositionCenterY" }, "Center")),
                React.createElement("div", { className: classNameInput },
                    React.createElement("input", { type: "radio", id: "anchorPositionBottom", name: "anchorPositionBottom", value: "bottom", checked: anchorPositionY === "bottom", onChange: onChangeRadio }),
                    React.createElement("label", { htmlFor: "anchorPositionBottom" }, "Bottom"))),
            React.createElement("div", { className: "flex flex-col" },
                React.createElement("p", null, "Popover Horizontal Position"),
                React.createElement("div", { className: classNameInput },
                    React.createElement("input", { type: "radio", id: "popoverPositionLeft", name: "popoverPositionLeft", value: "left", checked: popoverPositionX === "left", onChange: onChangeRadio }),
                    React.createElement("label", { htmlFor: "popoverPositionLeft" }, "Left")),
                React.createElement("div", { className: classNameInput },
                    React.createElement("input", { type: "radio", id: "popoverPositionCenter", name: "popoverPositionCenter", value: "center", checked: popoverPositionX === "center", onChange: onChangeRadio }),
                    React.createElement("label", { htmlFor: "popoverPositionCenter" }, "Center")),
                React.createElement("div", { className: classNameInput },
                    React.createElement("input", { type: "radio", id: "popoverPositionRight", name: "popoverPositionRight", value: "right", checked: popoverPositionX === "right", onChange: onChangeRadio }),
                    React.createElement("label", { htmlFor: "popoverPositionRight" }, "Right"))),
            React.createElement("div", { className: "flex flex-col" },
                React.createElement("p", null, "Popover Vertical Position"),
                React.createElement("div", { className: classNameInput },
                    React.createElement("input", { type: "radio", id: "popoverPositionTop", name: "popoverPositionTop", value: "top", checked: popoverPositionY === "top", onChange: onChangeRadio }),
                    React.createElement("label", { htmlFor: "popoverPositionTop" }, "Top")),
                React.createElement("div", { className: classNameInput },
                    React.createElement("input", { type: "radio", id: "popoverPositionCenterY", name: "popoverPositionCenterY", value: "center", checked: popoverPositionY === "center", onChange: onChangeRadio }),
                    React.createElement("label", { htmlFor: "popoverPositionCenterY" }, "Center")),
                React.createElement("div", { className: classNameInput },
                    React.createElement("input", { type: "radio", id: "popoverPositionBottom", name: "popoverPositionBottom", value: "bottom", checked: popoverPositionY === "bottom", onChange: onChangeRadio }),
                    React.createElement("label", { htmlFor: "popoverPositionBottom" }, "Bottom"))))));
};
TemplateCustom.args = {};
export var Custom = TemplateCustom.bind({});
Custom.args = { children: React.createElement("p", null, "Popover custom") };
Custom.storyName = "Popover with custom position";
//# sourceMappingURL=popover.stories.js.map