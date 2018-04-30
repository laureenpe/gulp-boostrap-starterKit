'use strict'

// dependencies
const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');


gulp.task('sass', () => {
	return gulp.src([
		'node_modules/bootstrap/dist/css/bootstrap.css',
		'node_modules/swiper/dist/css/swiper.min.css',
		'src/scss/*.scss'
	])
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('build/css'))
		.pipe(browserSync.stream());
});

gulp.task('js', () => {
	return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
		'node_modules/bootstrap/dist/js/bootstrap.min.js',
		'node_modules/popper.js/dist/umd/popper.min.js',
        'src/js/*.js'
        		
	])
		.pipe(concat('script.js'))
		.pipe(minify())
		.pipe(gulp.dest('build/js'))
		.pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], () => {
	browserSync.init({
		server: './build/'
	});

	gulp.watch([
		'src/scss/*.scss'
	], ['sass']);

	gulp.watch('build/*.html').on('change', browserSync.reload);

});

gulp.task('default', ['js', 'serve'])