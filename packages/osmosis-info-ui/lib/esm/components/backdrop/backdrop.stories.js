import { __assign } from "tslib";
import React, { useState } from "react";
import { Backdrop } from "./backdrop";
import { Paper } from "../paper/paper";
import { Button } from "../buttons/button/button";
export default {
    title: "Components/Surfaces/Backdrop",
    component: Backdrop
};
var Template = function (args) {
    var _a = useState(false), open = _a[0], setOpen = _a[1];
    var onClickOpen = function () { return setOpen(true); };
    var onClose = function () { return setOpen(false); };
    return (React.createElement("div", null,
        React.createElement(Paper, null,
            React.createElement("p", { className: "max-w-xs" }, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum rem vero necessitatibus voluptatibus vel veritatis illo aperiam enim, reiciendis corporis quam id nemo veniam mollitia culpa quas, atque, provident illum."),
            React.createElement("div", { className: "flex items-center justify-center m-2" },
                React.createElement(Button, { onClick: onClickOpen }, "Show backdrop")),
            React.createElement(Backdrop, __assign({}, args, { open: open, className: "bg-backdrop-main flex items-center justify-center" }),
                React.createElement("div", null,
                    React.createElement("p", null, "Empty backdrop with only text and button"),
                    React.createElement(Button, { className: "mx-auto my-2", onClick: onClose }, "Hide backdrop"))))));
};
Template.args = {};
export var Default = Template.bind({});
Default.args = {};
console.log("backdrop.stories.tsx -> 43: here");
Default.storyName = "Backdrop";
//# sourceMappingURL=backdrop.stories.js.map