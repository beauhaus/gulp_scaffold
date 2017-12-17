"use strict";
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename");

gulp.task('concatScripts', () =>
  gulp.src(['js/jquery-3.2.1.min.js',
  'js/firstJS.js',
  'js/secondJS.js',
  'js/thirdJS.js'])
  .pipe(concat('app.js')) //takes str that will name concatted file
  .pipe(gulp.dest('./build'))
);

gulp.task('minifyScripts', () =>
  gulp.src('build/app.js')
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('./build')
    )
  )

gulp.task('compileSass', () =>
  gulp.src('scss/master.scss')
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('./build')
    )
  )


gulp.task("default",["faces"], () =>
  console.log("Ran 'FACES' having fired default")
);
