var browserSync = require('browser-sync').create(), 
  data = require('gulp-data'),
  frontMatter = require('gulp-front-matter'),
  fs = require('fs'),
  gulp = require('gulp'),
  md = require('markdown-it')({ html: true }),
  nunjucks = require('nunjucks');
  path = require('path'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  through = require('through2'),
  url = require('url');

var bourbon = require('node-bourbon').includePaths,
  neat = require('node-neat').includePaths;

var site = require('./config.json');

var env = nunjucks.configure(['src', 'src/partials/', 'src/pages'], {
  noCache: true
});

var mdOptions = {
  html: true
};

var postNamePattern = /(\d{4})-(\d{1,2})-(\d{1,2})-(.*)/;

gulp.task('index', ['posts'], function() {
  gulp.src('src/index.html')
    .pipe(data(site))
    .pipe(nunjucksRender())
    .pipe(gulp.dest('dist'));
});

gulp.task('posts', function() {
  return gulp.src('src/posts/*.md')
    .pipe(frontMatter({ property: 'page', remove: true }))
    .pipe(convertMarkdown())
    .pipe(data(site))
    .pipe(applyNunjucksTemplate('src/partials/_post.html'))
    .pipe(parsePostName())
    .pipe(collectPosts())
    .pipe(rename(function (path) {
      path.extname = ".html";
      var match = postNamePattern.exec(path.basename);
      if (match)
      {
        var year = match[1];            
        var month = match[2];
        var day = match[3];
    
        path.dirname = year + '/' + month + '/' + day;
        path.basename = match[4];
      }            
    }))
    .pipe(gulp.dest('dist/posts'));
});

gulp.task('pages:md', function() {
  return gulp.src('src/pages/*.md')
    .pipe(data(site))
    .pipe(frontMatter({ property: 'page', remove: true }))
    .pipe(convertMarkdown())
    .pipe(applyNunjucksTemplate())
    .pipe(rename(function(path) {
      path.extname = ".html";
    }))
    .pipe(gulp.dest('dist/pages'));
});

gulp.task('pages:html', function() {
  return gulp.src('src/pages/*.html')
    .pipe(data(site))
    .pipe(nunjucksRender())
    .pipe(gulp.dest('dist/pages'));
});

gulp.task('pages', ['pages:md', 'pages:html']);

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
    server: {
      baseDir: "./dist",
      middleware: [addExt]
    }
  });

  gulp.watch('src/**/*.html', ['build', 'reload']);
<<<<<<< HEAD
  gulp.watch('src/pages/*.md', ['build', 'reload']);
=======
  gulp.watch('src/pages/**/*.md', ['pages', 'reload']);
>>>>>>> 0f04e10d460baaebd04e9a75d8f4d812c6c4ad6e
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
});

gulp.task('reload', function() {
  browserSync.reload();
})

gulp.task('build', ['posts', 'pages', 'index', 'sass'], function() {
  gulp.src('assets/*')
    .pipe(gulp.dest('dist/assets/'));
});

gulp.task('clean', function() {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('default', ['serve']);

function convertMarkdown() {
  return through.obj(function (file, enc, cb) {
    file.contents = new Buffer(md.render(file.contents.toString()), 'utf8');
    this.push(file);
    cb();
  });
}

function applyNunjucksTemplate(templateFile) {
  return through.obj(function (file, enc, cb) {
    templateFile = templateFile 
      ? path.join( templateFile) 
      : path.join('src', 'partials', file.page.template);
    var tpl = nunjucks.compile(fs.readFileSync(templateFile, 'utf8').toString(), env);

    var data = Object.assign(file.data, {
      page: file.page,
      content: file.contents.toString()
    });

    file.contents = new Buffer(tpl.render(data), 'utf8');
    this.push(file);
    cb();
  });
}

function nunjucksRender() {
  return through.obj(function (file, enc, cb) {
    file.contents = new Buffer(nunjucks.render(file.path, file.data), 'utf8');
    this.push(file);
    cb();
  });
}

function collectPosts() {
  posts = [];
  return through.obj(function (file, enc, cb) {
    posts.push(file.page);
    this.push(file);
    cb();
  }, function (cb) {
    posts.sort(function (a, b) {
      return b.date - a.date;
    });
    site.posts = posts;
    cb();
  });
}

function parsePostName() {
  return through.obj(function (file, enc, cb) {
    var basename = path.basename(file.path, '.md');
    var match = postNamePattern.exec(basename);
    if (match)
    {
      var year     = match[1];            
      var month    = match[2];
      var day      = match[3];
      var basename = match[4];
      file.page.date = new Date(year, month, day);
      file.page.url  = '/posts/' + year + '/' + month + '/' + day + '/' + basename;
      file.page.path = file.page.url.replace('.html', '');
    }
    
    this.push(file);
    cb();
  })
}