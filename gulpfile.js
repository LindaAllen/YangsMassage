var gulp = require('gulp'),
    fs = require('fs'),
    s3 = require("gulp-s3-gzip"),
    webserver = require('gulp-webserver'),
    open = require('gulp-open'),
    prettify = require('gulp-prettify'),
    gzip = require('gulp-gzip'),
    imagemin = require('gulp-imagemin'),
    cleanCSS = cleanCSS = require('gulp-clean-css');



gulp.task('prettify', function() {
    gulp.src('src/*.html')
        .pipe(prettify({indent_size: 4}))
        .pipe(gulp.dest('src'))
});

gulp.task('gzip', ['prettify'], function () {
<<<<<<< c415b613b4a502f6fcd20b269f5833e4bb22c393
    gulp.src('./src/index.html')
        .pipe(gzip())
=======
    gulp.src('./src/*.html')
>>>>>>> updating for deploy
        .pipe(gulp.dest('./deploy'));
});

gulp.task('optimize_images', function () {
    return gulp.src('./src/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ]
        }))
        .pipe(gulp.dest('./deploy/images'));
});

gulp.task('minify_css', function () {
    return gulp.src('src/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./deploy'));
});

gulp.task('copy_metadata', function () {
    gulp.src(['./src/*.txt', './src/*.xml'])
        .pipe(gulp.dest('./deploy'))
});

gulp.task('copy_ssl', function () {
    gulp.src('./src/.well-known/**/*')
        .pipe(gulp.dest('./deploy/.well-known'))
});

gulp.task('copy_verify', function () {
    gulp.src('./src/google*.html')
        .pipe(gulp.dest('./deploy'))
});

gulp.task('deploy', ['gzip', 'optimize_images', 'minify_css', 'copy_metadata', 'copy_ssl', 'copy_verify'], function () {
    var aws = JSON.parse(fs.readFileSync('./aws.json')),
        options = { headers: {'Cache-Control': 'max-age=315360000, no-transform, public'} };
    gulp.src('./deploy/**', {read: true, dot: true})
        .pipe(s3(aws, options));
});


gulp.task('webserver', function () {
    gulp.src('src')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});
