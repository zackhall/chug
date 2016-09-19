'use strict';

module.exports = function(gulp, plugins) {
  return function() {
    return gulp.src('./fonts.list')
      .pipe(plugins.googleWebfonts({fontsDir: 'fonts/'}))
      .pipe(gulp.dest('dist/fonts'));
  };
};