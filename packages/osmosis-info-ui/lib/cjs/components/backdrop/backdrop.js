"use strict";
exports.__esModule = true;
exports.Backdrop = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_dom_1 = require("react-dom");
var Backdrop = function (_a) {
    var children = _a.children, className = _a.className, open = _a.open, onClick = _a.onClick;
    var _b = (0, react_1.useState)(false), mounted = _b[0], setMounted = _b[1];
    var _c = (0, react_1.useState)(null), mountNode = _c[0], setMountNode = _c[1];
    (0, react_1.useEffect)(function () {
        setMountNode(document.body);
        setMounted(true);
        return function () { return setMounted(false); };
    }, []);
    var classNameDefault = "fixed inset-0 overflow-hidden";
    var classNameOpen = "".concat(classNameDefault, " ").concat(className, " z-50 opacity-100 dialogTransitionOpen");
    var classNameClose = "".concat(classNameDefault, " ").concat(className, " -z-50 opacity-0 dialogTransitionClose");
    console.log("%cbackdrop.tsx -> 33 BLUE: mounted", "background: #2196f3; color:#FFFFFF", mounted);
    return mounted ? (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", null, children),
        mountNode
            ? (0, react_dom_1.createPortal)(react_1["default"].createElement("div", { onClick: onClick, className: open ? classNameOpen : classNameClose }, children), mountNode)
            : null)) : null;
};
exports.Backdrop = Backdrop;
//# sourceMappingURL=backdrop.js.map