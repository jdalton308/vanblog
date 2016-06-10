
var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlMin = require('gulp-htmlmin');
var server = require('gulp-server-livereload');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');


var styleFiles = [
        './src/scss/main.scss'
    ];
// var jsFiles = [
// 		'node_modules/jquery/dist/jquery.min.js',
// 		'./src/js/**/*.js'
// 	];
var serverFiles = [
		'./src/js/server/**/*.js'
	];
var htmlFiles = [
		'./src/html/**/*.html'
	];


gulp.task('styles', function() {
    gulp.src(styleFiles)
        .pipe(concat('main.css'))
        .pipe(sass())
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('scripts', function(){
	// gulp.src(jsFiles)
	browserify('./src/js/app.js').bundle()
		// .pipe(concat('app.js'))
		// .pipe(uglify())
		.pipe(source('app.js'))
		.pipe(streamify(uglify()))
		.pipe(gulp.dest('./build/js/'))
		.on('error', gutil.log);
});

gulp.task('server-scripts', function(){
	gulp.src(serverFiles)
		.pipe(gulp.dest('./build/'));
});

gulp.task('html', function(){
	gulp.src(htmlFiles)
		.pipe(htmlMin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('./build/'))
});

gulp.task('server', function(){
	gulp.src('./build')
		.pipe(server({
			livereload: true,
			open: false
		}));
});

gulp.task('watch', function(){
    gulp.watch(['./src/scss/**/*.scss'], ['styles']);
    gulp.watch(['./src/js/**/*.js'], ['scripts', 'server-scripts']);
    gulp.watch(['./src/html/**/*.html'], ['html'])
});

gulp.task('build', ['styles', 'scripts', 'server-scripts', 'html']);

// gulp.task('default', ['build', 'watch', 'server']);
gulp.task('default', ['build', 'watch']);