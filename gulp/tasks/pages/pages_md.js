'use strict';

module.exports = function(gulp, plugins, site) {
  return function() {
    return gulp.src('src/pages/*.md')
      .pipe(plugins.data(site))
      .pipe(plugins.frontMatter({ property: 'page', remove: true }))
      .pipe(plugins.md())
      .pipe(plugins.nunjucks.apply())
      .pipe(plugins.rename(function(path) {
        path.extname = '.html';
      }))
      .pipe(plugins.htmlhint())
      .pipe(plugins.htmlhint.reporter())
      .pipe(plugins.htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('dist/pages'));
  };
};
