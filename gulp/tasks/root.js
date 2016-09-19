'use strict';

module.exports = function(gulp, plugins, site) {
  return function() {
    gulp.src('src/*.html')
      .pipe(plugins.data(site))
      .pipe(plugins.nunjucks.render())
      .pipe(plugins.htmlhint())
      .pipe(plugins.htmlhint.reporter())
      .pipe(plugins.htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('dist'));
  };
};
