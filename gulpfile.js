const SassCompressOutput = false;

const { series, src, dest, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browsersync = require("browser-sync").create();
const webpack = require("webpack-stream");
const babel = require("gulp-babel");
const svgmin = require("gulp-svgmin");
const replace = require("gulp-replace");
const svgSprite = require("gulp-svg-sprite");

const paths = {
  input: {
    sass: ["src/styles/**/*.scss", "src/styles/**/*.sass"],
    js: ["src/app/**/*.js", "src/app/**/*.jsx"],
    images: ["src/**/*.jpg", "src/**/*.png"],
    svg: "src/**/*.svg",
  },
  output: "dist",
};

const watchPaths = Object.entries(paths.input).map((entry) => entry[1]);

function svgTask() {
  return (
    src(paths.input.svg)
      .pipe(svgmin({ js2svg: { pretty: true } }))
      .pipe(replace("&gt;", ">"))
      .pipe(
        svgSprite({
          shape: { dimension: { maxWidth: 32, maxHeight: 32 } },
          mode: {
            symbol: { sprite: "sprite.svg", inline: true },
            view: {
              bust: false,
              render: {
                scss: true,
              },
            },
          },
        }),
      )
      // Assume that SVG images are located only in src/images/ directory
      .pipe(replace("images--", ""))
      .pipe(dest(paths.output))
  );
}

function sassTask() {
  let outputStyle = SassCompressOutput ? "compressed" : "expanded";
  return src(paths.input.sass, { sourcemaps: true })
    .pipe(sass({ outputStyle: outputStyle }).on("error", sass.logError))
    .pipe(dest(paths.output, { sourcemaps: "." }));
}

function jsTask() {
  return src(paths.input.js, { sourcemaps: true })
    .pipe(webpack({ mode: "development" }))
    .pipe(
      babel({
        presets: ["@babel/preset-env", "@babel/preset-react", "minify"],
      }),
    )
    .pipe(dest(paths.output, { sourcemaps: "." }));
}

function imagesTask() {
  return src(paths.input.images, { encoding: false }).pipe(dest(paths.output));
}

function watchTask(cb) {
  watch(watchPaths, { interval: 1000, usePolling: true }, build);
  cb();
}

function browserSyncServe(cb) {
  browsersync.init({
    server: { baseDir: paths.output },
    notify: { styles: { top: "auto", bottom: "0" } },
  });
  cb();
}

function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

function bsWatchTask(cb) {
  watch(watchPaths, browserSyncReload);
  watch(watchPaths, { interval: 1000, usePolling: true }, build);
  cb();
}

const build = parallel(svgTask, sassTask, jsTask, imagesTask);

exports.default = build;
exports.watch = watchTask;
exports.server = series(build, browserSyncServe, bsWatchTask);
