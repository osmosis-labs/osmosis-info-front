"use strict";
exports.__esModule = true;
exports.IconButton = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var IconButton = function (_a) {
    var Icon = _a.Icon, onClick = _a.onClick, className = _a.className;
    var classIconButton = "\n    px-4 py-3 bg-main-700 rounded-xl h-fit w-fit cursor-pointer transition-colors hover:bg-main-600 [&>svg]:hover:fill-white-full \n    [&>svg]:fill-main-400 \n    ".concat(className);
    return (react_1["default"].createElement("div", { onClick: onClick, className: classIconButton },
        react_1["default"].createElement(Icon, { height: 20, width: 21, className: "duration-default" })));
};
exports.IconButton = IconButton;
//# sourceMappingURL=icon-button.js.map