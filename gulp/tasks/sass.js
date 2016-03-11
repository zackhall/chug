'use strict';

var bourbon = require('node-bourbon').includePaths,
    neat = require('node-neat').includePaths;

module.exports = function(gulp, plugins) {
  return function() {
    gulp.src('src/scss/**/*.scss')
      .pipe(plugins.sass({
        includePaths: bourbon,
        includePaths: neat
      }))
      .pipe(plugins.concat('styles.css'))
      .pipe(plugins.minify())
      .pipe(gulp.dest('dist/css/'));
  };
};