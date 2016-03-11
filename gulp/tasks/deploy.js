'use strict';

module.exports = function(gulp, plugins, site) {
  return function() {
    return plugins.surge({
      project: './dist',
      domain: site.CNAME
    });
  };
};