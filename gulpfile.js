"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
// var sass = require('gulp-rename');
var browserSync = require('browser-sync');

gulp.task('sync', function () {
	browserSync({server:{baseDir:'.'}})
})

gulp.task('sass', function() {
	gulp.src("sass/*")
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./css'))
	.pipe(browserSync.reload())
})
gulp.task('run', ['sync'], function () {
	gulp.watch("sass/*")
} )
