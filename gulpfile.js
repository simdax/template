"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

// sass adds
const prefix = require('gulp-autoprefixer');
const comb = require('gulp-csscomb');
const beautify = require('gulp-cssbeautify');
const minify = require('gulp-minify-css');

gulp.task('sync', function () {
	browserSync({server:{baseDir:'.'}})
})

gulp.task('sass', function() {
	gulp.src("sass/*.sass")
	.pipe(sass().on('error', sass.logError))
  .pipe(comb())
  .pipe(beautify())
	.pipe(gulp.dest('./css'))
  // il ne va pas balancer les partials
	.pipe(browserSync.reload({stream:true}))
})


var concat = require('gulp-concat');

gulp.task('minify-css', function() {
     gulp.src('css/*.css')
//    .pipe(cleanCSS({compatibility: 'ie8'}))
    // .pipe(concat('style.min.css'))
    .pipe(minify())
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

// const nodemon = require('gulp-nodemon');
// const bs = require('browser-sync').create();

// // our browser-sync config + nodemon chain
// gulp.task('browser-sync', ['nodemon'], function() {
// 	bs.init(null, {
// 		proxy: "http://localhost:3000",
// 		browser: "chromium-browser",
// 		port: 4000,
// 	});
// });

// // the real stuff
// gulp.task('default', ['browser-sync'], function () {
// 	gulp.watch('./views/**/*.pug', bs.reload);
// 	gulp.watch('./public/**/*.js', bs.reload);
// 	gulp.watch('./public/**/*.css', bs.reload);
// 	gulp.watch(['./routes/**/*.js', './app.js', './bin/www'], ['bs-delay']);
// });

// // give nodemon time to restart
// gulp.task('bs-delay', function () {
//   setTimeout(function () {
//     bs.reload({ stream: false });
//   }, 1000);
// });

// // our gulp-nodemon task
// gulp.task('nodemon', function (cb) {
// 	var started = false;
// 	return nodemon({
// 		script: './bin/www',
// 		ext: 'js',
// 		// ignore: ['public/**/*.js'],
// 		env: {
// 			'NODE_ENV': 'development',
// 			'DEBUG': 'appname:*'
// 	 }
// 	}).on('start', function () {
// 		//avoid nodemon being started multiple times
// 		if (!started) {
// 			cb();
// 			started = true;
// 		}
// 	})
// 	.on('crash', function() {
// 		// console.log('nodemon.crash');
// 	})
// 	.on('restart', function() {
// 		// console.log('nodemon.restart');
// 	})
// 	.once('quit', function () {
// 		// handle ctrl+c without a big weep
// 		process.exit();
// 	});
// });