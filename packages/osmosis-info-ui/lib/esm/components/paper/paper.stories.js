import { __assign } from "tslib";
import React from "react";
import { Paper } from "./paper";
export default {
    title: "Components/Surfaces/Paper",
    component: Paper
};
var Template = function (args) {
    return (React.createElement(Paper, __assign({}, args),
        React.createElement("div", null,
            React.createElement("p", { className: "max-w-xs text-center" }, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum rem vero necessitatibus voluptatibus vel veritatis illo aperiam enim, reiciendis corporis quam id nemo veniam mollitia culpa quas, atque, provident illum."))));
};
Template.args = {};
export var Default = Template.bind({});
Default.args = {};
Default.storyName = "Paper";
//# sourceMappingURL=paper.stories.js.map