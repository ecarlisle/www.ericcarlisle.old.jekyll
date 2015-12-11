/* jshint node: true */
'use strict';

var gulp = require('gulp'),
  addsrc = require('gulp-add-src'),
  combinemq = require('gulp-combine-mq'),
  concat = require('gulp-concat'),
  debug = require('gulp-debug'),
  gutil = require('gulp-util'),
  jshint = require('gulp-jshint'),
  livereload = require('gulp-livereload'),
  minifycss = require('gulp-cssmin'),
  order = require('gulp-order'),
  plumber = require('gulp-plumber'),
  rimraf = require('gulp-rimraf'),
  sass = require('gulp-ruby-sass'),
  sequence = require('run-sequence'),
  sourcemaps = require('gulp-sourcemaps'),
  cp = require('child_process'),
  stylish = require('jshint-stylish'),
  uglify = require('gulp-uglify'),
  filter = require('gulp-filter'),
  argv = require('yargs').argv,
  gulpif = require('gulp-if');

gulp.task('clean', function() {
  return gulp.src(['_site/*','assets/*'])
    .pipe(plumber())
    .pipe(rimraf());
});
 
gulp.task('notify', function() {
  server.notify();
});

gulp.task('styles', function() {
  return sass('_src/scss/main.scss',{ sourcemap: true, style: 'expanded' })//.on('error', onError)
    .pipe(addsrc('_src/css/bootstrap-grid.css'))
    .pipe(order(['_src/css/bootstrap-grid.css','_src/scss/main.scss'
    ]))
    .pipe(concat('main.css'))
    //.pipe(combinemq({beautify: true}))
    .pipe(gulpif(argv.production,sourcemaps.write()))
//  .pipe(minifycss())
  .pipe(gulp.dest('assets/css/'));
});

gulp.task('scripts', function() {
  return gulp.src('_src/js/main.js')
    .pipe(sourcemaps.init())
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(addsrc('bower_components/jquery/dist/jquery.js'))
    .pipe(order([
      'bower_components/jquery/dist/jquery.js',
      '_src/js/main.js'
    ]))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/js'));
});

gulp.task('fonts', function() {
  

  return gulp.src(['_src/fonts/**/*'])
    .pipe(gulp.dest('assets/fonts'));
});

gulp.task('images', function() {
  return gulp.src('_src/img/**/*')
    .pipe(gulp.dest('assets/img'));
});

gulp.task('svg', function() {
  return gulp.src('_src/svg/**/*')
    .pipe(gulp.dest('assets/svg'));
});

gulp.task('jekyll', function() {
  return cp.execSync(['jekyll build --quiet'], {
    stdio: 'inherit'
  });
});

gulp.task('jekyll-incremental', function() {
  return cp.execSync(['jekyll build --quiet'], {
    stdio: 'inherit'
  });
  livereload.reload();
});

gulp.task('default', function() {
  var server = livereload({start:true});
  sequence('clean', ['scripts', 'styles', 'fonts', 'images', 'svg'], 'jekyll', 'watch');
});


gulp.task('watch', function() {

  gulp.watch(['_src/scss/**/*.scss','_src/css/**/*.css'], function(file) {
    sequence('styles', 'jekyll-incremental');
  });

  gulp.watch('_src/svg/**/*.svg', function(file) {
    sequence('svg', 'jekyll-incremental');
  });

  gulp.watch('_src/js/**/*.js', function(file) {
    sequence('scripts', 'jekyll-incremental');
  });

  gulp.watch('_src/img/**/*.*', function(file) {
    sequence('images', 'jekyll-incremental');
  });

  gulp.watch('_src/fonts/**/*.*', function(file) {
    sequence('fonts', 'jekyll-incremental');
  });

  gulp.watch(['*.html', '_layouts/*.html', '_posts/*.*', '_includes/*.html'], function(file) {
    sequence('jekyll-incremental');
  });

});

function onError(err) {
  gutil.beep();
  return gutil.log(gutil.colors.red(err));
}