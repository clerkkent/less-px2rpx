const px2rem = require('./px2rpx.js');
const gulp = require('gulp');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
const less = require('gulp-less');
const path = require('path');

gulp.task('less', () => {
    return gulp.src('./pages/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')],
            plugins: [autoprefix]
        }))
        .pipe(px2rem({
            'width_design': 1242,
            'valid_num': 6,
            'pieces': 750,
            'ignore_px': [1, 2],
            'ignore_selector': ['.class1']
        }))
        .pipe(gulp.dest(function(file) { return file.base; }));
});

gulp.task("watch", function() {
    gulp.watch("./pages/**/*.less", gulp.series("less"));
})
gulp.task('default', gulp.series("less", "watch")); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务