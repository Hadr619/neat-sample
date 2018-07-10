'use strict';

let gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	neat       = require("bourbon-neat").includePaths,
	del = require('del');

gulp.task('concatScripts',['clean'], ()=> {
return gulp.src('./js/app/*.js')
	.pipe(sourcemaps.init())
	.pipe(concat('site.js'))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('js'))
});

gulp.task('minifyScripts', ['concatScripts'], ()=>{
return gulp.src('js/site.js')
	.pipe(uglify())
	.pipe(rename('site.min.js'))
	.pipe(gulp.dest('js'))
});

gulp.task('sass', ()=>{
return gulp.src('scss/site.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({
		includePaths:[neat]
	}))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('css'))
});


gulp.task('watchFiles', ()=>{
	gulp.watch('scss/**/*.scss', ['sass']);
	gulp.watch('js/**/*.js', ['concatScripts']);
});

gulp.task('clean', ()=>{
	del(['dist', 'js/site*.js*']);
})

gulp.task('build',['minifyScripts', 'sass'], ()=>{
	return gulp.src(["css/site.css", "js/site.min.js", 'index.html',
						"img/**", "fonts/**"], { base: './'})
			.pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchFiles']);


gulp.task('default', ['clean'], ()=>{
	gulp.start('build');
});