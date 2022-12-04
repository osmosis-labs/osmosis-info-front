import React, { useState } from "react";
import { Dialog } from "./dialog";
import { Paper } from "../paper/paper";
import { Button } from "../buttons/button/button";
export default {
    title: "Components/Surfaces/Dialog",
    component: Dialog
};
var Template = function () {
    var _a = useState(false), open = _a[0], setOpen = _a[1];
    var onClickOpen = function () { return setOpen(true); };
    var onClose = function () { return setOpen(false); };
    return (React.createElement("div", null,
        React.createElement(Paper, null,
            React.createElement("p", { className: "max-w-xs" }, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum rem vero necessitatibus voluptatibus vel veritatis illo aperiam enim, reiciendis corporis quam id nemo veniam mollitia culpa quas, atque, provident illum."),
            React.createElement("div", { className: "flex items-center justify-center m-2" },
                React.createElement(Button, { onClick: onClickOpen }, "Open Dialog")),
            React.createElement(Dialog, { onClose: onClose, open: open, closeOnClickAway: true },
                React.createElement("div", null,
                    React.createElement("p", null, "Empty backdrop with only text and button"),
                    React.createElement(Button, { className: "mx-auto mt-2", size: "small", onClick: onClose }, "Close Dialog"))))));
};
Template.args = {};
export var Default = Template.bind({});
Default.args = {};
Default.storyName = "Dialog";
//# sourceMappingURL=dialog.stories.js.map