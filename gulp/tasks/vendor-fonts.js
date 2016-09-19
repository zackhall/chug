'use strict';

module.exports = function(gulp, plugins, site) {
    return function() {
        return gulp.src(plugins.mainBowerFiles())
            .pipe(plugins.filter('**/fonts/*.+(otf|eot|svg|ttf|woff|woff2)'))
            .pipe(gulp.dest('dist/fonts/'));
    };
};
