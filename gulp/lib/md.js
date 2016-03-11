'use strict';

var through = require('through2'),
    md = require('markdown-it')({ html: true });

module.exports = function() {
  return through.obj(function (file, enc, cb) {
    file.contents = new Buffer(md.render(file.contents.toString()), 'utf8');
    this.push(file);
    cb();
  });
};