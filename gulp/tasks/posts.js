'use strict';

var path = require('path'),
    through = require('through2');

var postNamePattern = /(\d{4})-(\d{1,2})-(\d{1,2})-(.*)/;

module.exports = function(gulp, plugins, site) {
  return function() {
    gulp.src('src/posts/*.md')
      .pipe(plugins.frontMatter({ property: 'page', remove: true }))
      .pipe(plugins.md())
      .pipe(plugins.data(site))
      .pipe(plugins.nunjucks.apply('src/partials/_post.html'))
      .pipe(parsePostName())
      .pipe(collectPosts())
      .pipe(plugins.rename(function (path) {
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
      .pipe(plugins.htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('dist/posts'));
  };

  function collectPosts() {
    var posts = [];
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
};