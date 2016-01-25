/* // Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']); */

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();
var minifyCSS = require('gulp-minify-css');
var embedlr = require('gulp-embedlr');

var webserver = require('gulp-webserver');
var connect = require('gulp-connect');

var plugins = require("gulp-load-plugins")

var inject = require('gulp-inject');

gulp.task('plugins', function(){
	gulp.src(plugins.mainBowerFiles())
	.pipe(gulp.dest('dist/build'));

});

gulp.task('scripts', function() {
	
	var target = gulp.src('src/client/app/index.html')
	var sources = gulp.src(['src/client/app/*.js'], {read:false});

	return target.pipe(inject(sources))
    .pipe(gulp.dest('dist/build/js'));

		//.pipe( inject() )
        //.pipe(browserify())
        //.pipe(concat('dest.js'))
        //.pipe(gulp.dest('dist/build'))
        //.pipe(refresh(server))
})

gulp.task('styles', function() {
    gulp.src(['src/client/app/css/*.less'])
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/build'))
        //.pipe(refresh(server))
})

gulp.task('lr-server', function() {
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
})

gulp.task('html', function() {
    gulp.src("src/client/app/*.html")
        //.pipe(embedlr())
        .pipe(gulp.dest('dist/'))
        //.pipe(refresh(server));
})

gulp.task('webserver', function() {
	connect.server();
});


gulp.task('default', function() {
    gulp.run('lr-server', 'scripts', 'styles', 'html', 'webserver');

    gulp.watch('app/src/**', function(event) {
        gulp.run('scripts');
    })

    gulp.watch('app/css/**', function(event) {
        gulp.run('styles');
    })

    gulp.watch('app/**/*.html', function(event) {
        gulp.run('html');
    })
})
