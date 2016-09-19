'use strict';

module.exports = function(gulp, plugins, site) {
  return function() {
    return gulp.src('src/pages/*.html')
      .pipe(plugins.data(site))
      .pipe(plugins.nunjucks.render())
      .pipe(plugins.htmlhint())
      .pipe(plugins.htmlhint.reporter())
      .pipe(plugins.htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        jsmin: true
      }))
      .pipe(gulp.dest('dist/pages'));
  };
};
