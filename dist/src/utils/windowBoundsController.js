"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setWindowBounds = exports.getWindowBounds = void 0;
var config_1 = require("./config");
var getWindowBounds = function () {
    var _a = config_1.config.get('windowBounds'), width = _a.width, height = _a.height, x = _a.x, y = _a.y;
    return {
        width: width || 1100,
        height: height || 700,
        x: x,
        y: y
    };
};
exports.getWindowBounds = getWindowBounds;
var setWindowBounds = function (bounds) {
    if (!bounds) {
        return;
    }
    var width = bounds.width, height = bounds.height, x = bounds.x, y = bounds.y;
    config_1.config.set('windowBounds', {
        width: width || 1100,
        height: height || 700,
        x: x,
        y: y
    });
};
exports.setWindowBounds = setWindowBounds;
//# sourceMappingURL=windowBoundsController.js.map