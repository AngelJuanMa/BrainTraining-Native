"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var React = require("react");
var react_native_1 = require("react-native");
var react_native_svg_1 = require("react-native-svg");
var react_native_reanimated_1 = require("react-native-reanimated");
var interpolate = react_native_reanimated_1["default"].interpolate, multiply = react_native_reanimated_1["default"].multiply;
var width = react_native_1.Dimensions.get("window").width;
var size = width - 32;
var strokeWidth = 50;
var AnimatedPath = react_native_reanimated_1["default"].createAnimatedComponent(react_native_svg_1.Path);
var PI = Math.PI, cos = Math.cos, sin = Math.sin;
var r = (size - strokeWidth) / 2;
var cx = size / 2;
var cy = size / 2;
var A = PI + PI * 0.4;
var startAngle = PI + PI * 0.2;
var endAngle = 2 * PI - PI * 0.2;
// A rx ry x-axis-rotation large-arc-flag sweep-flag x y
var x1 = cx - r * cos(startAngle);
var y1 = -r * sin(startAngle) + cy;
var x2 = cx - r * cos(endAngle);
var y2 = -r * sin(endAngle) + cy;
var d = "M " + x1 + " " + y1 + " A " + r + " " + r + " 0 1 0 " + x2 + " " + y2;
exports["default"] = (function (_a) {
    var progress = _a.progress;
    var circumference = r * A;
    var α = interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [0, A]
    });
    var strokeDashoffset = multiply(α, r);
    return (React.createElement(react_native_svg_1["default"], { width: size, height: size },
        React.createElement(react_native_svg_1.Defs, null,
            React.createElement(react_native_svg_1.LinearGradient, { id: "grad", x1: "0", y1: "0", x2: "100%", y2: "0" },
                React.createElement(react_native_svg_1.Stop, { offset: "0", stopColor: "#f7cd46" }),
                React.createElement(react_native_svg_1.Stop, { offset: "1", stopColor: "#ef9837" }))),
        React.createElement(react_native_svg_1.Path, __assign({ stroke: "white", fill: "none", strokeDasharray: circumference + ", " + circumference }, { d: d, strokeWidth: strokeWidth })),
        React.createElement(AnimatedPath, __assign({ stroke: "url(#grad)", fill: "none", strokeDasharray: circumference + ", " + circumference }, { d: d, strokeDashoffset: strokeDashoffset, strokeWidth: strokeWidth }))));
});
