'use strict';

module.exports = function(gulp, plugins) {
  return function() {
    return gulp.src('src/assets/images/**/*.+(png|jpg|gif|svg)')
      .pipe(plugins.imagemin())
      .pipe(gulp.dest('dist/images/'));
  };
};