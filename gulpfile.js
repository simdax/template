"use strict";

var gutil = require('gulp-util');


var gulp = require('gulp');
var sass = require('gulp-sass');
// var sass = require('gulp-rename');
var browserSync = require('browser-sync');

gulp.task('sync', function () {
	browserSync({server:{baseDir:'.'}})
})

gulp.task('sass', function() {
	gulp.src("sass/*.scss")
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./css'))
	.pipe(browserSync.reload({stream:true}))
})

var coffeescript = require('gulp-coffeescript');
 
gulp.task('coffee', function() {
  gulp.src('./js/*.coffee')
    .pipe(coffeescript({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./public/'))
		.pipe(browserSync.reload({stream:true}))
});


var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');

gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({stream:true}));
});

//     __  ______    _____   __
//    /  |/  /   |  /  _/ | / /
//   / /|_/ / /| |  / //  |/ /
//  / /  / / ___ |_/ // /|  /
// /_/  /_/_/  |_/___/_/ |_/



gulp.task('run', ['sync'], function () {
	gulp.watch("index.html").on('change', browserSync.reload);
	
	gulp.watch("sass/*", ["sass"]);
	gulp.watch("css/*", ["minify-css"]);

	gulp.watch("js/*.coffee", ["coffee"]);
} )
