'use strict';

module.exports = function(gulp, plugins) {
    return function() {
        return gulp.src('dist/*.html')
            .pipe(plugins.inline({
                base: 'dist/',
                css: plugins.cleanCss,
                js: plugins.uglify,
                disabledTypes: ['img']
            }))
            .pipe(plugins.htmlmin({
                collapseWhitespace: true,
                removeComments: true,
                jsmin: true,
                minifyCSS: true
            }))
            .pipe(gulp.dest('dist/'));
    };
};