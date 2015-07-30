var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');

var vendorSrcJs = [
	"bower_components/jquery/dist/jquery.min.js",
	"bower_components/angular/angular.min.js",
	"bower_components/ui-router/release/angular-ui-router.min.js",
	"bower_components/angular-bootstrap/ui-bootstrap.min.js"
];
var vendorSrcCss = ["bower_components/bootstrap/dist/css/bootstrap.min.css"];
var srcHtmlTemplates = ["src/index.html","src/**/*.html"];
var srcSass = ["./src/**/*.scss"];
var srcJs = ["src/**/*.module.js", "src/**/*.js"];
var srcCss = ["./dist/**/*.css"]

gulp.task('default', ['vendorJs', 'vendorCss','compressJs', 'sass', 'compressHtml']);

gulp.task('sass', function () {
	gulp.src(srcSass)
		.pipe(sass().on('error', sass.logError))
		.pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('compressHtml', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
 
  return gulp.src(srcHtmlTemplates)
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./dist/'));
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
		.pipe(concat("app.js"))
		.pipe(gulp.dest('./dist/'));
});
