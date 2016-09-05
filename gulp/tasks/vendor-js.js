'use strict';

module.exports = function(gulp, plugins, site) {
  return function() {
    return gulp.src(plugins.mainBowerFiles())
    .pipe(plugins.filter('**/*.js'))
    .pipe(plugins.concat('vendor.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('dist/js/'));
  };
};
