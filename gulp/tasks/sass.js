'use strict';

var bourbon = require('node-bourbon').includePaths,
    neat = require('node-neat').includePaths;

module.exports = function(gulp, plugins) {
  return function() {
    gulp.src('src/assets/sass/**/*.scss')
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({
        includePaths: bourbon,
        includePaths: neat
      }))
      .on('error',plugins.util.log.bind(plugins.util, 'Sass Error'))
      .pipe(plugins.concat('styles.css'))
      //.pipe(plugins.uncss({html: ['dist/**/*.html']}))
      .pipe(plugins.autoprefixer())
      .pipe(plugins.cleanCss())
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(gulp.dest('dist/css/'));
  };
};