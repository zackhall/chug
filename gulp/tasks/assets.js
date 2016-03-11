'use strict';

module.exports = function(gulp, plugins) {
  return function() {
    return gulp.src('src/assets/*')
      .pipe(gulp.dest('dist/assets/'));
  };
};