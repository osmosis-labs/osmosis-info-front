import React from "react";
export var IconButton = function (_a) {
    var Icon = _a.Icon, onClick = _a.onClick, className = _a.className;
    var classIconButton = "\n    px-4 py-3 bg-main-700 rounded-xl h-fit w-fit cursor-pointer transition-colors hover:bg-main-600 [&>svg]:hover:fill-white-full \n    [&>svg]:fill-main-400 \n    ".concat(className);
    return (React.createElement("div", { onClick: onClick, className: classIconButton },
        React.createElement(Icon, { height: 20, width: 21, className: "duration-default" })));
};
//# sourceMappingURL=icon-button.js.map