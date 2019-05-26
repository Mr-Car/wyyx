const gulp = require("gulp");
const webserver = require("gulp-webserver");
const express = require("express");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const csso = require("gulp-csso");
const autoprefixer = require("gulp-autoprefixer");
const https = require("https");
const http = require("http");

gulp.task("compileJS", () => {
    gulp.src("src/js/**/*.js")
        // .pipe(babel({
        //     presets: ["@babel/env"]
        // }))
        // .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
    gulp.src("src/pages/**/*.js")
        // .pipe(babel({
        //     presets: ["@babel/env"]
        // }))
        // .pipe(uglify())
        .pipe(gulp.dest("dist/pages"));
    gulp.src("src/static/**/*") //static文件夹下存放工具脚本，不需要再次编译丑化
        .pipe(gulp.dest("dist/static"));
});
gulp.task("compileCSS", () => {
    gulp.src("src/css/**/*.scss")
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest("dist/css"))
});
gulp.task("compileHTML", () => {
    gulp.src("src/pages/**/*.html")
        .pipe(gulp.dest("dist/pages"))
});

gulp.task("build", ["compileJS", "compileCSS", "compileHTML"]);

gulp.task("webserver", () => {
    // 静态资源服务器 :9999
    gulp.src('dist')
        .pipe(webserver({
            livereload: true,
            port: 9999,
            open: "pages/home/index.html"
        }));
    gulp.watch("src/css/pages/**/*.scss", ["compileCSS"]);
    gulp.watch("src/js/**/*.js", ["compileJS"]);
    gulp.watch("src/pages/**/*.html", ["compileHTML"]);
    gulp.watch("src/pages/**/*.js", ["compileJS"]);
    gulp.watch("src/static/**/*.js", ["compileJS"]);

    // 接口代理服务器 :8888
    let app = express();
    // 首页数据
    app.get("/hint", (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*"); //cors
        res.setHeader("Content-Type", "text/plain; charset=utf8");
        // 创建代理服务器
        let proxy = http.request({
            hostname: "you.163.com",
            path: "/xhr/globalinfo/queryTop.json?__timestamp=1558446137917",
            method: "get"
        }, (response) => {
            response.pipe(res);
        });
        proxy.end();
    });
    // 搜索框下广告
    app.get("/hotkey", (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*"); //cors
        res.setHeader("Content-Type", "text/plain; charset=utf8");
        let proxy = http.request({
            hostname: "you.163.com",
            path: "/xhr/search/queryHotKeyWord.json?__timestamp=1558487433807",
            method: "get"
        }, (response) => {
            response.pipe(res);
        });
        proxy.end();
    });
    // 首页商品分类列表1
    app.get("/sort", (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*"); //cors
        res.setHeader("Content-Type", "text/plain; charset=utf8");
        let proxy = http.request({
            hostname: "you.163.com",
            path: "/xhr/item/rcmd.json?__timestamp=1558770688934&itemId=1076010",
            method: "get"
        }, (response) => {
            response.pipe(res);
        });
        proxy.end();
    });
    // 首页商品分类列表2
    app.get("/sort1", (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*"); //cors
        res.setHeader("Content-Type", "text/plain; charset=utf8");
        let proxy = http.request({
            hostname: "you.163.com",
            path: "/xhr/item/rcmd.json?__timestamp=1558770688934&itemId=1076020",
            method: "get"
        }, (response) => {
            response.pipe(res);
        });
        proxy.end();
    });
    app.get("/sort2", (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*"); //cors
        res.setHeader("Content-Type", "text/plain; charset=utf8");
        let proxy = http.request({
            hostname: "you.163.com",
            path: "/xhr/item/rcmd.json?__timestamp=1558770688934&itemId=1076001",
            method: "get"
        }, (response) => {
            response.pipe(res);
        });
        proxy.end();
    });
    app.get("/sort3", (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*"); //cors
        res.setHeader("Content-Type", "text/plain; charset=utf8");
        let proxy = http.request({
            hostname: "you.163.com",
            path: "/xhr/item/rcmd.json?__timestamp=1558770688934&itemId=1076002",
            method: "get"
        }, (response) => {
            response.pipe(res);
        });
        proxy.end();
    });
    app.get("/sort4", (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*"); //cors
        res.setHeader("Content-Type", "text/plain; charset=utf8");
        let proxy = http.request({
            hostname: "you.163.com",
            path: "/xhr/item/rcmd.json?__timestamp=1558770688934&itemId=1076003",
            method: "get"
        }, (response) => {
            response.pipe(res);
        });
        proxy.end();
    });
    app.get("/sort5", (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*"); //cors
        res.setHeader("Content-Type", "text/plain; charset=utf8");
        let proxy = http.request({
            hostname: "you.163.com",
            path: "/xhr/item/rcmd.json?__timestamp=1558770688934&itemId=1076005",
            method: "get"
        }, (response) => {
            response.pipe(res);
        });
        proxy.end();
    });
    app.get("/sort6", (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*"); //cors
        res.setHeader("Content-Type", "text/plain; charset=utf8");
        let proxy = http.request({
            hostname: "you.163.com",
            path: "/xhr/item/rcmd.json?__timestamp=1558770688934&itemId=1076006",
            method: "get"
        }, (response) => {
            response.pipe(res);
        });
        proxy.end();
    });


    app.listen(8888);
});