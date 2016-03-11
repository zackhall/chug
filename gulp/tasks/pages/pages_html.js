'use strict';

module.exports = function(gulp, plugins, site) {
  return function() {
    return gulp.src('src/pages/*.html')
      .pipe(plugins.data(site))
      .pipe(plugins.nunjucks.render())
      .pipe(gulp.dest('dist/pages'));
  };
};
