'use strict';

module.exports = function(gulp, plugins) {
  return function() {
    return plugins.del([
      'dist/**/*'
    ]);
  };
};
