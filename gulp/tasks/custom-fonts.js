'use strict';

module.exports = function(gulp, plugins) {
  return function() {
    return gulp.src('src/assets/fonts/**/*')
      .pipe(gulp.dest('dist/fonts/'));
  };
};