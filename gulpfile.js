"use strict";
var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require("gulp-rename"),
  sass = require('gulp-sass'),
  maps = require('gulp-sourcemaps'),
  del = require('del');

gulp.task('concatScripts', () =>
  gulp.src(['js/jquery-3.2.1.min.js',
    'js/firstJS.js',
    'js/secondJS.js',
    'js/thirdJS.js'])
    .pipe(concat('app.js')) //takes str that will name concatted file
    .pipe(gulp.dest('./build/js'))
);

gulp.task('minifyScripts', ["concatScripts"], () =>
  gulp.src('build/js/app.js') // FIXME: this is failing
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

gulp.task('clean', () =>
  del(['dist', 'build']),
  console.log("Deleting 'dest' and 'dist' folders")
)

gulp.task("build", ['minifyScripts', 'compileSass'], () =>
  gulp.src(
    [
      'build/css/styles.css',
      'build/js/app.min.js',
      'index.html',
      'img/**'
    ],
    { base: './' } // this creates directory structure within 'dist' folder
  )
    .pipe(gulp.dest('dist'))
);

gulp.task("default", ["clean"], () =>
  gulp.start("build")
);