/**
 * Created by Natan on 03.04.2017.
 */
const gulp         = require('gulp');
const browserSync  = require('browser-sync');
const reload       = browserSync.reload;
const autoprefixer = require('gulp-autoprefixer');
const minifycss    = require('gulp-uglifycss');
const filter       = require('gulp-filter');
const uglify       = require('gulp-uglify');
const newer        = require('gulp-newer');
const rename       = require('gulp-rename');
const concat       = require('gulp-concat');
const notify       = require('gulp-notify');
const sass         = require('gulp-sass');
const ignore       = require('gulp-ignore');
const plumber      = require('gulp-plumber');
const cache        = require('gulp-cache');
const sourcemaps   = require('gulp-sourcemaps');

module.exports = {
  // Browser sync task for auto page reloading
  'browser-sync': function () {
    browserSync.init({
      proxy: 'owie.particles.dev',
      injectChanges: true
    });
  },

  // Styles compilation from scss to css with
  // few additional modifications
  'styles': function() {
    gulp.src('./src/scss/*.scss')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'compact',
        precision: 10
      }))
      .pipe(sourcemaps.write({ includeContent: false }))
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(autoprefixer('last 2 versions', '> 1%', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(sourcemaps.write('.'))
      .pipe(plumber.stop())
      .pipe(filter('**/*.css'))
      .pipe(reload({ stream: true }))
      .pipe(rename({ suffix: '.min' }))
      .pipe(minifycss({ maxLineLen: 80 }))
      .pipe(gulp.dest('./'))
      .pipe(reload({ stream: true }))
      .pipe(notify({ message: 'Styles generated', onLast: true }));
  },

  // JavaScript concat and minify
  'javascript': function() {
    gulp.src('./src/js/*.js')
      .pipe(concat('owie.particles.js'))
      .pipe(gulp.dest('./'))
      .pipe(rename({ basename: 'owie.particles', suffix: '.min' }))
      .pipe(uglify())
      .pipe(gulp.dest('./'))
      .pipe(notify({ message: 'JavaScript generated', onLast: true }));
  },

  // Clear the cache
  'clear': function() {
    cache.clearAll();
  }
};
