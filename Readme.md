# hyperScript_browserify

hyperScriptをTypescriptで利用するサンプル。
(gulp + browserifyでモジュールを読み込む)

- やっていること

    - hyperScriptをrequire()したjavascriptをブラウザで読み込む。
    - hyperScriptを直接ブラウザから利用するため、エクスポートする。
    - browserifyしたモジュールをブラウザで読み込むために「モジュール名の指定」を行う

ブラウザが利用するjsファイル
~~~javascript
import * as h from "hyperscript";
export {h};  // re-export h. https://stackoverflow.com/questions/41892470/how-to-reexport-from-a-module-that-uses-export

export function createSampleDom(){
  return h("div", {style:{color:"blue"}}, 
    h("span", {}, "春はあけぼの"));
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

gulpfile.js でTypeScriptのビルドと、browserifyを行う
~~~javascript
const gulp = require("gulp");
const ts = require("gulp-typescript");
const browserify = require("browserify");
const source     = require('vinyl-source-stream');

// src/tsをコンパイルしてdist/jsに
gulp.task("compile:ts", ()=>{
    return gulp.src(["src/ts/*.ts"])
        .pipe(ts())
        .js
        .pipe(gulp.dest("dist/js/"));
});

// browserifyでhyperscriptをバンドルする
gulp.task('browserify', () => {
    return browserify()
        .require("./dist/js/main.js", {expose: "app"})
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist/js/'));
});

// コンパイル＋browserify
gulp.task("build",gulp.series("compile:ts","browserify"));
~~~

実行は「npx gulp build」

package.jsonの"scripts"に、下記を追加。

    "serve": "http-server",`

http-serverが導入されていない場合はnpmで追加する。

## メモ(VSCodeでGitリモートリポジトリ追加)
-  git remote add origin https://github.com/murasuke/hyperScript_browserify.git
-  git push -u origin master


