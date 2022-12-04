"use strict";
exports.__esModule = true;
exports.Paper = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
exports.Paper = (0, react_1.forwardRef)(function (_a, ref) {
    var children = _a.children, className = _a.className, props = tslib_1.__rest(_a, ["children", "className"]);
    return (react_1["default"].createElement("div", tslib_1.__assign({ ref: ref, className: "".concat(className, " p-2 bg-main-800 rounded-xl") }, props), children));
});
exports.Paper.displayName = "Paper";
//# sourceMappingURL=paper.js.map