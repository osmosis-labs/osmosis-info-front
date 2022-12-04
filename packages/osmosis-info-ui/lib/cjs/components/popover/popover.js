"use strict";
exports.__esModule = true;
exports.Popover = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var paper_1 = require("../paper/paper");
var backdrop_1 = require("../backdrop/backdrop");
var Popover = function (_a) {
    var open = _a.open, anchorElement = _a.anchorElement, onClose = _a.onClose, children = _a.children, classNamePaper = _a.classNamePaper, classNameBackdrop = _a.classNameBackdrop, _b = _a.anchorPosition, anchorPosition = _b === void 0 ? { x: "left", y: "bottom" } : _b, _c = _a.popoverPosition, popoverPosition = _c === void 0 ? { x: "left", y: "top" } : _c;
    var refPaper = (0, react_1.useRef)(null);
    var x = 0;
    var y = 0;
    if (refPaper.current && anchorElement) {
        var rect = anchorElement.getBoundingClientRect();
        if (anchorPosition.x === "right")
            x = rect.x + rect.width;
        else if (anchorPosition.x === "left")
            x = rect.x;
        else
            x = rect.x + rect.width / 2;
        if (anchorPosition.y === "bottom")
            y = rect.y + rect.height;
        else if (anchorPosition.y === "top")
            y = rect.y;
        else
            y = rect.y + rect.height / 2;
        if (refPaper.current) {
            var rectPaper = refPaper.current.getBoundingClientRect();
            if (popoverPosition.x === "right")
                x = x - rectPaper.width;
            else if (popoverPosition.x === "center")
                x = x - rectPaper.width / 2;
            if (popoverPosition.y === "bottom")
                y = y - rectPaper.height;
            else if (popoverPosition.y === "center")
                y = y - rectPaper.height / 2;
        }
    }
    var classNameDefault = "".concat(classNamePaper, " fixed bg-main-300 ");
    var classNameOpen = "".concat(classNameDefault, " popoverTransitionOpen");
    var classNameClose = "".concat(classNameDefault, " popoverTransitionClose");
    return (react_1["default"].createElement(backdrop_1.Backdrop, { open: open, onClick: onClose, className: classNameBackdrop },
        react_1["default"].createElement(paper_1.Paper, { ref: refPaper, className: open ? classNameOpen : classNameClose, style: { top: y, left: x } }, children)));
};
exports.Popover = Popover;
//# sourceMappingURL=popover.js.map