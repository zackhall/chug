'use strict';

module.exports = function(gulp, plugins, site) {
  return function() {
    return plugins.bower();
  };
};
