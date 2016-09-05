'use strict';

module.exports = function(gulp, plugins) {
  return function() {
    return gulp.src('./fonts.list')
      .pipe(plugins.googleWebfonts({}))
      .pipe(gulp.dest('dist/fonts'));
  };
};