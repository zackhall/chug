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

    gulp.watch('src/**/*.html', function(){
      plugins.runSequence('build', 'reload');
    });
    gulp.watch('src/pages/*.md', function(){
      plugins.runSequence('build', 'reload');
    });
    gulp.watch('src/posts/**/*.md', function(){
      plugins.runSequence('posts', 'reload');
    });
    gulp.watch('src/assets/sass/**/*.scss', function(){
      plugins.runSequence('sass', 'reload');
    });
    gulp.watch('src/assets/js/**/*.js', function(){
      plugins.runSequence('scripts', 'reload');
    });
    gulp.watch('bower.json', function(){
      plugins.runSequence('vendor', 'reload');
    });
    gulp.watch('fonts.list', function(){
      plugins.runSequence('google-fonts', 'reload');
    });

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