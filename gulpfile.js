var browserSync = require('browser-sync').create(), 
  data = require('gulp-data'),
  frontMatter = require('gulp-front-matter'),
  gulp = require('gulp'),
  gulpSwig = require('gulp-swig'),
  marked = require('gulp-marked'),
  path = require('path'),
  sass = require('gulp-sass'),
  swig = require('swig'),
  through = require('through2');

var bourbon = require('node-bourbon').includePaths,
  neat = require('node-neat').includePaths;

var config = function() {
  return require('./config.json');
};

gulp.task('index', function() {
  gulp.src('src/index.html')
    .pipe(data(config))
    .pipe(gulpSwig({ 
      defaults: { cache: false }
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('posts', function() {
  gulp.src('src/posts/*.md')
    .pipe(frontMatter({ property: 'page', remove: true }))
    .pipe(marked())
    .pipe(applyTemplate('src/partials/_post.html'))
    .pipe(gulp.dest('dist/posts'));
});

gulp.task('sass', function() {
  gulp.src('src/scss/**/*.scss')
    .pipe(sass({
        includePaths: bourbon,
        includePaths: neat
      }))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('serve', ['build'], function() {

  browserSync.init({
    server: "./dist"
  });

  gulp.watch('src/index.html', ['index', 'reload']);
  gulp.watch('src/posts/**/*.md', ['posts', 'reload']);
  gulp.watch('src/scss/**/*.scss', ['sass', 'reload']);
});

gulp.task('reload', function() {
  browserSync.reload();
})

gulp.task('build', ['index', 'posts', 'sass']);

gulp.task('default', ['build']);

function applyTemplate(templateFile) {
  var tpl = swig.compileFile(path.join(__dirname, templateFile));

  return through.obj(function (file, enc, cb) {            
    var data = {
      page: file.page,
      content: file.contents.toString()
    };            
    file.contents = new Buffer(tpl(data), 'utf8');
    this.push(file);
    cb();
  });
}