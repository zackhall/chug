'use strict';

var url = require('url');

module.exports = function(gulp, plugins) {
  return function() {
    plugins.browserSync.init({
      server: {
        baseDir: "./dist",
        middleware: [addExt]
      }
    });

    gulp.watch('src/**/*.html', ['build', 'reload']);
    gulp.watch('src/pages/*.md', ['build', 'reload']);
    gulp.watch('src/posts/**/*.md', ['posts', 'reload']);
    gulp.watch('src/scss/**/*.scss', ['sass', 'reload']);

    function addExt(req, res, next) {
      var parsed = url.parse(req.url);
      if (parsed.pathname 
        && parsed.pathname != '/'
        && parsed.pathname.split('.').length <= 1) {
        req.url += '.html';
      }

      next();
    }
  };
};