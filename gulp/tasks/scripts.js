'use strict';

module.exports = function(gulp, plugins, site) {
  return function() {
    return gulp.src('src/assets/js/**/*.js')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('main.js'))
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js/'));
  };
};
