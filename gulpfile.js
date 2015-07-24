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
var vendorSrcCss = ["bower_components/bootstrap/dist/css/bootstrap.min.css"];
var srcHtml = ["src/index.html"];
var srcHtmlTemplates = ["src/**/*.html"];
var srcSass = ["./src/**/*.scss"];
var srcJs = ["src/**/*.module.js", "src/**/*.js"];

gulp.task('default', ['vendorJs', 'vendorCss','compressJs', 'sass', 'html', "html-templates"]);

gulp.task('sass', function () {
	gulp.src(srcSass)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('html', function() {
	return gulp.src(srcHtml)
		.pipe(gulp.dest('./dist/'));
});

gulp.task("html-templates", function() {
	return gulp.src(srcHtmlTemplates)
		.pipe(gulp.dest("./dist/"));
});

gulp.task('vendorJs', function() {
	return gulp.src(vendorSrcJs)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('./dist/vendor/'));
});

gulp.task('vendorCss', function() {
	return gulp.src(vendorSrcCss)
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest('./dist/vendor/'));
});

gulp.task('compressJs', function() {
	return gulp.src(srcJs)
		.pipe(uglify())
		.pipe(concat("app.min.js"))
		.pipe(gulp.dest('./dist/'));
});
