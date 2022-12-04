"use strict";
exports.__esModule = true;
exports.Button = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Button = function (_a) {
    var children = _a.children, onClick = _a.onClick, className = _a.className, _b = _a.variant, variant = _b === void 0 ? "primary" : _b, _c = _a.size, size = _c === void 0 ? "medium" : _c, disabled = _a.disabled;
    var classNameDefaut = " ".concat(className, " rounded-xl w-fit transition-colors cursor-pointer h-fit whitespace-nowrap max-w-full overflow-hidden text-ellipsis\t");
    if (size === "medium")
        classNameDefaut += "".concat(classNameDefaut, " px-5 py-4 ");
    else if (size === "small")
        classNameDefaut += "".concat(classNameDefaut, " px-5 py-2.5 ");
    if (variant === "secondary") {
        if (disabled) {
            classNameDefaut += "".concat(classNameDefaut, " border-2 border-main-600 text-main-600 cursor-not-allowed py-3.5");
        }
        else {
            classNameDefaut += "".concat(classNameDefaut, " border-2 border-wosmongton-400 hover:border-wosmongton-200 transition-all py-3.5");
        }
    }
    else {
        if (disabled)
            classNameDefaut += "".concat(classNameDefaut, " bg-main-500 cursor-not-allowed text-main-100");
        else if (variant === "primary")
            classNameDefaut += "".concat(classNameDefaut, " bg-wosmongton-700 hover:bg-wosmongton-400");
        else if (variant === "warning")
            classNameDefaut += "".concat(classNameDefaut, " bg-gradient-to-r from-rust-800 to-rust-500 transition-all duration-default bg-size-x-200 bg-pos-0 hover:bg-pos-100");
    }
    return (react_1["default"].createElement("div", { onClick: onClick, className: classNameDefaut }, children));
};
exports.Button = Button;
//# sourceMappingURL=button.js.map