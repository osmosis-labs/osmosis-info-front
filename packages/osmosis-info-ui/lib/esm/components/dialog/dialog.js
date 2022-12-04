import React, { useRef } from "react";
import { Paper } from "../paper/paper";
import { Backdrop } from "../backdrop/backdrop";
export var Dialog = function (_a) {
    var open = _a.open, onClose = _a.onClose, closeOnClickAway = _a.closeOnClickAway, children = _a.children, classNamePaper = _a.classNamePaper, classNameBackdrop = _a.classNameBackdrop;
    var refPaper = useRef(null);
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
    return (React.createElement(Backdrop, { open: open, onClick: onClick, className: "".concat(classNameBackdrop, " bg-backdrop-main flex items-center justify-center") },
        React.createElement(Paper, { className: classNamePaper, ref: refPaper }, children)));
};
//# sourceMappingURL=dialog.js.map