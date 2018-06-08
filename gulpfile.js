const gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
autoprefixer = require('gulp-autoprefixer');
var $ = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[\-.]/
});

gulp.task('work',['browser-sync', 'sass']);

//compilar sass
gulp.task('sass', () =>
    gulp.src('./scss/*.scss')
    //se pasa sass como función
        .pipe(sass())
        .pipe(gulp.dest('./css'))
);

// Server
gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        files: ['./**/*.*'],
        proxy: "http://localhost:3000/",
        browser: ['google chrome'],
        port: 3000
    });
});

gulp.task('nodemon', function (cb) {
    var started = false;
    return $.nodemon({
        script: 'server.js',
        watch: ['server.js'],
        ignore: [
            'gulpfile.js',
            'node_modules/',
            '.DS_Store'
        ]
    })
    .on('start', function () {
        if (!started) {
            started = true;
            cb();
        }
    })
    .on('restart', function onRestart() {
        setTimeout(function reload() {
            browserSync.reload({
                stream: false
            });
        });
    });
});



/*gulp.src();
gulp.dest();
gulp.watch();*/