"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var useEnhancedEffect = typeof window !== "undefined" ? react_1["default"].useLayoutEffect : react_1["default"].useEffect;
var NoSsr = function (_a) {
    var children = _a.children;
    var _b = react_1["default"].useState(false), mountedState = _b[0], setMountedState = _b[1];
    useEnhancedEffect(function () {
        setMountedState(true);
    }, []);
    return react_1["default"].createElement(react_1["default"].Fragment, null, mountedState ? children : null);
};
exports["default"] = NoSsr;
//# sourceMappingURL=no-srr.js.map