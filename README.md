# Gulp Basic full install featuring

* js-concat
* js-uglification
* sass-scaffold

## CLI commands

+ npm init
+ npm i gulp --save-dev
+ npm i gulp-concat --save-dev
+ npm i gulp-uglify --save-dev
+ npm i gulp-rename --save-dev
+ npm i gulp-sourcemaps --save-dev
+ npm i gulp-sass --save-dev

## additions

+ touch gulpfile.js

---
Privilege a single "app.js" file script-linked in your html
```html
    <script src="./build/app.js"></script>
```
---
##### *gulpfile.js test*

```js
"use strict";

var gulp = require('gulp');

gulp.task("Hello", function() {
  console.log("Hello Funk");
})
```
-run "gulp Hello"

---

**gulp default** has any number of params in an Array that will call other tasks in turn.

```js
gulp.task("default",["Hello"], function() {
  console.log("Ran 'Hello' having fired default");
})
```

--run "gulp" *this will fire the default*

---
### Of course, these can be es6-ified:
```js
"use strict";
var gulp = require('gulp');

gulp.task("faces", () => console.log("🤓 😭 🤣 😲"))

gulp.task("default",["faces"], () =>
  console.log("Ran 'FACES' having fired default")
);
```

### gulp-concat tasks

Note: Gulp is smart enough *NOT* to concat js that has errors.

```js
gulp.task('concatScripts', () =>
  gulp.src(['js/jquery-3.2.1.min.js',
  'js/firstJS.js',
  'js/secondJS.js',
  'js/thirdJS.js'])
  .pipe(concat('app.js'))
  //takes str that will create name for newly concatted file
  .pipe(gulp.dest('./build'))
);
```

---
## uglification:

gulpfile.js
```js
gulp.task('minifyScripts', () =>
  gulp.src('build/app.js')
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('./build')
    )
  )
```

---

## enter SASS

** (using sass and sourcemaps) **

gulpfile.js
```js
gulp.task('compileSass', () =>
  gulp.src('scss/master.scss')
      .pipe(maps.init())
      .pipe(sass())
      .pipe(rename('styles.css'))
      .pipe(maps.write('./'))
      .pipe(gulp.dest('./build/css')
    )
  )
```

---
## build task

One big problem with this:

*gulp.task("build", ["concatScripts",'minifyScripts','compileSass']);*

gulp runs them concurrently...

We must, therefore, run them serially.
+ add concatScripts as a dependency of minifyScripts
```diff
- gulp.task('minifyScripts', () =>
+ gulp.task('minifyScripts', ["concatScripts"], () =>

```
+ we are certain in our arrow functions that concatScripts explicitly returns what it's creating

+ with concat as a dependency of minify, we can remove concat from the buildtask
```diff
- gulp.task("build", ['concatScripts', 'minifyScripts','compileSass']);
+ gulp.task("build", ['minifyScripts','compileSass']);
```

## Implementing *Watch* & *globbing* 

Simply add a new task & call it watch
```js
gulp.task('watchSass', () =>
  gulp.watch(["scss/**/*.scss"], ["compileSass"])
)
```


|First Argument|Second Argument|
|:-----------|:-------|
|"**" -- look for any folder|task to run when change detected|
