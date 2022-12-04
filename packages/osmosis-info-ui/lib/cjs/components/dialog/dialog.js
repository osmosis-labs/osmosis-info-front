"use strict";
exports.__esModule = true;
exports.Dialog = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var paper_1 = require("../paper/paper");
var backdrop_1 = require("../backdrop/backdrop");
var Dialog = function (_a) {
    var open = _a.open, onClose = _a.onClose, closeOnClickAway = _a.closeOnClickAway, children = _a.children, classNamePaper = _a.classNamePaper, classNameBackdrop = _a.classNameBackdrop;
    var refPaper = (0, react_1.useRef)(null);
    var onClick = function (event) {
        if (refPaper.current) {
            var rectDialog = refPaper.current.getBoundingClientRect();
            var isInDialog = rectDialog.top <= event.clientY &&
                event.clientY <= rectDialog.top + rectDialog.height &&
                rectDialog.left <= event.clientX &&
                event.clientX <= rectDialog.left + rectDialog.width;
            if (!isInDialog && closeOnClickAway)
                onClose();
        }
    };
    return (react_1["default"].createElement(backdrop_1.Backdrop, { open: open, onClick: onClick, className: "".concat(classNameBackdrop, " bg-backdrop-main flex items-center justify-center") },
        react_1["default"].createElement(paper_1.Paper, { className: classNamePaper, ref: refPaper }, children)));
};
exports.Dialog = Dialog;
//# sourceMappingURL=dialog.js.map