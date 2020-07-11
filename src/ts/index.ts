import * as h from "hyperscript";
export * as hyperscript from "hyperscript";

// export class Hello {
//     greeting (name :string){
//       return "Hello"+name;
//     }
//  }

export function createSampleDom(){
  return h("div", {style:{color:"blue"}}, 
    h("span", {}, "春はあけぼの"));
}