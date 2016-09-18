// Load all dependencies
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

// Initialize live server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Turn all LESS files into CSS | Concatenate and add vendor prefixes | Place CSS files in 'dist' folder
gulp.task('styles', function () {
  return gulp.src('./less/*.less')
    .pipe(less())
    .pipe(autoprefixer('last 2 version'))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./dist/'))
    //.pipe(rename({suffix: '.min'}))  -- Will be added when code is in production
    //.pipe(cssnano())
    //.pipe(gulp.dest('./dist'))
    .pipe(notify({ message: 'Styles task complete' }))
    .pipe(browserSync.reload({stream: true}));
});

// Concatenate all JS files | Initialize linting system | Place JS files in 'dist' folder
gulp.task('scripts', function() {
  return gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/'))
    //.pipe(rename({ suffix: '.min' }))  -- Will be added when code is in production
    //.pipe(uglify())
    //.pipe(gulp.dest('./dist/'))
    .pipe(notify({ message: 'Scripts task complete' }))
    .pipe(browserSync.reload({stream: true}));
});

// Compress images | Place images in 'dist/img' folder
gulp.task('images', function() {
  return gulp.src('./images/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/img'))
    .pipe(notify({ message: 'Images task complete' }))
    .pipe(browserSync.reload({stream: true}));
});

// Server watches folder for changes and auto-reloads
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("./less/*.less", ['styles']);
    gulp.watch('./js/*.js', ['scripts']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Default gulp task
gulp.task('default', ['styles', 'scripts', 'images', 'watch']);

