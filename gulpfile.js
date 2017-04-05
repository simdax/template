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






//////////////////////////////////////
// Simple task to update our views  //
//////////////////////////////////////

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const bs = require('browser-sync').create();

// our browser-sync config + nodemon chain
gulp.task('browser-sync', ['nodemon'], function() {
	bs.init(null, {
		proxy: "http://localhost:3000",
		browser: "chromium-browser",
		port: 4000,
	});
});

// the real stuff
gulp.task('default', ['browser-sync'], function () {
	gulp.watch('./views/**/*.pug', bs.reload);
	gulp.watch('./public/**/*.js', bs.reload);
	gulp.watch('./public/**/*.css', bs.reload);
	gulp.watch(['./routes/**/*.js', './app.js', './bin/www'], ['bs-delay']);
});

// give nodemon time to restart
gulp.task('bs-delay', function () {
  setTimeout(function () {
    bs.reload({ stream: false });
  }, 1000);
});

// our gulp-nodemon task
gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({
		script: './bin/www',
		ext: 'js',
		// ignore: ['public/**/*.js'],
		env: {
			'NODE_ENV': 'development',
			'DEBUG': 'appname:*'
	 }
	}).on('start', function () {
		//avoid nodemon being started multiple times
		if (!started) {
			cb();
			started = true;
		}
	})
	.on('crash', function() {
		// console.log('nodemon.crash');
	})
	.on('restart', function() {
		// console.log('nodemon.restart');
	})
	.once('quit', function () {
		// handle ctrl+c without a big weep
		process.exit();
	});
});