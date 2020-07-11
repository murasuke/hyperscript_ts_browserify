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


// gulp.task('browserify', () => {
//     return browserify({
//             entries: ['./dist/js/index.js'],
//             expose: "app"
//         })
//         .bundle()
//         .pipe(source('app.js'))
//         .pipe(gulp.dest('./dist/js/'));
// });


gulp.task('browserify', () => {
    return browserify()
        .require("./dist/js/index.js", {expose: "app"})
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist/js/'));
});


gulp.task("build",gulp.series("compile:ts","browserify"));
