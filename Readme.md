# hyperscript_ts_browserify

hyperscriptをTypescriptで利用するサンプル。
(gulp + browserifyでモジュールを読み込む)

- やっていること

    - TypeScriptでhyperscriptを利用してDOMを返す
    - TypeScriptで「hyperscript(h())」をエクスポートして、ブラウザ側で利用可能にする(要browserify)
    - JavaScriptでモジュールを読み込む(require())ため「モジュール名を指定」してbrowserifyする

main.ts  (hyperscriptの利用とエクスポート)
~~~javascript
import * as h from "hyperscript";
export {h};  // 再エクスポート https://stackoverflow.com/questions/41892470/how-to-reexport-from-a-module-that-uses-export

export function createSampleDom(){
  return h("div", {style:{color:"blue"}}, 
    h("span", {}, "春はあけぼの"));
}
~~~

## ビルドについて

gulpfile.js でTypeScriptのビルドと、browserifyを行う。

    npx gulp build

gulpfile.ts
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
// {expose: "app"}でモジュール名を指定する(require('app');でモジュールを読み込めるようになる)
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

## htmlでモジュールを読み込んで利用する
~~~html
    <script src=./dist/js/app.js></script> 
    <script>
        window.onload = function() {
            // appモジュールを読み込む
            var appModule = require('app');       
            const root = document.getElementById("rootNode");
            
            // exportされたfunctionを呼び出し、DOMを生成する。
            const node = appModule.createSampleDom();
            root.appendChild(node);

            // moduleで公開したh()を呼び出す。
            const h = appModule.h; //exportしたh(hyperScript)を利用する
            root.appendChild(
                h("ul", {}, 
                    [h("li", "list1"),h("li", "list2"),h("li", "list3")]
                )
            );
       }
    </script>
~~~

***

## 実行について

package.jsonの"scripts"に下記を追加。

    "serve": "http-server",`

http-serverが導入されていない場合はnpmで追加する。

下記で開発用httpサーバーを起動 (http://127.0.0.1:8080)

    npx run serve

## メモ(VSCodeでGitリモートリポジトリ追加)
-  git remote add origin https://github.com/murasuke/hyperscript_ts_browserify.git
-  git push -u origin master


