import * as h from "hyperscript";
export {h};  // re-export h. https://stackoverflow.com/questions/41892470/how-to-reexport-from-a-module-that-uses-export

export function createSampleDom(){
  return h("div", {style:{color:"blue"}}, 
    h("span", {}, "春はあけぼの"));
}

