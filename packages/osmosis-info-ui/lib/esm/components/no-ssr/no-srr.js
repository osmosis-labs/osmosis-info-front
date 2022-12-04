import React from "react";
var useEnhancedEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
var NoSsr = function (_a) {
    var children = _a.children;
    var _b = React.useState(false), mountedState = _b[0], setMountedState = _b[1];
    useEnhancedEffect(function () {
        setMountedState(true);
    }, []);
    return React.createElement(React.Fragment, null, mountedState ? children : null);
};
export default NoSsr;
//# sourceMappingURL=no-srr.js.map