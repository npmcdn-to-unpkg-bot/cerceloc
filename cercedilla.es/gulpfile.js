var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    del = require('del'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    cp = require('child_process'),
    changed = require('gulp-changed'),
    size = require('gulp-size');


gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "."
    }
  });
});

gulp.task('watch', function() {
  gulp.watch(['./**/*.html', './**/*.js', './**/*.css']).on('change' , function () {
      browserSync.reload();
  });
});

gulp.task('default', function() {
    gulp.start('browser-sync', 'watch');
});
