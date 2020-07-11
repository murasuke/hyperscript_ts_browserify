"use strict";
exports.__esModule = true;
var h = require("hyperscript");
exports.hyperscript = require("hyperscript");
// export class Hello {
//     greeting (name :string){
//       return "Hello"+name;
//     }
//  }
function createSampleDom() {
    return h("div", { style: { color: "blue" } }, h("span", {}, "春はあけぼの"));
}
exports.createSampleDom = createSampleDom;
