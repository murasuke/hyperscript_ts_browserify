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
