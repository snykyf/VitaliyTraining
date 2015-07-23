var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var vendorSrcJs = [
	"bower_components/jquery/dist/jquery.min.js",
	"bower_components/angular/angular.min.js",
	"bower_components/ui-router/release/angular-ui-router.min.js",
	"bower_components/angular-bootstrap/ui-bootstrap.min.js"
];

var srcHtml = ["src/index.html"];
var srcSass = ["./src/**/*.scss"];
var srcJs = ["./src/app.js"];

gulp.task('default', ['vendor','compress', 'sass', 'html']);

gulp.task('sass', function () {
	gulp.src(srcSass)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('html', function() {
	return gulp.src(srcHtml)
		.pipe(gulp.dest('./dist/'));
});

gulp.task('vendor', function() {
	return gulp.src(vendorSrcJs)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('./dist/vendor/'));
});

gulp.task('compress', function() {
	return gulp.src('./src/app.js')
		.pipe(uglify())
		.pipe(gulp.dest('./dist/'));
});
