"use strict";

const { src, dest } = require("gulp");
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const cssbeautify = require("gulp-cssbeautify");
const removeComments = require("gulp-strip-css-comments");
const rename = require("gulp-rename");
const sass = require('gulp-sass')(require('sass'));
const cssnano = require("gulp-cssnano");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rigger = require("gulp-rigger");
const plumber = require("gulp-plumber");
const panini = require("panini");
const imagemin = require("gulp-imagemin");
const del = require("del");
const notify = require("gulp-notify");
const browserSync = require("browser-sync").create();

/* Paths */
const srcPath = "src/";
const distPath = "dist/";

const path = {
  build: {
    html: distPath,
    js: distPath + "assets/js/",
    css: distPath + "assets/css/",
    images: distPath + "assets/images/",
    fonts: distPath + "assets/fonts/",
  },
  src: {
    html: srcPath + "*.html",
    js: srcPath + "assets/js/*.js",
    css: srcPath + "assets/scss/*.scss",
    images:
      srcPath +
      "assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
    fonts: srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}",
  },
  watch: {
    html: srcPath + "**/*.html",
    js: srcPath + "assets/js/**/*.js",
    css: srcPath + "assets/scss/**/*.scss",
    images:
      srcPath +
      "assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
    fonts: srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}",
  },
  clean: "./" + distPath,
};

/* Tasks */

function serve() {
  browserSync.init({
    server: {
      baseDir: "./" + distPath,
    },
  });
}

function html(cb) {
  panini.refresh();
  return src(path.src.html, { base: srcPath })
    .pipe(plumber())
    .pipe(
      panini({
        root: srcPath,
        layouts: srcPath + "layouts/",
        partials: srcPath + "partials/",
        helpers: srcPath + "helpers/",
        data: srcPath + "data/",
      })
    )
    .pipe(dest(path.build.html))
    .pipe(browserSync.reload({ stream: true }));

  cb();
}

function css(cb) {
  return src(path.src.css, { base: srcPath + "assets/scss/" })
    .pipe(
      sass({
        includePaths: "./node_modules/",
      })
    )
    .pipe(
      autoprefixer({
        cascade: true,
      })
    )
    .pipe(cssbeautify())
    .pipe(dest(path.build.css))
    .pipe(
      cssnano({
        zindex: false,
        discardComments: {
          removeAll: true,
        },
      })
    )
    .pipe(removeComments())
    .pipe(
      rename({
        suffix: ".min",
        extname: ".css",
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browserSync.reload({ stream: true }));

  cb();
}

function cssWatch(cb) {
  return src(path.src.css, { base: srcPath + "assets/scss/" })
    .pipe(
      sass({
        includePaths: "./node_modules/",
      })
    )
    .pipe(
      rename({
        suffix: ".min",
        extname: ".css",
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browserSync.reload({ stream: true }));

  cb();
}

function js(cb) {
  return src(path.src.js, { base: srcPath + "assets/js/" })
    .pipe(rigger())
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(gulp.dest(path.build.js))
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
        extname: ".js",
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browserSync.reload({ stream: true }));

  cb();
}

function jsWatch(cb) {
  return src(path.src.js, { base: srcPath + "assets/js/" })
    .pipe(rigger())
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(gulp.dest(path.build.js))
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
        extname: ".js",
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browserSync.reload({ stream: true }));

  cb();
}

function images(cb) {
  return src(path.src.images)
    .pipe(dest(path.build.images))
    .pipe(browserSync.reload({ stream: true }));

  cb();
}

function fonts(cb) {
  return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
    .pipe(browserSync.reload({ stream: true }));

  cb();
}

function clean(cb) {
  return del(path.clean);

  cb();
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], cssWatch);
  gulp.watch([path.watch.js], jsWatch);
  gulp.watch([path.watch.images], images);
  gulp.watch([path.watch.fonts], fonts);
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts));
const watch = gulp.parallel(build, watchFiles, serve);

/* Exports Tasks */
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;
