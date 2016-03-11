'use strict';

var fs = require('fs'),
    nunjucks = require('nunjucks'),
    path = require('path'),
    through = require('through2');

var env = nunjucks.configure(['src', 'src/partials/', 'src/pages'], {
  noCache: true
});

function render() {
  return through.obj(function (file, enc, cb) {
    file.contents = new Buffer(nunjucks.render(file.path, file.data), 'utf8');
    this.push(file);
    cb();
  });
}

function apply(templateFile) {
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

module.exports = {
  render: render,
  apply: apply
};