var gulp = require('gulp');

var plugins = {
  browserSync: require('browser-sync').create(),
  concat: require('gulp-concat'),
  data: require('gulp-data'),
  del: require('del'),
  frontMatter: require('gulp-front-matter'),
  md: require('./gulp/lib/md'),
  minify: require('gulp-minify-css'),
  nunjucks: require('./gulp/lib/nunjucks'),
  rename: require('gulp-rename'),
  sass: require('gulp-sass'),
  surge: require('gulp-surge')
};

var site = require('./config.json');

function getTask(task) {
  return require('./gulp/tasks/' + task)(gulp, plugins, site);
}

gulp.task('assets', getTask('assets'));
gulp.task('build', ['posts', 'pages', 'root', 'sass', 'assets']);
gulp.task('clean', getTask('clean'));
gulp.task('default', ['serve']);
gulp.task('deploy', ['build'], getTask('deploy'));
gulp.task('posts', getTask('posts'));
gulp.task('pages', ['pages:md', 'pages:html']);
gulp.task('pages:html', getTask('pages/pages_html'));
gulp.task('pages:md', getTask('pages/pages_md'));
gulp.task('reload', function() { browserSync.reload(); });
gulp.task('root', ['posts'], getTask('root'));
gulp.task('sass', getTask('sass'));
gulp.task('serve', ['build'], getTask('serve'));