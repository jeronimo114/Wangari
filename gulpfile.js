// gulpfile.js
// --------------------------------------------------
// Gulp configuration to compile SCSS to CSS using ES modules
// --------------------------------------------------

import gulp from "gulp";
import * as sass from "sass";
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import sourcemaps from "gulp-sourcemaps";

// Initialize gulp-sass with Dart Sass
const sassCompiler = gulpSass(sass);

// Destructure required functions from gulp
const { src, dest, watch, series } = gulp;

// Function to compile SCSS
function compileSass() {
  return src("assets/css/main.scss") // Entry SCSS file
    .pipe(sourcemaps.init())
    .pipe(
      sassCompiler({ outputStyle: "expanded" }).on(
        "error",
        sassCompiler.logError
      )
    )
    .pipe(autoprefixer())
    .pipe(sourcemaps.write("."))
    .pipe(dest("assets/css")); // Outputs main.css in the same folder (or adjust path as needed)
}

// Function to watch SCSS changes
function watchFiles() {
  watch("assets/css/**/*.scss", compileSass);
}

// Default task runs compileSass, then watches for changes
export default series(compileSass, watchFiles);
