var gulp = require('gulp'),
plugins = require('gulp-load-plugins')();

plugins = Object.assign(plugins, {
  //Custom requires
  md: require('./gulp/lib/md'),
  nunjucks: require('./gulp/lib/nunjucks'),
  browserSync: require('browser-sync').create(),
  del: require('del'),
  mainBowerFiles: require('main-bower-files'),
  runSequence: require('run-sequence')
});

var site = require('./config.json');

function getTask(task) {
  return require('./gulp/tasks/' + task)(gulp, plugins, site);
}

gulp.task('clean', getTask('clean'));

gulp.task('pages:html', getTask('pages/pages_html'));
gulp.task('pages:md', getTask('pages/pages_md'));
gulp.task('posts', getTask('posts'));
gulp.task('root', ['posts'], getTask('root'));
gulp.task('pages', ['pages:md', 'pages:html']);

gulp.task('bower', getTask('bower'));
gulp.task('vendorjs', getTask('vendor-js'));
gulp.task('vendorcss', getTask('vendor-css'));
gulp.task('vendor', function(cb){
  plugins.runSequence('bower', 'vendorjs', 'vendorcss', 'reload');
  cb();
});

gulp.task('custom-fonts', getTask('custom-fonts'));
gulp.task('google-fonts', getTask('google-fonts'));
gulp.task('fonts', ['custom-fonts', 'google-fonts']);

gulp.task('scripts', getTask('scripts'));
gulp.task('sass', getTask('sass'));
gulp.task('images', getTask('images'));

gulp.task('build', function(cb){
  plugins.runSequence('vendor', 'posts', 'root', 'pages', ['scripts', 'images', 'sass', 'fonts'], 'reload');
  cb();
});

gulp.task('serve', ['build'], getTask('serve'));
gulp.task('reload', function() { setTimeout(function(){
  plugins.browserSync.reload();
}, 1000); });
gulp.task('default', ['serve']);
gulp.task('deploy', ['build'], getTask('deploy'));