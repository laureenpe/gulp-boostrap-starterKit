'use strict'

// requerimos las dependencia
const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');



gulp.task('sass', () => {
	return gulp.src([
		'node_modules/bootstrap/dist/css/bootstrap.css',
		'node_modules/swiper/dist/css/swiper.min.css',
		'src/scss/main.scss'
	])
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('Public/css'))
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
		.pipe(gulp.dest('Public/js'))
		.pipe(browserSync.stream());
});

// Optimizes the images that exists
gulp.task('images', () =>
    gulp.src('src/images/**')
        .pipe(imagemin())
        .pipe(gulp.dest('Public/images'))
);
gulp.task('serve', ['sass'], () => {
	browserSync.init({
		server: './Public/'
	});

	gulp.watch([
		'src/scss/*.scss'
	], ['sass']);

	gulp.watch('Public/*.html').on('change', browserSync.reload);
	 // Watch image files
	 gulp.watch('src/images/**/*', ['images', browserSync.reload]);

});



gulp.task('default', ['js', 'images','serve'])