var gulp = require('gulp'),
    browserify = require('browserify'),  // Bundles JS.
    reactify = require('reactify'),  // Transforms React JSX to JS.
    source = require('vinyl-source-stream'),
    paths = require('../config.js');  // To compile Stylus CSS.


// Our JS task. It will Browserify our code and compile React JSX files.
gulp.task('js', ['clean'], function() {
  // Browserify/bundle the JS.
  browserify(paths.app_js)
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(paths.dest));
});
