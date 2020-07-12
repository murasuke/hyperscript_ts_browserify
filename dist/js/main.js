"use strict";
exports.__esModule = true;
var h = require("hyperscript");
exports.h = h;
function createSampleDom() {
    return h("div", { style: { color: "blue" } }, h("span", {}, "春はあけぼの"));
}
exports.createSampleDom = createSampleDom;
