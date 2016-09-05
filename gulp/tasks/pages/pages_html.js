'use strict';

module.exports = function(gulp, plugins, site) {
  return function() {
    return gulp.src('src/pages/*.html')
      .pipe(plugins.data(site))
      .pipe(plugins.nunjucks.render())
      .pipe(plugins.htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('dist/pages'));
  };
};
