"use strict";
exports.__esModule = true;
exports.Default = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var dialog_1 = require("./dialog");
var paper_1 = require("../paper/paper");
var button_1 = require("../buttons/button/button");
exports["default"] = {
    title: "Components/Surfaces/Dialog",
    component: dialog_1.Dialog
};
var Template = function () {
    var _a = (0, react_1.useState)(false), open = _a[0], setOpen = _a[1];
    var onClickOpen = function () { return setOpen(true); };
    var onClose = function () { return setOpen(false); };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(paper_1.Paper, null,
            react_1["default"].createElement("p", { className: "max-w-xs" }, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum rem vero necessitatibus voluptatibus vel veritatis illo aperiam enim, reiciendis corporis quam id nemo veniam mollitia culpa quas, atque, provident illum."),
            react_1["default"].createElement("div", { className: "flex items-center justify-center m-2" },
                react_1["default"].createElement(button_1.Button, { onClick: onClickOpen }, "Open Dialog")),
            react_1["default"].createElement(dialog_1.Dialog, { onClose: onClose, open: open, closeOnClickAway: true },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("p", null, "Empty backdrop with only text and button"),
                    react_1["default"].createElement(button_1.Button, { className: "mx-auto mt-2", size: "small", onClick: onClose }, "Close Dialog"))))));
};
Template.args = {};
exports.Default = Template.bind({});
exports.Default.args = {};
exports.Default.storyName = "Dialog";
//# sourceMappingURL=dialog.stories.js.map