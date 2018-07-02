'use strict'

// dependencies
const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

gulp.task('sass', () => {
	return gulp.src([
			'node_modules/bootstrap/dist/css/bootstrap.css',
			'node_modules/swiper/dist/css/swiper.min.css',
			'src/scss/main.scss'
		])
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS({
			compatibility: 'ie8'
		}))
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
//gulp plugin to minify HTML.
gulp.task('minify-html', function () {
	return gulp.src('src/templates/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('Public/'));
});

// Configuration
var configuration = {
	paths: {
		src: {
			fonts: './src/font/**',
			fontface: './src/fonts.css',
		},
		dist: './Public'

	}
};
// Gulp task to copy Font files to output directory
gulp.task('fonts', function () {
	gulp.src(configuration.paths.src.fonts)
		.pipe(gulp.dest(configuration.paths.dist + '/css/font'))
});
gulp.task('fontface', function () {
	gulp.src(configuration.paths.src.fontface)
		.pipe(gulp.dest(configuration.paths.dist + '/css/'))
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

	gulp.watch(['src/scss/*.scss'], ['sass']);
	gulp.watch('src/js/*.js', ['js']);
	gulp.watch('src/templates/*.html', ['html']);
	gulp.watch('src/templates/*.html').on('change', browserSync.reload);
	// Watch image files
	gulp.watch('src/images/**/*', ['images', browserSync.reload]);

});


// Gulp default task
gulp.task('default', ['js', 'images', 'serve', 'minify-html', 'fonts', 'fontface'])