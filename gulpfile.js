const multiEntry = require("rollup-plugin-multi-entry")
const gulp = require('gulp');
const rollupEach = require('gulp-rollup-each');

gulp.task('rollup', () => {
    return gulp.src([
        'src/module/**/*.js'
    ]).pipe(rollupEach({
        output: {
            format: 'cjs'
        },
        globals: {
            jquery: 'jQuery'
        },
        // 不需要打包的文件
        external : []
    })).pipe(gulp.dest('dist'))
});