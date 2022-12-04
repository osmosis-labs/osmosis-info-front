"use strict";
exports.__esModule = true;
exports.Default = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var paper_1 = require("./paper");
exports["default"] = {
    title: "Components/Surfaces/Paper",
    component: paper_1.Paper
};
var Template = function (args) {
    return (react_1["default"].createElement(paper_1.Paper, tslib_1.__assign({}, args),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("p", { className: "max-w-xs text-center" }, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum rem vero necessitatibus voluptatibus vel veritatis illo aperiam enim, reiciendis corporis quam id nemo veniam mollitia culpa quas, atque, provident illum."))));
};
Template.args = {};
exports.Default = Template.bind({});
exports.Default.args = {};
exports.Default.storyName = "Paper";
//# sourceMappingURL=paper.stories.js.map