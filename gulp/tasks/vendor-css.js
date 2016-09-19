'use strict';

module.exports = function(gulp, plugins, site) {
  return function() {
    return gulp.src(plugins.mainBowerFiles())
    .pipe(plugins.filter('**/*.css'))
    .pipe(plugins.concat('vendor.css'))
    .pipe(plugins.cleanCss())
    .pipe(gulp.dest('dist/css/'));
  };
};
