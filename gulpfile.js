var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    angularTemplateCache = require('gulp-angular-templatecache'),
    addStream = require('add-stream'),
    connect = require('gulp-connect');

gulp.task('clean', function() {
    return del(['dist/client/**', '!dist/client' ]);
});

gulp.task('styles', function() {
  return sass('src/client/app/assets/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/client/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/client/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src(['src/client/app/**/*.js', '!src/client/app/bower_modules/**/*.js'])
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/client'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/client'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('src/client/app/**/*.jpg')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/client/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('move', function(){

  gulp.src('src/client/app/*.html')
  .pipe(gulp.dest('dist/client'));

  gulp.src(['src/client/app/**/*.html', 'src/client/app/*.html'])
  .pipe(gulp.dest('dist/client'));

  gulp.src(['src/client/app/bower_modules/**/*.min.js', 'src/client/app/bower_modules/**/*.min.css'])
  .pipe(gulp.dest('dist/client/assets'));

});

gulp.task('connect', function() {
  connect.server({
		root: './dist/client/'
  });
});

gulp.task('default', ['clean'], function() { /*'clean', */
  gulp.start('styles', 'scripts', 'move' ,'connect', 'watch');
});

gulp.task('watch', function() {

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['src/client/app/**']).on('change', livereload.changed);

});
