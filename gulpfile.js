var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('styles', function () {
  return gulp.src('./less/*.less')
    .pipe(less())
    .pipe(autoprefixer('last 2 version'))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./dist/'))
    //.pipe(rename({suffix: '.min'}))
    //.pipe(cssnano())
    //.pipe(gulp.dest('./dist'))
    .pipe(notify({ message: 'Styles task complete' }))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function() {
  return gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/'))
    //.pipe(rename({ suffix: '.min' }))
    //.pipe(uglify())
    //.pipe(gulp.dest('./dist/'))
    .pipe(notify({ message: 'Scripts task complete' }))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('images', function() {
  return gulp.src('./images/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/img'))
    .pipe(notify({ message: 'Images task complete' }))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function() {
    gulp.watch('./js/*.js', ['scripts']);
    gulp.watch(['/less/*.less'], ['styles']);
});

gulp.task('reload', ['browser-sync'], function () {
    gulp.watch("./less/*.less", ['styles']);
    gulp.watch('./js/*.js', ['scripts']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'scripts', 'images', 'watch', 'reload']);
