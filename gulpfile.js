var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var htmlreplace = require('gulp-html-replace');
var browserify = require('gulp-browserify');

var paths = {
  JS: 'assets/js',
  JSX: 'assets/jsx',
  JS_SCRIPTS: 'assets/js/**/*.js',
  JSX_SCRIPTS: 'assets/jsx/**/*.jsx',
};

var scripts = [
	paths.JS + 'modernizr.2.8.3.js'
]

gulp.task('combine', function() {
  return gulp.src(scripts)
    .pipe(gulp.dest(paths.JS));
});

gulp.task('lint', function() {
  return gulp.src(paths.JS_SCRIPTS)
	.pipe(jshint('.jshintrc'))
	.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('react', function() {
  return gulp.src(paths.JSX_SCRIPTS)
	.pipe(react())
  .pipe(concat('components.js'))
  .pipe(uglify())
	.pipe(gulp.dest(paths.JS));
});

gulp.task('default', function() {
	
});