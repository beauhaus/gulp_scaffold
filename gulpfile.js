"use strict";
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps');

gulp.task('concatScripts', () =>
  gulp.src(['js/jquery-3.2.1.min.js',
  'js/firstJS.js',
  'js/secondJS.js',
  'js/thirdJS.js'])
  .pipe(concat('app.js')) //takes str that will name concatted file
  .pipe(gulp.dest('./build/js'))
);

gulp.task('minifyScripts', ["concatScripts"], () =>
  gulp.src('build/app.js')
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('./build/js')
    )
  )

gulp.task('compileSass', () =>
  gulp.src('scss/master.scss')
      .pipe(maps.init())
      .pipe(sass())
      .pipe(rename('styles.css'))
      .pipe(maps.write('./'))
      .pipe(gulp.dest('./build/css')
    )
  )
  
gulp.task('watchSass', () =>
  gulp.watch(["scss/**/*.scss"], ["compileSass"])
  // "**" -- look for any folder
  // "*.scss" -- watch any SASS file

)

gulp.task("build", ['minifyScripts','compileSass']);

gulp.task("default",["build"], () =>
  console.log("Ran ran 'build'")
);
