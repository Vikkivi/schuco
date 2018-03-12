"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');


gulp.task('common-js', function() {
	return gulp.src([
		'js/common.js',
		])
	.pipe(concat('common.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('js'));
});

gulp.task('js', ['common-js'], function() {
	return gulp.src([
		'libs/jquery/dist/jquery.min.js',
		'js/common.min.js', // Всегда в конце
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('js'))
	.pipe(server.reload({stream: true}));
});



gulp.task("style", function() {
  gulp.src("sass/main.scss")
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("css"))
    .pipe(server.stream());
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch(['libs/**/*.js', 'js/common.js'], ['js']);
  gulp.watch("*.html").on("change", server.reload);
});

gulp.task('default', ['serve']);