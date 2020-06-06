# hyperScript_browserify

hyperScriptをbrowserifyでブラウザから利用するサンプル。


- やっていること

    - ブラウザが読み込むjsファイルででhyperScriptをrequire()して利用する。
    - hyperscriptのメソッド自体をexportし、ブラウザから利用する。

ブラウザが利用するjsファイル
~~~javascript
var h = require('hyperscript');

module.exports = {
    creatoSampleDom: ()=>{
        return h("div", {style:{color:"blue"}}, h("span", {}, "春はあけぼの"));
    },
    h: h,
}
~~~

 - コンパイル時にrequireを公開するため「-r」をつける＋モジュール名をつける

    `browserify -r ./main.js:app > app.js`
    - :app がモジュール名指定　(require('app')でロードできる)

- ブラウザ側で公開したメソッドを読み込み、実行してDOMに追加する。

~~~html
    <script src=./app.js></script> 
    <script>
        window.onload = function() {
            var appModule = require('app');        
            const root = document.getElementById("rootNode")
            
            // modele.export されたfunctionを呼び出し、DOMを生成する。
            const node = appModule.creatoSampleDom();
            root.appendChild(node);

            // moduleで公開したh()を呼び出す。
            // const h = require("hyperscript"); html側で呼び出せない。browserifyできないため。
            const h = appModule.h; //exportしたfunctionを変数に設定
            root.appendChild(
                h("ul", {}, 
                    [h("li", "list1"),h("li", "list2"),h("li", "list3")]
                )
            );
       }

~~~

***
## ビルドと実行について
package.jsonの"scripts"に、下記を追加。

    "build": "browserify -r ./main.js:app > app.js",`
    "serve": "http-server",`

http-serverが導入されていない場合はnpmで追加する。

## メモ(VSCodeでGitリモートリポジトリ追加)
-  git remote add origin https://github.com/murasuke/hyperScript_browserify.git
-  git push -u origin master


