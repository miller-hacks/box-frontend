var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    concat = require('gulp-concat-css'),
    paths = require('../config.js');


// Our CSS task. It finds all our Stylus files and compiles them.
gulp.task('css', ['clean'], function() {
  return gulp.src(paths.css)
    .pipe(stylus())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(paths.dest));
});
