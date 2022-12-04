import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
export var Backdrop = function (_a) {
    var children = _a.children, className = _a.className, open = _a.open, onClick = _a.onClick;
    var _b = useState(null), mountNode = _b[0], setMountNode = _b[1];
    useEffect(function () {
        setMountNode(document.body);
    }, []);
    var classNameDefault = "fixed inset-0 overflow-hidden";
    var classNameOpen = "".concat(classNameDefault, " ").concat(className, " z-50 opacity-100 dialogTransitionOpen");
    var classNameClose = "".concat(classNameDefault, " ").concat(className, " -z-50 opacity-0 dialogTransitionClose");
    return (React.createElement(React.Fragment, null, mountNode
        ? createPortal(React.createElement("div", { onClick: onClick, className: open ? classNameOpen : classNameClose }, children), mountNode)
        : null));
};
//# sourceMappingURL=backdrop.js.map